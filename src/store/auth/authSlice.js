import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: { // de esta forma va a lucir nuestro estado de autenticación 
        status: 'not-authenticated', // 'checking', 'not-authenticated', 'authenticated'
        uid: null,
        email: null,
        displayName: null,
        photoURL: null,
        errorMessage: null
    },
    reducers: {
        login: (state, action) => {

        },
        logout: (state, action) => {

        },
        checkingCredentials: (state, action) => {

        }
    }
});


export const { login, logout, checkingCredentials } = authSlice.actions;