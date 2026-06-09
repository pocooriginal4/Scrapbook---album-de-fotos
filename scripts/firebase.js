// scripts/firebase.js

// -------------------------
// CONFIGURACION FIREBASE
// -------------------------
// 1. Crea un proyecto en https://console.firebase.google.com
// 2. Ve a Configuración del proyecto > Tus apps > Agregar app (Web)
// 3. Copia el objeto firebaseConfig que te genera Firebase
// 4. En Firebase, activa: Authentication > Google y Firestore Database
// 5. Reemplaza los valores de abajo con los tuyos

const firebaseConfig = {
    apiKey:            "TU_API_KEY",
    authDomain:        "TU_PROJECT_ID.firebaseapp.com",
    projectId:         "TU_PROJECT_ID",
    storageBucket:     "TU_PROJECT_ID.firebasestorage.app",
    messagingSenderId: "TU_MESSAGING_SENDER_ID",
    appId:             "TU_APP_ID",
    measurementId:     "TU_MEASUREMENT_ID"   // Opcional, solo si usas Analytics
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

console.log("✅ Firebase inicializado correctamente");

// Referencia a la colección de álbumes
const albumsRef = db.collection("albums");
let currentAlbumId = null;




/* ------ LOGIN CON GOOGLE */  
const provider = new firebase.auth.GoogleAuthProvider();

document.getElementById("loginGoogleBtn")
.addEventListener("click", async () => {
    try{
        await auth.signInWithPopup(provider);
    }catch(error){
        console.error("Error login:", error);
    }
});


// detectar usuario logueado
auth.onAuthStateChanged(async (user)=>{

    if(user){
        console.log("Usuario logueado:", user.email);
        document.getElementById("loginScreen").style.display = "none";
        logoutBtn.style.display = 'flex';

        await inicializarAlbumUsuario();
        await cargarAlbum();

    }else{
        document.getElementById("loginScreen").style.display = "flex";
        logoutBtn.style.display= 'none';

        currentAlbumId = null;
    }
});


/*------ LOGOUT DE USUARIO */

logoutBtn.addEventListener('click', async()=>{
    
    if(!confirm('¿Estás seguro que quieres cerrar sesión?')) return;

    try{
        await auth.signOut();
        console.log("Sesión cerrada correctamente");
        
        // Limpiar variables locales
        currentAlbumId = null;
        album = {paginas:[{id:1, elementos:[]}]};
        paginaActual = 1;

        // Mostrar pantalla de login nuevamente
        document.getElementById('loginScreen').style.display = 'flex';
    } catch(error){
        console.error("Error al cerrar sesión", error);
        alert("hubo un problema al cerrar Sesión");
    }
})



//------- CREAR O CARGAR ALBUM DE USUARIO
async function inicializarAlbumUsuario(){

    const user = auth.currentUser;
    currentAlbumId = "album-" + user.uid;
    const doc = await albumsRef.doc(currentAlbumId).get();

    if(!doc.exists){

        await albumsRef.doc(currentAlbumId).set({
            owner: user.uid,
            ownerEmail: user.email,
            paginas:[
                {
                    id:1,
                    elementos:[]
                }
            ],
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        console.log("Album creado");

    }else{
        console.log("Album existente encontrado");
    }
}

//----- CARGAR ALBUM EXISTENTE EN FIREBASE
async function cargarAlbum(){

    const doc = await albumsRef.doc(currentAlbumId).get();

    if(doc.exists){
        album = doc.data();
        if(!album.paginas){
            album.paginas = [{id:1, elementos:[]}];
        }
        paginaActual = 1;
        dibujar();
    }
}

//------ Guardar cambios en Firestore
async function guardarAlbum(){

    if(!currentAlbumId || !auth.currentUser) return;

    // Verificación extra de seguridad
    const userUid = auth.currentUser.uid;

    if(currentAlbumId !== 'album-'+userUid){
        console.log('Intento de guardar en album ajeno');
        return;
    }

    try{
        await albumsRef.doc(currentAlbumId).set(album);
        console.log("guardado");
    } catch (error){
        console.error("Error al guardar en firestore:" + error);
    }
}