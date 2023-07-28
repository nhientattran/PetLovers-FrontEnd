// External Imports
import React, { useState } from 'react';
import firebase from 'firebase/app';
import { useSigninCheck } from 'reactfire';
import GitHubIcon from '@mui/icons-material/Github';
import GoogleIcon from '@mui/icons-material/Google';
import { useAuthState, useSignInWithGoogle, useSignInWithGithub } from 'react-firebase-hooks/auth';

import {
    getAuth,
    signOut,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged
} from 'firebase/auth';

import {
    Container,
    Button,
    Typography,
    Snackbar,
    Alert as MUIAlert,
    AlertProps,
    AlertTitle,
    CircularProgress
} from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import { styled } from '@mui/system';
import { SubmitHandler, useForm } from 'react-hook-form';

// Internal Imports
import { Input, InputPassword } from '../sharedComponents';
import { Root, NavBarContainer, Logo, LogoA, LogoNavigation, NavA } from '../Home';
import pets_image from '../../assets/Images/pets.jpg';

export const signinStyles = {
    googleButton: {
        backgroundColor: 'rgb(66, 133, 244)',
        margin: '2em',
        padding: 0,
        color: 'white',
        height: '50px',
        width: '250px',
        border: 'none',
        textAlign: 'center',
        boxShadow: 'rgb(0 0 0 / 25%) 0px 2px 4px 0px',
        fontSize: '16px',
        lineHeight: '48px',
        display: 'block',
        borderRadius: '10px',
        fontFamily: 'verdana',
        cursor: 'pointer'
    },
    googleLogo: {
        width: '48px',
        height: '48px',
        display: 'block'
    },
    typographyStyle: {
        fontFamily: 'verdana',
        textAlign: 'center',
        fontSize: '2em',
        paddingTop: '10px',
    },
    containerStyle: {
        martinTop: '2em',
        border: '1px solid black',
        backgroundColor: 'white',
        padding: '20px',
        paddingBottom: '40px',
        borderRadius: '30px'
    },
    snackBar: {
        color: 'white',
        backGroundColor: '#4caf50'
    }
}

const NavB = styled(Link) ({
    display: 'block',
    color: 'black',
    fontFamily: 'verdana',
    marginBottom: '20px'
})

const Alert = (props: AlertProps) => {
    return (<MUIAlert elevation={6} variant='filled' />)
}

interface ButtonProps {
    open?: boolean,
    onClick?: () => void
}

export const GithubIcon = (props: ButtonProps) => {
    const navigate = useNavigate();
    const auth = getAuth();
    const [ signInWithGitHub, user, loading, error ] = useSignInWithGithub(auth)

    const signIn = async () => {
        await signInWithGitHub()
        console.log(auth)
        if (auth.currentUser) {
            localStorage.setItem('myAuth', 'true')
            navigate('/dashboard')
        } else {
            navigate('/signin')
        }
    }

    onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log(user.email)
            console.log(user.uid)
        }
    })

    if (loading) {
        return (<CircularProgress />)
    }

    const myAuth = localStorage.getItem('myAuth')

    return (
        <div>
            {myAuth === 'true' ?
            <>
                <div></div>
            </>
            :
            <>
                <div onClick = {signIn} style={{cursor: 'pointer'}}>
                    <GitHubIcon sx={{fontSize: '40px', marginLeft: '50px'}} />
                    <Typography>Sign In with Github</Typography>
                </div>
            </>
            }
        </div>
    )
    
}

export const MainSignin = styled('main') ({
    backgroundImage: `linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0)), url(${pets_image})`,
    width: '100%',
    height: '100%',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    position: 'absolute',
    paddingTop: '200px'
})

export const GoogleButton = (props: ButtonProps) => {
    const navigate = useNavigate()
    const auth = getAuth()
    const [ signInWithGoogle, user, loading, error ] = useSignInWithGoogle(auth)

    const signIn = async () => {
        await signInWithGoogle()
        console.log(auth)
        if (auth.currentUser) {
            localStorage.setItem('myAuth', 'true')
            navigate('/dashboard')
        } else {
            navigate('/signin')
        }
    }

    onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log(user.email)
            console.log(user.uid)
        }
    })

    const signUsOut = async() => {
        await signOut(auth)

        localStorage.setItem('myAuth', 'false')
        navigate('/')
    }

    if (loading) {
        return (<CircularProgress />)
    }

    const myAuth = localStorage.getItem('myAuth')

    if (myAuth === 'true') {
        return (
            <Button sx={{marginLeft: '220px'}} variant='contained' color='secondary' onClick={signUsOut}>Sign Out</Button>
        )
    } else {
        return (
            <div onClick = {signIn} style={{cursor: 'pointer'}}>
                <GoogleIcon sx={{fontSize: '40px', marginLeft: '50px'}} />
                <Typography>Sign In with Google</Typography>
            </div>
        )
    }
}

interface UserProps {
    email: string,
    password: string
}

const FlexContainer = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    gap: '1rem'
})

