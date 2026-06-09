mostrarPagina();

function mostrarPagina(){
    mostrarPaginaActual.textContent = `Pagina ${paginaActual}`
}

function paginaSiguiente(){
    paginaActual ++;

    if(!album.paginas[paginaActual - 1]){
        album.paginas.push({
            id: paginaActual,
            elementos: []
        });
    };

    mostrarPagina();
    dibujar();
}
botonPaginaSiguiente.addEventListener('click', paginaSiguiente);


function paginaAnterior(){
    if(paginaActual <= 1) return;
    paginaActual --;

    mostrarPagina();
    dibujar();
}
botonPaginaAnterior.addEventListener('click', paginaAnterior)
