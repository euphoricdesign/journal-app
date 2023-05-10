import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { onAuthStateChanged } from 'firebase/auth'
import { FirebaseAuth } from '../firebase/config'

import { login, logout } from '../store/auth'

export const useCheckAuth = () => {
    
    const { status } = useSelector(state => state.auth)
    const dispatch = useDispatch()

    
    useEffect( () => {
        // Firebase nos ofrece una forma de saber cual es el usuario activo en caso de que lo haya 
        
        onAuthStateChanged( FirebaseAuth, async( user ) => {
            if ( !user ) return dispatch( logout() )

            const { uid, email, displayName, photoURL } = user

            dispatch( login({ uid, email, displayName, photoURL }) )
        })

        // Esta función nos devuelve algo que se conoce como un Obsevable, una función que esta emitiendo valores 
        // Cuando el estado de la app cambia esta función se va a volver a disparar una y otra vez
        // En teoría, cuando tenemos una func de este tipo, que esta regresando muchas emisiones idealmente vamos a querer 
        // limpiarla, pero en este caso no voy a querer limpiarla en ningun momento porque siempre quiero estar pendiente
        // del cambio en la autenticación 
    }, [] )

    
    return status
    
    // return {
    //     status
    // }
}