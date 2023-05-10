import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: true, // bandera booleana que me dira si estoy salvando o no 
        messageSaved: '',
        notes: [],
        active: null, // nota activa 

        // active: {
        //     id: 'abc123',
        //     title: '',
        //     body: '',
        //     date: 123456,
        //     imgUrls: [] // https://foto1.jpg, https://foto2.jpg, https://foto3.jpg
        // } Así lucirá una nota

    },
    reducers: {
        addNewEmptyNote: ( state, action ) => { // agregar una nueva nota
            
        },
        setActiveNote: ( state, action ) => { // seleccionar que nota va a estar activa 
            
        },
        setNotes: ( state, action ) => { // establecemos las notas una vez que las tenemos 
            
        },
        setSaving: ( state ) => { // cuando estoy grabando/guardando las notas
            
        },
        updateNote: ( state, action ) => { // actualizar una nota
            
        },
        deleteNoteById: ( state, action ) => { // borrar una nota del listado
            
        } 
    } // básicamente esto es lo minimo que requerimos en un CRUD
});


export const {  

    addNewEmptyNote,
    setActiveNote,
    setNotes,
    setSaving,
    updateNote,
    deleteNoteById

} = journalSlice.actions;