// External Imports 
import { styled } from '@mui/system';
// Internal Imports

import { Root, NavBarContainer, Logo, LogoA, LogoNavigation, NavA, Main } from '../Home/Home';

interface Props{
    title: string
}

const MainText = styled('div') ({
    textAlign: 'center',
    position: 'relative',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: 'white',
    fontFamily: 'verdana',
    paddingLeft: '10em',
    paddingRight: '10em'
})

export const LearnMore = (props:Props) => {
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
                    <h1>About Pet Lovers</h1>
                        <p>Welcome to Pet Lovers, your go-to website for finding rescue pets in your area! Our compassionate platform connects animal enthusiasts with potential rescue pets,
                            making adoption easier for those seeking for a loving cat or dog. With the help of the Petfinder API, we provide a curated selection of adoptable animals near your location.
                        </p>
                    <h1>About Me</h1>
                        <p>Hello there! My name is Nhien Tran, and I'm the driving force behind Pet Lovers. As a passionate software engineer, I wanted to combine my skills with my love for animals
                            to make a positive impact on society. Pet Lovers is the result of my dedication to bridging the gap between people looking to adopt and pets in need of loving homes.
                        </p>
                    <h1>Our Journey Together</h1>
                        <p>As you navigate through Pet Lovers, I hope you'll find the experience intuitive and enjoyable. I have put my hearts into creating this platform, and I am excited to 
                            see more animals find their forever homes with your help.
                            Thank you for joining us on this journey to make the world a better place for both Humans and Animals. Together, we can make a difference. 
                        </p>
                </MainText>
            </Main>
            
        </Root>
    )
}
