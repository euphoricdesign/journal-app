import { useMemo } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Google } from '@mui/icons-material'
import { Grid, Typography, TextField, Button, Link } from '@mui/material'
import { AuthLayout } from '../layout/AuthLayout'
import { useForm } from '../../hooks/useForm'

import { useDispatch, useSelector } from 'react-redux'

import { checkingAuthentication, startGoogleSignIn } from '../../store/auth'

export const LoginPage = () => {

    const { status } = useSelector( state => state.auth )
    const dispatch = useDispatch()

    const { email, password, onInputChange } = useForm({
        email: 'merlina@google.com',
        password: '123456'
    })

    const isAuthenticated = useMemo( () => status === 'checking', [ status ] )

    const onSubmit = (e) => {
        e.preventDefault()

        dispatch( checkingAuthentication() )

        // console.log({email, password});
    }

    const onGoogleSignIn = (e) => {
        // console.log('onGoogleSignIn');

        dispatch( startGoogleSignIn() )
    }

    return (
         <AuthLayout title='Iniciar sesión'>
             <form onSubmit={ onSubmit }>
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