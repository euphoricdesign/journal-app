import { collection, deleteDoc, doc, setDoc } from 'firebase/firestore/lite'
import { FirebaseDB } from '../../firebase/config'
import { addNewEmptyNote, setActiveNote, savingNewNote, setNotes, setSaving, updateNote, setPhotosToActiveNote, deleteNoteById } from './journalSlice'
import { loadNotes, fileUpload } from '../../helpers'


export const startNewNote = () => {
    return async( dispatch, getState ) => {
        
        dispatch( savingNewNote() )

        // para grabar una nueva nota en Firebase vamos a ocupar el uid del usuario, el mismo me servirá para crear una nueva colección en mi db con el id de el usuario autenticado
        const { uid } = getState().auth

        const newNote = { // la nueva nota que quiero insertar 
            title: '',
            body: '',
            imageUrls: [],
            date: new Date().getTime()
        } 

        // creo la referencia al documento donde quiero insertar mi nota

        // el método doc de Firestore devuelve una referencia a un documento específico en la base de datos en caso de que exista dicho documento. 

        // el método collection de Firestore devuelve una referencia a una colección específica en la base de datos, 
        // le paso la confg de mi base de datos como 1er parametro y  el nombre de la colección a la que se quiere hacer referencia.

        const newDoc = doc( collection( FirebaseDB, `${ uid }/journal/notes`  ))  // Cuando se llama al método doc() con una colección como argumento, se crea un nuevo documento vacío en esa colección con un ID generado automáticamente por Firestore. 

        // Para insertar mi nota llamo al método asincrono setDoc de firestore

        await setDoc( newDoc, newNote ) // esto me pide la ref al doc donde lo quiero insertar y luego el obj que voy a grabar

        // En este punto a mi nueva nota le hace falta un ID 
        newNote.id = newDoc.id

        dispatch( addNewEmptyNote( newNote ) ) // dispatch de la nueva nota cuando ya la tengamos grabada
        dispatch( setActiveNote( newNote ) ) //  dispatch para activar dicha nota 
    
    }
}

export const startLoadingNotes = () => { 
    return async( dispatch, getState ) => {
        
        // Voy a requerir el uid del usuario que es el que va a cargar las notas 
        const { uid } = getState().auth
        if ( !uid ) throw new Error('El UID del usuario no existe')

        // ¿Donde voy a llamar el startLoadingNotes?
        // En el proyecto creamos un custom hook llamado useCheckingAuth que utilizamos en nuestro router principal 
        // Dentro de ese hook nosotros confirmamos si tenemos o no un usuario y obtenemos sus datos en caso de que si 

        // En este hook podemos hacer un dispatch de la petición startLoadingNotes 

        // Ahora, el código para traer/cargar las notas es algo que va a llevar un poco de "trabajo" por lo que voy a crear fuera 
        // del mòdulo donde se encuentran mis thunks una función 'helper' para que no crezca mi thunk y se mantenga fácil de leer

        const notes = await loadNotes( uid )

        dispatch( setNotes(notes) ) 

    }
}

// Actualizar la nota activa/actual en mi db

export const startSaveNote = () => { // cuando actualizo una nota y guardo quiero que la nota se actualice en mi db
    return async( dispatch, getState ) => {
        
        dispatch( setSaving() )

        const { uid } = getState().auth
        const { active:note } = getState().journal

        // La nota activa tiene la propiedad 'id' y yo no quiero que las notas que grabe en mi base de datos tengan ese id 
        const noteToFirestore = { ...note }
        delete noteToFirestore.id // El operador delete de JavaScript remueve una propiedad de un objeto

        // Preciso la referencia al documento donde se encuentra la nota que quiero actualizar. Recordar que el método doc de Firestore devuelve una referencia a un documento específico en la base de datos.
        // El URL exacto donde se encuentra la nota que quiero actualizar estaría compuesto de la siguiente forma: uid/journal/notes/id(creado por Firestore para mi documento donde guardo mi nota)
        
        const docRef = doc( FirebaseDB, `${ uid }/journal/notes/${ note.id }` )

        // Lo de arriba es solo la ref al documento, la forma de impactar la base de datos en Firebase es la siguiente

        // El método setDoc() de Firestore se utiliza para crear o sobrescribir completamente un documento en una colección. 
        // Al método setDoc podemos enviarle un tercer argumento, un objeto para cambiar las opciones, entre esas opciones hay una interesante llamada "merge"
        

        // La opción "merge" en el método setDoc() de Firestore indica si se debe fusionar o reemplazar completamente los datos existentes en un documento existente. Esta opción se utiliza para evitar la pérdida
        // de datos al actualizar un documento, al permitir actualizar solo los campos que se desean cambiar en lugar de reemplazar completamente todos los datos del documento. Lo pondremos en true 

        await setDoc( docRef, noteToFirestore, { merge: true } )

        dispatch( updateNote( note ) )
    }
}

export const startUploadingFiles = ( files = []  ) => {
    return async( dispatch ) => {

        dispatch( setSaving() ) // Bloquea mis botones y pone mi aplicación en un estado de carga
        
        // Son muchas las lineas de código especializadas a la carga de archivos por lo que vamos a utilizar un helper

        // await fileUpload( files[0] ) // Esto me subiría un solo archivo, la forma de disparar esto simultaneamente es la siguiente

        const fileUploadPromises = [] 

        // fileUploadPromises será un arreglo de todas las promesas que tengo que disparar. 
        
        // En js existe el método Promise.all(). Recibe un array de promesas y se cumple cuando todas las promesas del iterable dado se han cumplido, o es rechazada si alguna promesa no se cumple.
        // Cuando todas son resueltas obtengo las respuestas que necesito en un arreglo nuevo.

        // Voy a iterar el arreglo de archivos que recibo por parametro con un for of, dentro vamos a tomar nuestro fileUploadPromises y vamos a pushear la promesa que nos devuelve llamar a la func fileUpload() con el archivo que estemos iterando el momento 

        for (const file of files) {
            fileUploadPromises.push( fileUpload( file ) ) // fileUpload( file ) = Promise {<pending>}
        }

        // En el paso anterior solo almacenamos cada promesa en mi arreglo de promesas, ahora para obtener las respuestas que requerimos de las mismas hacemos lo siguiente 

        const photosUrls = await Promise.all( fileUploadPromises ) // Esto me va a devolver un nuevo arreglo con las respuestas, es decir las URL's de las imagenes, si todo sale bien. Y es esto lo que mandaríamos en nuestras notas 

        // Si alguna de las promesas pasadas en el argumento iterable falla, la promesa `all` es rechazada inmediatamente con el valor de la promesa que fué rechazada, descartando todas las demás

        // Lo que sigue es establecer nuestro arreglo de imagenes en la nota activa, ya que es la que vamos a grabar/guardar en firebase
    
        dispatch( setPhotosToActiveNote( photosUrls ) )
    }
}

export const startDeletingNote = () => {
    return async( dispatch, getState ) => {

        const { uid } = getState().auth
        const { active:note } = getState().journal

        const docRef = doc( FirebaseDB, `${ uid }/journal/notes/${ note.id }` )
        
        await deleteDoc( docRef ) // dato: posando el cursor sobre cualquier método podemos ver si el mismo regresa algo o no regresa nada. En este caso me dice que es una promesa que no regresa nada así que solamente esperamos (await) que haga el proceso bien o no 

        // Una vez se borra la nota vamos a tener que limpiar la misma en nuestro store
        dispatch( deleteNoteById( note.id ) ) 
    
    }
}