export const SignIn = () => {
    const [open, setOpen] = useState(false)
    const [alertOpen, setAlertOpen] = useState(false)
    const navigate = useNavigate()
    const { register, handleSubmit } = useForm<UserProps>({}) 
    const auth = getAuth()

    const handleSnackOpen = () => {
        setOpen(true)
    }

    const handleSnackClosed = () => {
        setOpen(false)
        setAlertOpen(true)
    }

    const navToDash = () => {
        navigate('/dashboard')
    }

    const onSubmit: SubmitHandler<UserProps> = async (data, event) => {
        event?.preventDefault()
        console.log(data.email, data.password)

        signInWithEmailAndPassword(auth, data.email, data.password)
            .then((userCredential) => {
                localStorage.setItem('myAuth', 'true')
                const user = userCredential.user
                navigate('/dashboard')
            })

            .catch((error) => {
                const errorCode = error.code
                const errorMessage = error.message
                console.log(errorMessage, errorCode)
            });
    }

    const myAuth = localStorage.getItem('myAuth')

    return (
        <Root>
            <NavBarContainer>
                <Logo>
                    <LogoA to='/'>Pet Lovers</LogoA>
                </Logo>
                <LogoNavigation>
                    <li>
                        <NavA to='/'>Home</NavA>
                    </li>
                    {myAuth === 'true' ?
                    <>
                        <li>
                            <NavA to='/dashboard'>Dashboard</NavA>
                        </li>
                        <li>
                            <NavA to='/signin'>Sign Out</NavA>
                        </li>
                    </>
                    :
                    <>
                        <li>
                            <NavA to='/signin'>Sign In</NavA>
                        </li>
                        <li>
                            <NavA to='/signup'>Sign Up</NavA>
                        </li>
                    </>
                    }
                </LogoNavigation>
            </NavBarContainer>
            {myAuth === 'true' ? (
                <MainSignin>
                    <Container maxWidth='sm' sx={signinStyles.containerStyle}>
                        <Typography sx={signinStyles.typographyStyle}>
                            Thank you for being with me in this journey. We hope to see again!
                        </Typography>
                        <GoogleButton open={open} onClick={handleSnackClosed} />
                    </Container>
                </MainSignin>
            ) : (
            <MainSignin>
                <Container maxWidth='sm' sx={signinStyles.containerStyle}>
                    <Typography sx={signinStyles.typographyStyle}>
                        Sign In Below
                    </Typography>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <label htmlFor='email'>Email</label>
                            <Input {...register('email')} name='email' placeholder='Enter Email Here' />
                        </div>
                        <div>
                            <label htmlFor='password'>Password</label>
                            <Input {...register('password')} name='password' placeholder='Enter Password Here' />
                        </div>
                        <Button type='submit' variant='contained' color='primary'>Sign In</Button>
                    </form>
                    <NavB to='/signup'>Don't Have an Account? Register Here!</NavB>
                    <FlexContainer>
                        <GoogleButton open={open} onClick={handleSnackClosed} />
                        <GithubIcon open={open} onClick={handleSnackClosed} />
                    </FlexContainer>
                    <Snackbar message='success' open={alertOpen} autoHideDuration={3000} onClose={navToDash}>
                        <div>
                            <Alert severity='success'>
                                <AlertTitle>Successfully Sign In -- Redirect in 3 seconds</AlertTitle>
                            </Alert>
                        </div>
                    </Snackbar>
                </Container>
            </MainSignin>
            )}
        </Root>
    )
}

export const SignUp = () => {
    const [open, setOpen] = useState(false)
    const [ alertOpen, setAlertOpen ] = useState(false)
    const navigate = useNavigate()
    const { register, handleSubmit } = useForm<UserProps>({})
    const auth = getAuth()

    const navToDash = () => {
        navigate('/dashboard')
    }

    const onSubmit: SubmitHandler<UserProps> = async (data, event) => {
        event?.preventDefault()
        console.log(data.email, data.password)


        createUserWithEmailAndPassword(auth, data.email, data.password)
            .then((userCredential) => {
                const user = userCredential.user;
                navigate('/signin')
            })

            .catch((error) => {
                const errorCode = error.code
                const errorMessage = error.message
                console.log(errorMessage, errorCode)
            });


    }
    
    const myAuth = localStorage.getItem('myAuth')

    return (
        <Root>
            <NavBarContainer>
                <Logo>
                    <LogoA to='/'>Pet Lovers</LogoA>
                </Logo>
                <LogoNavigation>
                    <li>
                        <NavA to='/'>Home</NavA>
                    </li>
                    {myAuth === 'true' ?
                    <>
                        <li>
                            <NavA to='/dashboard'>Dashboard</NavA>
                        </li>
                        <li>
                            <NavA to='/signin'>Sign Out</NavA>
                        </li>
                    </>
                    :
                    <>
                        <li>
                            <NavA to='/signin'>Sign In</NavA>
                        </li>
                        <li>
                            <NavA to='/signup'>Sign Up</NavA>
                        </li>
                    </>
                    }
                </LogoNavigation>
            </NavBarContainer>
            <MainSignin>
                <Container maxWidth='sm' sx={signinStyles.containerStyle}>
                    <Typography sx={signinStyles.typographyStyle}>
                        Sign Up Below
                    </Typography>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <label htmlFor='email'>Email</label>
                            <Input {...register('email')} name='email' placeholder='Place Email Here' />
                        </div>
                        <div>
                            <label htmlFor='password'>Password</label>
                            <InputPassword {...register('password')} name='password' placeholder='Place Password Here' />
                        </div>
                        <Button type='submit' variant='contained' color='primary'>Sign Up</Button>
                    </form>
                    <Snackbar message='success' open={alertOpen} autoHideDuration={3000} onClose={navToDash}>
                        <div>
                            <Alert severity='success'>
                                <AlertTitle>Successful Sign Up -- Redirect in 3 seconds</AlertTitle>
                            </Alert>
                        </div>
                    </Snackbar>
                </Container>
            </MainSignin>
        </Root>
    )      
}