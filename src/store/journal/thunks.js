import { collection, doc, setDoc } from 'firebase/firestore/lite'
import { FirebaseDB } from '../../firebase/config'


export const startNewNote = () => {


    return async( dispatch, getState ) => {

        // Para grabar una nueva nota en Firebase vamos a ocupar el uid del usuario, el mismo me servirá para saber como quiero almacenar esta información en mi db
        const { uid } = getState().auth


        const newNote = { // La nueva nota que quiero insertar 
            title: '',
            body: '',
            date: new Date().getTime()
        } 


        // Creo la referencia al documento, este documento es la colección en la que quiero insertar mi nota
        const newDoc = doc( collection( FirebaseDB, `${ uid }/journal/notes` ) )
        
        // Para insertar mi nota llamo al método asincrono setDoc de firestore
        await setDoc( newDoc, newNote ) // esto me pide la ref al doc donde lo quiero insertar y luego el obj que voy a grabar


        // dispatch( addNewEmptyNote ) // Eventualmente haremos el dispatch de la nueva nota cuando ya la tengamos grabada
        // dispatch( setActiveNote ) //  También deberiamos hacer otro dispatch para activar dicha nota 
    
    }
}