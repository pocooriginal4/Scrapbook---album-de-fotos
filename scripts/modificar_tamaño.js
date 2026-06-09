
/*
------
    CAMBIAR DE TAMAÑO
------
*/

let resizing = null;
let resizingElement = null;
let startX = 0;
let startWidth = 0;


document.addEventListener('mousedown',(e)=>{

    if(!modoEdicion) return;

    if(e.target.classList.contains('resizeHandle')){

        e.stopPropagation();
        resizing = e.target.dataset.id;
        resizingElement = e.target.parentElement;
        startX = e.clientX;

        let elementos = album.paginas[paginaActual - 1].elementos;
        let obj = elementos.find(el => el.id === Number(resizing));

        if(obj){
            startWidth = obj.ancho;
        }
    }
});


document.addEventListener('mousemove',(e)=>{

    if(!resizing) return;

    let diferencia = e.clientX - startX;
    let nuevoAncho = startWidth + diferencia;

    if(nuevoAncho < 50) nuevoAncho = 50;

    resizingElement.style.width = nuevoAncho + "px";
});



document.addEventListener('mouseup', ()=>{
    if(resizing){

        let elementos = album.paginas[paginaActual - 1].elementos;
        let obj = elementos.find(el => el.id === Number(resizing));

        if(obj){
            obj.ancho = resizingElement.offsetWidth;
        }
    }
    resizing = null;
    resizingElement = null;
});


/* 
------
    ROTAR EL OBJETO
------
*/

let rotating = null;
let rotatingElement = null;
let startRotateX = 0;
let startAngle = 0;


document.addEventListener('mousedown',(e)=>{

    if(e.target.classList.contains('rotarHandle')){
        e.stopPropagation();

        rotating = e.target.dataset.id;
        rotatingElement = e.target.parentElement;

        startRotateX = e.clientX;

        let elementos = album.paginas[paginaActual - 1].elementos;
        let obj = elementos.find(el => el.id === Number(rotating));
        if(obj){
            startAngle = obj.rotacion;
        }
    }
});


document.addEventListener('mousemove',(e)=>{
    if(!rotating) return;

    let diferencia = e.clientX - startRotateX;
    let nuevoAngulo = startAngle + diferencia;

    rotatingElement.style.transform = `rotate(${nuevoAngulo}deg)`;
});


document.addEventListener('mouseup', async()=>{
    if(rotating){

        let elementos = album.paginas[paginaActual - 1].elementos;
        let obj = elementos.find(el => el.id === Number(rotating));

        if(obj){
            let transform = rotatingElement.style.transform;
            let angulo = transform.match(/-?\d+/);
            if(angulo){
                obj.rotacion = Number(angulo[0]);
            }
        }
    }
    rotating = null;
    rotatingElement = null;
});



/* 
------
    Cambiar tamaño de letra
------
*/

contenedorMostrar.addEventListener('change', (e)=>{

    if(!e.target.classList.contains('inputFontSize')) return;    

    let id = Number(e.target.dataset.id);
    let nuevoTam = Number(e.target.value);

    let elementos = album.paginas[paginaActual -1 ].elementos;
    let obj = elementos.find(el => el.id == id);

    if(obj){
        obj.tamañoLetra =  nuevoTam;
    }
    
    dibujar();
})