let elementoActivo = null;

let offsetX = 0;
let offsetY = 0;

let highestZ = 1;

// NUEVA FUNCIÓN: guarda la posición visual actual del elemento seleccionado 
function guardarPosicionSeleccionado() {
    if (!elementoSeleccionado) return;
    
    const elementoDOM = document.getElementById(elementoSeleccionado);
    if (!elementoDOM) return;

    const left = parseFloat(elementoDOM.style.left) || 0;
    const top  = parseFloat(elementoDOM.style.top)  || 0;

    const pagina = album.paginas[paginaActual - 1];
    const obj = pagina.elementos.find(el => el.id == elementoSeleccionado);
    
    if (obj) {
        obj.posicionX = Math.round(left);
        obj.posicionY = Math.round(top);
    }
}


class movibles{

    init(element){
        element.addEventListener("mousedown",(e)=>{

            if(!modoEdicion) return;


            if(e.target.classList.contains('resizeHandle') || 
            e.target.classList.contains ('rotarHandle')||
            e.target.classList.contains('inputFontSize')) return;

            if (elementoSeleccionado && elementoSeleccionado !== element.id) {
                guardarPosicionSeleccionado();
            }

            if(elementoSeleccionado !== element.id){
                elementoSeleccionado = element.id;
                panelHerramientas.classList.remove('oculto');
                dibujar();
            }

            elementoActivo = element;
            elementoActivo.style.zIndex = highestZ++;

            const rect = elementoActivo.getBoundingClientRect();

            offsetX = e.clientX - rect.left;
            offsetY = e.clientY - rect.top;
            e.preventDefault();
        });
    }
}

document.addEventListener("mousemove",(e)=>{
    if(!modoEdicion || !elementoActivo) return;

    const contenedor = contenedorMostrar.getBoundingClientRect();
    
    let x = e.clientX - contenedor.left - offsetX;
    let y = e.clientY - contenedor.top - offsetY;

    const anchoElemento = elementoActivo.offsetWidth;
    const altoElemento = elementoActivo.offsetHeight;

    //limitar arriba a la izquierda
    if(x < 0) x = 0;
    if(y < 0) y = 0;

    //limitar derecha
    if(x + anchoElemento > contenedor.width){
        x = contenedor.width - anchoElemento;
    }

    //limitar abajo
    if(y + altoElemento > contenedor.height){
        y = contenedor.height - altoElemento;
    }

    elementoActivo.style.left = x + "px";
    elementoActivo.style.top = y + "px";

    const id = Number(elementoActivo.id);

    let ubicacionFotos = album.paginas[paginaActual - 1].elementos;
    const foto = ubicacionFotos.find(f =>f.id === id);

    if(foto){
        foto.posicionX = x;
        foto.posicionY = y;
    }
});


document.addEventListener("mouseup",() => {
    if (elementoActivo) {
        const id = Number(elementoActivo.id);
        const obj = album.paginas[paginaActual - 1].elementos.find(f => f.id === id);
        if (obj) {
            obj.posicionX = parseFloat(elementoActivo.style.left) || 0;
            obj.posicionY = parseFloat(elementoActivo.style.top)  || 0;
        }
    }
    elementoActivo = null;
});




function activarMovilidad(){
    const elementos = document.querySelectorAll(".movibles");

    elementos.forEach(el=>{
        if(!el.dataset.movible){
            const d = new movibles();
            d.init(el);

            el.dataset.movible = "true";
        }
    });
}

/* 
------
    quitar seleccion cuando presionas por afuera
------
*/

contenedorMostrar.addEventListener('mousedown',(e)=>{
    if(!modoEdicion) return;

    if(e.target.closest('.resultadosGif')  || 
    e.target.closest('.buscador-sticker')) return;

    resultadosGiphy.classList.add('oculto');


    if(e.target === contenedorMostrar){
        // Para que no santen a 0,0
        guardarPosicionSeleccionado();

        
        elementoSeleccionado = null;
        panelHerramientas.classList.add('oculto');
        dibujar();
    }
});

