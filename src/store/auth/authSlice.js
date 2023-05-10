import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: { // de esta forma va a lucir nuestro estado de autenticación 
        status: 'checking', // 'checking', 'not-authenticated', 'authenticated'
        uid: null,
        email: null,
        displayName: null,
        photoURL: null,
        errorMessage: null
    },
    reducers: {
        login: (state, { payload }) => {
            state.status = 'authenticated'
            state.uid = payload.uid
            state.email = payload.email
            state.displayName = payload.displayName
            state.photoURL = payload.photoURL
            state.errorMessage = null
        },
        logout: (state, { payload }) => {
            state.status = 'not-authenticated'
            state.uid = null
            state.email = null
            state.displayName = null
            state.photoURL = null
            state.errorMessage = payload?.errorMessage
        },
        checkingCredentials: (state, action) => {
            state.status = 'checking'
        }
    }
});


export const { login, logout, checkingCredentials } = authSlice.actions;