import { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Grid, Typography, TextField, Button, Link } from '@mui/material'
import { AuthLayout } from '../layout/AuthLayout'
import { useForm } from '../../hooks'
import { useDispatch } from 'react-redux'
import { startCreatingUserWithEmailPassword } from '../../store/auth'


const formData = {
    email: '',
    password: '',
    displayName: ''
}

const formValidations = { // Este objeto se lo mando a mi custom hook useForm para que me diga cómo determinar si los datos ingresados estan bien o no.
    email: [ (value) => value.includes('@'), 'El correo debe tener una @' ],
    password: [ (value) => value.length >= 6, 'El password debe tener más de 6 caracteres' ],
    displayName: [ (value) => value.length >= 1, 'El nombre es obligatorio' ]
}

// formValidations no es más que un objeto que contiene los mismos nombres que los campos de mi formulario. 

export const RegisterPage = () => {

    const dispatch = useDispatch()

    const [formSubmitted, setFormSubmitted] = useState(false); // fue el formulario enviado? 

    const { 
        formState ,displayName ,email, password, onInputChange,
        isFormValid, displayNameValid, emailValid, passwordValid 
    } = useForm( formData, formValidations )

    const onSubmit = (e) => {
        e.preventDefault()
        setFormSubmitted(true)

        if ( !isFormValid ) return

        dispatch( startCreatingUserWithEmailPassword( formState ) )

    }
    

    return (
         <AuthLayout title='Crear cuenta'>
             <form onSubmit={ onSubmit }>
                <Grid container>
                    <Grid item xs={12} sx={{mt: 2}}>
                        <TextField
                            label="Nombre completo"
                            type="text"
                            placeholder='Ingresa tu nombre'
                            fullWidth
                            name='displayName'
                            value={ displayName }
                            onChange={ onInputChange }
                            error={ !!displayNameValid  && formSubmitted }
                            helperText={ displayNameValid }
                        />
                    </Grid>
                    <Grid item xs={12} sx={{mt: 2}}>
                        <TextField
                            label="Correo"
                            type="email"
                            placeholder='correo@google.com'
                            fullWidth
                            name='email'
                            value={ email }
                            onChange={ onInputChange }
                            error={ !!emailValid && formSubmitted }
                            helperText={ emailValid }
                        />
                    </Grid>
                    <Grid item xs={12} sx={{mt: 2}}>
                        <TextField
                            label="Contraseña"
                            type="password"
                            placeholder='Contraseña'
                            fullWidth
                            name='password'
                            value={ password }
                            onChange={ onInputChange }
                            error={ !!passwordValid && formSubmitted }
                            helperText={ passwordValid }
                        />
                    </Grid>

                    <Grid container spacing={2} sx={{mb: 2, mt: 1}}>
                        <Grid item xs={12}>
                            <Button type='submit' variant='contained' fullWidth>
                                <Typography>Crear cuenta</Typography>
                            </Button>
                        </Grid>
                    </Grid>
                    
                    <Grid
                        container
                        direction='row'
                        justifyContent='end'
                    >
                        <Typography sx={{mr: 1}}>¿Ya tienes una cuenta?</Typography>
                        <Link component={RouterLink} color='inherit' to='/auth/login'>
                            Ingresar
                        </Link>
                    </Grid>

                </Grid>
            </form>
         </AuthLayout>
    )
}