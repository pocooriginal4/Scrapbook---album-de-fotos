botonModoEdicion.addEventListener('click', async()=>{

    modoEdicion = !modoEdicion;

    if(modoEdicion){
        botonModoEdicion.classList.add('activo');
        
        textoBoton.textContent = 'Guardar';
        
        iconoEditar.classList.remove('fa-pencil-alt');
        iconoEditar.classList.add('fa-save');
    } else{
        botonModoEdicion.classList.add('guardando');
        textoBoton.textContent = 'Guardando . . .';

        try {
            await guardarAlbum();
            console.log("💾 Álbum guardado correctamente al salir del modo edición");
        } catch (error) {
            console.error("Error al guardar:", error);
            textoBoton.textContent = 'Error al guardar';
        }

        // VOLVER AL ESTADO NORMAL
        
        botonModoEdicion.classList.remove('activo', 'guardando');

        textoBoton.textContent = 'Editar';

        iconoEditar.classList.remove('fa-save');
        iconoEditar.classList.add('fa-pencil-alt');
    }
    
    botonesDeSubida.classList.toggle('oculto');
    mostrarPaginaActual.classList.toggle('oculto');

    if(!modoEdicion){
        elementoSeleccionado = null;
    }
    dibujar();
});


panelHerramientas.addEventListener('click', (e)=>{
    if(!elementoSeleccionado) return;

    let elementos = album.paginas[paginaActual - 1].elementos;
    let obj = elementos.find(el => el.id == elementoSeleccionado);

    if(!obj) return;

    // borrar

    if(e.target.classList.contains('toolBorrar')){
        album.paginas[paginaActual - 1].elementos = elementos.filter(el => el.id != elementoSeleccionado);
        
        elementoSeleccionado = null;
        panelHerramientas.classList.add('oculto');
        dibujar();
        return;
    };


    // bordes
    if(e.target.classList.contains('toolSinBorde')) 
        obj.borde = 'sinBorde';
    if(e.target.classList.contains('toolBordeSensillo')) 
        obj.borde = 'conBorde';
    if(e.target.classList.contains('toolBordePolaroid'))
        obj.borde = 'bordePolaroid';
    if(e.target.classList.contains('toolBordeCinta1'))
        obj.borde = 'bordeCinta1';
    if(e.target.classList.contains('toolBordeCinta2'))
        obj.borde = 'bordeCinta2';
    
    // Traer al frente

    if(e.target.classList.contains('toolFrente')){
        obj.z =(obj.z || 1) + 1;
    }

    if(e.target.classList.contains('toolAtras')){
        obj.z = Math.max(1,(obj.z || 1 ) - 1);
    }

    //correccion de errores y guardar posiciones
    const elementoDOM = document.getElementById(elementoSeleccionado);
    if (elementoDOM) {
        const left = parseFloat(elementoDOM.style.left) || 0;
        const top  = parseFloat(elementoDOM.style.top)  || 0;
        obj.posicionX = Math.round(left);
        obj.posicionY = Math.round(top);
    };

    dibujar();
})