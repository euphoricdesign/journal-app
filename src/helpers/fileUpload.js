// esta función se encargará de subir un solo archivo y se disparará de manera simultanea

export const fileUpload = async( file ) => {
    if ( !file ) throw new Error('No tenemos ningún archivo a subir')
    
    const cloudUrl = 'https://api.cloudinary.com/v1_1/curso-react-herrera/upload'

    const formData = new FormData() //  La clase FormData es parte de la API Fetch, se utiliza para construir datos de formulario y enviarlos a través de una solicitud HTTP utilizando la API Fetch.
    formData.append('upload_preset', 'react-journal') // la func append recibe par clave-valor. upload_preset: react-journal
    formData.append('file', file)  // acá mandamos directamente el archivo que vamos a recibir por parametro 

    try {
        const resp = await fetch( cloudUrl, {
            method: 'POST',
            body: formData
        } )

        if ( !resp.ok ) throw new Error('No se pudo subir imagen')

        // deserializar la respuesta 
        const cloudResp = await resp.json()

        return cloudResp.secure_url

    } catch (error) {
        console.log(error);
        throw new Error(error.message)
    }

}


// form-data es un formato de datos que se utiliza para enviar información a través de una solicitud HTTP utilizado para enviar datos de formulario,
// incluyendo archivos binarios como imágenes o documentos. Permite enviar datos de una manera estructurada y organizada que el servidor pueda procesar
// adecuadamente.
