
function dibujar(){

    contenedorMostrar.innerHTML = '';

    const fragmento = document.createDocumentFragment();

    let elementos = album.paginas[paginaActual - 1].elementos;

    elementos.forEach((elemento)=>{
        // ** Para el contenedor
        let div = document.createElement('div');
            
        div.id = elemento.id;
        div.classList.add('movibles');
        div.classList.add('contenedorImagenes');

        div.style.position = 'absolute';
        div.style.width = elemento.ancho + 'px';
        div.style.left = elemento.posicionX + 'px';
        div.style.top = elemento.posicionY + 'px';

        div.style.transform = `rotate(${elemento.rotacion}deg)`;
        div.style.transformOrigin = 'center';
        div.style.zIndex = elemento.z || 1;


        if(elemento.borde){
            div.classList.add(elemento.borde);
        }

        if(elementoSeleccionado == elemento.id){
            div.classList.add('seleccionado');
        }


        //** En caso de que sea una foto o un sticker

        if(elemento.tipo === 'foto' || elemento.tipo === 'sticker'){
            let img = document.createElement('img');
            
            img.src = elemento.url;
            img.id = elemento.id;
            img.draggable = false;

            img.style.width = '100%';
            div.append(img);
        };




        //** En caso de que sea un texto
        if(elemento.tipo === 'texto'){
            let p;

            if(elemento.link){
                p = document.createElement('a');
                p.href = elemento.link;
                p.target = '_blank';
                p.style.display = 'block';
                p.style.textDecoration = 'none';
                p.style.cursor = 'pointer';
                p.style.color = '#c11c84';
            }
            if(!elemento.link){
                p =document.createElement('p');
            };

            p.id = elemento.id;
            p.textContent = elemento.texto;
            p.style.wordBreak = "break-word";
            p.draggable = false;
            p.style.textAlign = 'center';
            p.style.margin = 0;
            p.style.width = "100%";
            p.style.fontSize = elemento.tamañoLetra + 'px';

            if(modoEdicion){
                p.addEventListener('click', e => e.preventDefault());
            };

            div.append(p);


            //** PERMITE EDITAR EL TEXTO DESPUES DE PUESTO
                // activar el modo edicion con doble click
            
            if(modoEdicion){
                p.addEventListener('dblclick', () => {
                    p.contentEditable = true;
                    p.focus();
                });


                    //Realizar los cambios cuando acabe de editar
                p.addEventListener('blur', () => {
                    p.contentEditable = false;
                    let nuevoTexto = p.textContent;
                    let elementos = album.paginas[paginaActual - 1].elementos;
                    let obj = elementos.find(el => el.id == elemento.id);
                    if(obj){
                        obj.texto = nuevoTexto;
                    }
                });
            }       
        }



        if(modoEdicion && elementoSeleccionado == elemento.id){

            //** Para redimencionar

            let resize = document.createElement('div');
            resize.classList.add('resizeHandle');
            resize.dataset.id = elemento.id;
            div.append(resize);

            //** Para rotar

            let rotar = document.createElement('div');
            rotar.classList.add('rotarHandle');
            rotar.dataset.id = elemento.id;
            div.append(rotar);

            //** input para cambiar tamaño de letra

            if(elemento.tipo === 'texto'){
                let inputSize = document.createElement('input');
                
                inputSize.type = 'number';
                inputSize.min = 10;
                inputSize.value = elemento.tamañoLetra;
                inputSize.classList.add('inputFontSize');
                inputSize.dataset.id = elemento.id;
                inputSize.style.width = '50px';
                div.append(inputSize);
            };

        }

        //** Guardar todo en el fragmento
        fragmento.appendChild(div);

    });


    //** Pasar todo del fragmento al html
    contenedorMostrar.appendChild(fragmento);
    activarMovilidad();
};
