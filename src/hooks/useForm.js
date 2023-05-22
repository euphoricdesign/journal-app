import { useState, useEffect, useMemo } from 'react';

export const useForm = ( initialForm = {}, formValidations = {} ) => {
  
    const [ formState, setFormState ] = useState( initialForm );
    const [ formValidation, setFormValidation ] = useState({}); // validación de formulario

    useEffect(() => {
        createValidators();
    }, [ formState ])

    useEffect(() => { // si el formulario inicial cambia vuelve a llamar setState
        setFormState( initialForm )
    }, [ initialForm ]) 

    const isFormValid = useMemo( () => {

        // la función isFormValid tiene que retornar true o false dependiendo de si mi formulario es valido o no lo es 
        // para eso voy a tomar mi estado formValidation, voy a iterar cada una de sus propiedades con un for...of y ver si tiene el valor de null o no
        // con que una propiedad no tenga el valor de null voy a salirme del ciclo for...of y confirmar que el formulario no es valido

        for (const formValue of Object.keys( formValidation )) { // [ 'emailValid', 'passwordValid', 'displayNameValid' ]
            if ( formValidation[formValue] !== null ) return false 
        }
        return true


    }, [ formValidation ]) // ¿Es valido mi formulario? si hay un error en alguno de mis campos mi form no sería valido. Utilizo useMemo porque quiero memorizar el valor de isFormValid, ese valor solo debería volverse a procesar si cambia mi formValidation  

    

    const onInputChange = ({ target }) => {
        const { name, value } = target;

        setFormState({
            ...formState,
            [ name ]: value
        });
    }

    const onResetForm = () => {
        setFormState( initialForm );
    }

    const createValidators = () => { // crea "validadores"
        
        const formCheckedValues = {}; // valores chequeados de mi formulario = {} 
        
        for (const formField of Object.keys( formValidations )) { // Object.keys( formValidations ) =  ['email', 'password', 'displayName']
            const [ fn, errorMessage ] = formValidations[formField]; // formValidations[formField] = [ƒ, errorMessage]

            formCheckedValues[`${ formField }Valid`] = fn( formState[formField] ) ? null : errorMessage; // crea en mi objeto formCheckedValues una propiedad computada: emailValid, passwordValid...
            
            // console.log( formState[formField] ) = esto me devuelve los valores ingresados en cada input, es decir mer@google.com, 123456, Mer Villecco

            // console.log(formCheckedValues) = { emailValid: null, passwordValid: null, displayNameValid: null }
        }
        
        setFormValidation( formCheckedValues );
    }

    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,

        ...formValidation,
        isFormValid
    }
}