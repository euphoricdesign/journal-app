// traemos documentos (notas) de nuestra db 

import { collection, getDocs } from "firebase/firestore/lite"
import { FirebaseDB } from "../firebase/config"

export const loadNotes = async( uid = '' ) => {
    if ( !uid ) throw new Error('El UID del usuario no existe') // esto es opcional

    // Primero vamos a ocupar la ref a la colección que necesitamos 
    const collectionRef = collection( FirebaseDB, `${ uid }/journal/notes` )

    // Una vez que apunto a la colección ya puedo traer los documentos que contenga la misma 
    const docs = await getDocs( collectionRef ) //  Esta función devuelve una promesa que se resuelve con un objeto QuerySnapshot que contiene los documentos recuperados.

    // Con getDocs obtengo la referencia a los documentos en esa colección, si yo quiero la data
    // que se encuentra adentro de los mismos tengo que llamar a la función data() que esta dentro 
    // de cada unos de esos documentos 

    const notes = [] // Acá voy a insertar las notas que recupere de mi colección 

    docs.forEach( doc => { // forEach(): no es el método normal de Array, es un método especial que permite iterar sobre los documentos recuperados en el QuerySnapshot.
        notes.push({id: doc.id, ...doc.data()})

    })
    
    return notes

}