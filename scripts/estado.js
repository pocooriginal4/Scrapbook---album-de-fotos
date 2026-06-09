// SUBIR FOTOS
const archivo = document.querySelector('.subir_foto');
const contenedorMostrar = document.querySelector('.contenedor_resultados');

// SUBIIR TEXTO
const valorTexto = document.querySelector('.subir_texto');
const botonEnviarTexto = document.querySelector('.boton_enviar_texto');
const subirLink = document.querySelector('.añadirLink');

// CAMBIAR DE PAGINA
const botonPaginaSiguiente = document.querySelector('.boton_pagina_siguiente');
const botonPaginaAnterior = document.querySelector('.boton_pagina_anterior')
const mostrarPaginaActual = document.querySelector('.mostrar_pagina_actual');

// BOTON DE MODO EDICION
const botonModoEdicion = document.querySelector('.botonModoEdicion');
const textoBoton = document.querySelector('.textoBoton');
const iconoEditar = document.querySelector('.fa-pencil-alt');

// PANEL DE EDICION
const panelHerramientas = document.querySelector('.panelHerramientas');

// CONTENEDOR DE LOS BOTONES DE SUBIDA
const botonesDeSubida = document.querySelector('.botonesDeSubida');

// BOTON DE LOGOUT
const logoutBtn = document.querySelector('.botonLogout');


// CONSTANTES
let modoEdicion = false;
let elementoSeleccionado = null;

// FUNCION COMPLETA DE DIBUJADO CON LA BASE DE DATOS


//TECLAS CLAVE
document.addEventListener('keydown',(e)=>{
    if(e.key === 'ArrowRight' && modoEdicion === false){
        paginaSiguiente();
    }
    if(e.key === 'ArrowLeft' && modoEdicion === false){
        paginaAnterior();
    }
})

valorTexto.addEventListener('keydown', (e)=>{
    if (e.key === "Enter"){
        añadirTexto();
    }
})

subirLink.addEventListener('keydown',(e)=>{
    if(e.key === 'Enter'){
        añadirTexto();
    }
})

// CONSTRUCCION DEL ALBUM

let album = {
    paginas: [
        {
            id:1,
            elementos: []
        }
    ]
};

let paginaActual = 1;

