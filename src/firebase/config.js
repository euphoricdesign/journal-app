// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore/lite'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAez7Mg2bdx2qQRLWXLgvEr-Jf2gIFVcZo",
  authDomain: "curso-react-c7619.firebaseapp.com",
  projectId: "curso-react-c7619",
  storageBucket: "curso-react-c7619.appspot.com",
  messagingSenderId: "328781361827",
  appId: "1:328781361827:web:244fbbd6a9cbf0cbb2c516"
};

// Estos son los objetos que yo necesito para interactuar con Firebase:
// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig); // Esta es la aplicación como tal 

export const FirebaseAuth = getAuth( FirebaseApp ) // Acá vienen todas las funcionalidades de autenticación 
export const FirebaseDB = getFirestore( FirebaseApp ) // Configuración de mi base de datos 