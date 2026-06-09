const inputGiphy = document.querySelector('.buscarGif');
const botonBuscarGiphy = document.querySelector('.botonBuscarGif');
const resultadosGiphy = document.querySelector('.resultadosGif');

// -------------------------
// CONFIGURACION GIPHY
// -------------------------
// 1. Crea una cuenta en https://developers.giphy.com
// 2. Ve a Dashboard > Create an App > API (opción gratuita)
// 3. Copia tu API Key y reemplaza el valor de abajo

const GIPHY_KEY = 'TU_GIPHY_API_KEY';   // Ejemplo: 'abc123xyz...'

resultadosGiphy.classList.add('oculto');


//** BOTON DE BUSCAR STICKER
botonBuscarGiphy.addEventListener('click', buscarSticker);

inputGiphy.addEventListener('keydown', (e)=>{
    if(e.key === 'Enter'){
        buscarSticker();
    }
})

//** FUNCIONAMIENTO BUSCAR USANDO API

async function buscarSticker(){

    const busqueda = inputGiphy.value.trim();

    if(busqueda === ''){
        resultadosGiphy.classList.add('oculto');
        return;
    }

    resultadosGiphy.classList.remove('oculto');

    const url = `https://api.giphy.com/v1/stickers/search?api_key=${GIPHY_KEY}&q=${busqueda}&limit=50`;
    
    const respuesta = await fetch(url);
    const datos = await respuesta.json();
    mostrarResultados(datos.data);
}

//** MOSTRAR EL CUADRITO DE RESULTADOS

function mostrarResultados(stickers){
    resultadosGiphy.innerHTML = '';
    
    if(stickers.length === 0 ){
        const msg = document.createElement('p');
        msg.style.cssText = 'text-align:center; padding: 20px; color: #666;';
        msg.textContent = 'No se encontraron stickers 😿';
        resultadosGiphy.appendChild(msg);
    } else{
        stickers.forEach(sticker =>{
            const img = document.createElement('img');
            img.src = sticker.images.fixed_width.url;
            img.alt = sticker.title || 'sticker';

            img.style.width = '100px';
            img.style.cursor = 'pointer';
            
            img.addEventListener('click', ()=>{
                añadirSticker(sticker.images.fixed_width.url);

                // CERRAR AUTOMATICAMENTE CUANDO SE SELECCIONA UNA OPCION
                resultadosGiphy.classList.add('oculto');
                inputGiphy.value = '';
            });
            resultadosGiphy.appendChild(img);
        });
    }
}