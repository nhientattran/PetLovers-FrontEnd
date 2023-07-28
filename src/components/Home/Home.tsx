// External Imports
import React from "react";
import { styled } from '@mui/system';
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

// Internal Imports
import pets_image from '../../assets/Images/pets.jpg'

interface Props {
    title: string
}

export const Root = styled('div')({
    padding: 0,
    margin: 0
})

export const NavBarContainer = styled('div') ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontFamily: 'verdana'
})

export const Logo = styled('h1') ({
    margin: '0 0 0 0.45em'
})

export const LogoA = styled(Link) ({
    color: 'black',
    listStyle: 'none',
    textTransform: 'uppercase',
    textDecoration: 'none'
})

export const LogoNavigation = styled('ul') ({
    listStyle: 'none',
    textTransform: 'uppercase',
    textDecoration: 'none',
    display: 'flex'
})

export const NavA = styled(Link) ({
    display: 'block',
    padding: '1em',
    color: 'black'
})

export const Main = styled('main') ({
    backgroundImage: `linear-gradient(rgba(0,0,0,.1), rgba(0,0,0,.3)), url(${pets_image})`,
    width: '100%',
    height: '100%',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    position: 'absolute'
})

export const MainText = styled('div') ({
    textAlign: 'center',
    position: 'relative',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: 'white',
    fontFamily: 'verdana'
})

export const ButtonFlex = styled('div') ({
    alignItems: 'center',
    marginTop: '2px',
    padding: '2px',
    "& > :not(:first-child)": {
        marginLeft: '20px',
    },
})

export const Home = (props: Props) => {
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
            <Main>
                <MainText>
                    <h1>Pet Lovers</h1>
                    <p>Welcome to Pet Lovers Page!</p>
                    <ButtonFlex>
                        <Button color='primary' variant="contained" component={Link} to='dashboard'>Rescue Pets</Button>
                        <Button color='primary' variant="contained" component={Link} to='learnmore'>Learn More</Button>
                    </ButtonFlex>
                </MainText>
            </Main>
        </Root>
    )
}
