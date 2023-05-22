import { useMemo } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Google } from '@mui/icons-material'
import { Grid, Typography, TextField, Button, Link, Alert } from '@mui/material'
import { AuthLayout } from '../layout/AuthLayout'
import { useForm } from '../../hooks/useForm'

import { useDispatch, useSelector } from 'react-redux'

import { startGoogleSignIn, startLoginWithEmailPassword } from '../../store/auth'

const formData = {
    email: '',
    password: ''
}

export const LoginPage = () => {

    const { status, errorMessage } = useSelector( state => state.auth )

    const dispatch = useDispatch()

    const { email, password, onInputChange } = useForm( formData )


    const isAuthenticated = useMemo( () => status === 'checking', [ status ] ) // true o false 

    const onSubmit = (e) => {
        e.preventDefault()

        dispatch( startLoginWithEmailPassword( {email, password}) )
    }

    const onGoogleSignIn = (e) => {

        dispatch( startGoogleSignIn() )
    }

    return (
         <AuthLayout title='Iniciar sesión'>
             <form onSubmit={ onSubmit } className='animate__animated animate__fadeIn animate__faster' >
                <Grid container>
                    <Grid item xs={12} sx={{mt: 2}}>
                        <TextField
                            label="Correo"
                            type="email"
                            placeholder='correo@google.com'
                            fullWidth
                            name='email'
                            value={ email }
                            onChange={ onInputChange }
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
                        />
                    </Grid>

                    <Grid container spacing={2} sx={{mb: 2, mt: 1}}>
                        <Grid item xs={12} display={ !!errorMessage ? '' : 'none'}>
                            <Alert severity='error'>
                                { errorMessage }
                            </Alert>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Button disabled={ isAuthenticated } type='submit' variant='contained' fullWidth>
                                <Typography>Login</Typography>
                            </Button>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Button disabled={ isAuthenticated } onClick={ onGoogleSignIn } variant='contained' fullWidth>
                                <Google />
                                <Typography sx={{ml: 1}}>Google</Typography>
                            </Button>
                        </Grid>
                    </Grid>
                    
                    <Grid
                        container
                        direction='row'
                        justifyContent='end'
                    >
                        <Link component={RouterLink} color='inherit' to='/auth/register'>Crear una cuenta</Link>
                    </Grid>
                </Grid>
            </form>
         </AuthLayout>
    )
}