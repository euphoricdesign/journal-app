import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { onAuthStateChanged } from 'firebase/auth'
import { FirebaseAuth } from '../firebase/config'

import { login, logout } from '../store/auth'
import { startLoadingNotes } from '../store/journal'

export const useCheckAuth = () => {
    
    const { status } = useSelector(state => state.auth)
    const dispatch = useDispatch()

    
    useEffect( () => {
        // Firebase nos ofrece una forma de saber cual es el usuario activo en caso de que lo haya 
        
        onAuthStateChanged( FirebaseAuth, async( user ) => {
            if ( !user ) return dispatch( logout() )

            const { uid, email, displayName, photoURL } = user

            dispatch( login({ uid, email, displayName, photoURL }) )
            dispatch( startLoadingNotes() )
        })

        // El método onAuthStateChanged de Firebase es un método que permite establecer un observador en el estado de autenticación del usuario en la aplicación.
        // Este método devuelve un objeto firebase.Unsubscribe que permite detener la escucha de cambios en el estado de autenticación del usuario, pero en este 
        // caso no voy a querer detenerla en ningun momento porque siempre quiero estar pendiente del cambio en la autenticación.

        // Además, este método también puede llamar a un callback cada vez que cambia el estado de autenticación del usuario. 
        // Este callback recibe un solo argumento, que es el objeto de usuario actualmente autenticado o null si no hay ningún usuario autenticado en la aplicación.
    }, [] )

    
    return status
    
    // return {
    //     status
    // }
}