// Proveedores de autenticación 

import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth';
import { FirebaseAuth } from './config';

const googleProvider = new GoogleAuthProvider()

// Creo una func que me sirva para autenticarme con google, como la autenticación puede fallar la colocamos dentro de un bloque try/catch 
export const singInWithGoogle = async() => {

    try {
        const result = await signInWithPopup( FirebaseAuth, googleProvider )
        // const credential = GoogleAuthProvider.credentialFromResult( result )
        const { displayName, email, photoURL, uid } = result.user 

        return {
            ok: true,
            // user info
            displayName,
            email,
            photoURL,
            uid
        }

    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;

        return {
            ok: false,
            errorMessage
        }
    }
}


export const registerUserWithEmailPassword = async({ email, password, displayName }) => {

    try {

        const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password) // Una vez creada con éxito la cuenta de usuario, este usuario también iniciará sesión en su aplicación
        const { uid, photoURL } = resp.user

        // Con esta función actualizamos el displayName en Firebase
        await updateProfile( FirebaseAuth.currentUser, { displayName } )

        return {
            ok: true,
            // user info
            displayName,
            email,
            photoURL,
            uid
        }


    } catch ( error ) {
        return {
            ok: false,
            errorMessage: error.message
        }
    }

}