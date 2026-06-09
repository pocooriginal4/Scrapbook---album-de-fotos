

//** AÑADIR IMAGEN CON CLOUDINARY
async function añadirImagen(){

    const foto = archivo.files[0];
    if(!foto) return;

    // pequeño feedback visual por mientras se sube
    const labelBoton = document.querySelector('.botonSubir');
    const textoOriginal = labelBoton.innerHTML;
    labelBoton.innerHTML = `<i class= "fas fa-spinner fa-spin"></i> Subiendo. . .`;
    labelBoton.style.pointerEvents = 'none';

    try{
        // subimos la foto a cloudinary y esperamos la url
        const urlDefinitiva = await subirFotoACloudinary(foto);

        // añadimos la foto al album

        album.paginas[paginaActual - 1].elementos.push({
            id: Date.now(),
            tipo: 'foto',
            url: urlDefinitiva,
            posicionX: 200,
            posicionY: 200,
            ancho: 200,
            rotacion: 0,
            borde: 'sinBorde',
            z: 1
        });

        dibujar();
        console.log('Se subio exitosamente la foto con una URL permanente');

    } catch (error){
        alert('No se pudo subir la foto. intentalo denuevo');
        console.error(error);
    } finally{
        labelBoton.innerHTML = textoOriginal;
        labelBoton.style.pointerEvents = 'auto';
        archivo.value = '';
    }
};

archivo.addEventListener("change", añadirImagen);



//** AÑADIR TEXTO
function añadirTexto(){
    let texto = valorTexto.value;
    let link = subirLink.value;

    if(link && !link.startsWith('http')){
        link = 'https://' + link;
    }

    if(!texto) return;

    album.paginas[paginaActual - 1].elementos.push({
        id: Date.now(),
        tipo: 'texto',
        texto: texto,
        link: link,
        posicionX : 300,
        posicionY : 300,
        tamañoLetra: 30,
        ancho : 200,
        rotacion: 0,
        z: 1
    });
    dibujar();
    valorTexto.value = '';
    subirLink.value = '';
};

botonEnviarTexto.addEventListener('click', añadirTexto);

//** AÑADIR STICKER
function añadirSticker(url){

    console.log("Añadiendo sticker con URL:", url);

    const elementos = album.paginas[paginaActual-1].elementos;
    if(!elementos) return;

    const nuevoSticker = {
        id: Date.now(),
        tipo: 'sticker',
        url: url,
        posicionX : 300,
        posicionY: 300,
        ancho: 180,
        rotacion : 0,
        z: 1
    }

    elementos.push(nuevoSticker);
    dibujar();
};