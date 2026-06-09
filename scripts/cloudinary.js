// -------------------------
// CONFIGURACION CLOUDINARY
// -------------------------
// 1. Crea una cuenta gratuita en https://cloudinary.com
// 2. En tu dashboard, copia tu "Cloud name"
// 3. Ve a Settings > Upload > Add upload preset (modo "Unsigned")
// 4. Reemplaza los valores de abajo con los tuyos

const CLOUD_NAME = 'TU_CLOUD_NAME';         // Ejemplo: 'mi-album-fotos'
const UPLOAD_PRESET = 'TU_UPLOAD_PRESET';   // Ejemplo: 'album_preset'

/**
 * Sube una foto a Cloudinary y devuelve la URL segura
 * @param {File} file - El archivo seleccionado por el usuario
 * @returns {Promise<string>} URL definitiva de la imagen
 */
async function subirFotoACloudinary(file){
    console.log('subiendo foto a cloudinary');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', UPLOAD_PRESET);

    // Organizar las fotos en carpetas dependiendo el usuario que las usa
    formData.append('folder', `usarios/${auth.currentUser.uid}`);

    try{
        const response = await fetch(
            `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
            {
                method: 'POST',
                body: formData
            }
        );

        if(!response.ok){
            const errorTExt = await response.text();
            throw new Error(`Cloudinary Error: ${errorTExt}`);
        }

        const data = await response.json();

        console.log('Subida exitosa a cloudinary: ', data.secure_url);
        return data.secure_url;
    } catch(error){
        console.error('Error al subir en cloudinary: ' + error);
        throw error;
    }
};