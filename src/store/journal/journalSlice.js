import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: false, // bandera booleana que me dira si estoy salvando o no 
        messageSaved: '',
        notes: [],
        active: null, // nota activa 

        // active: {
        //     id: 'abc123',
        //     title: '',
        //     body: '',
        //     date: 123456,
        //     imageUrls: [] // https://foto1.jpg, https://foto2.jpg, https://foto3.jpg
        // } Así lucirá una nota

    },
    reducers: {
        savingNewNote: ( state ) => {
            state.isSaving = true
        },
        addNewEmptyNote: ( state, action ) => { // agregar una nueva nota
            state.messageSaved = ''
            state.notes.push( action.payload )
            state.isSaving = false
        },
        setActiveNote: ( state, action ) => { // seleccionar que nota va a estar activa 
            state.active = action.payload
            state.messageSaved = ''
        },
        setNotes: ( state, { payload } ) => { // establecemos las notas una vez que las tenemos 
            // state.notes = state.notes.concat( payload ) // forma en la que yo lo hice 
            state.notes = payload // forma más simple
        },
        setSaving: ( state ) => { // cuando estoy grabando/guardando cambios en alguna de mis notas
            state.isSaving = true
            state.messageSaved = ''
            // TODO: mensaje de error
        },
        updateNote: ( state, { payload } ) => { // actualizar una nota
            state.isSaving = false
            
            state.notes = state.notes.map((note) => {
                if ( note.id === payload.id ) {
                    return {
                        ...note,
                        title: payload.title,
                        body: payload.body
                    }
                } else {
                    return note
                }
            })

            // Mostrar msj de actulización
            state.messageSaved = `${ payload.title }, actualizada correctamente`
        },
        setPhotosToActiveNote: (state, action) => {
            state.active.imageUrls = [ ... state.active.imageUrls, ...action.payload ]
            state.isSaving = false
        },
        clearNoteLogout: (state, action) => {
            state.isSaving = false
            state.messageSaved = ''
            state.notes = []
            state.active = null

        },
        deleteNoteById: ( state, { payload } ) => { // borrar una nota del listado
            // Quitar la nota activa y quitar la nota del arreglo de notas 

            state.active = null
            state.notes = state.notes.filter(note => note.id !== payload)



        } 
    } // básicamente esto es lo minimo que requerimos en un CRUD
});


export const {  
    savingNewNote,
    addNewEmptyNote,
    setActiveNote,
    setNotes,
    setSaving,
    updateNote,
    setPhotosToActiveNote,
    clearNoteLogout,
    deleteNoteById

} = journalSlice.actions;