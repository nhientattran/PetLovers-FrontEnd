// External Imports
import React, { useState } from 'react';
import { TextField, Button, Box, Container, Typography } from '@mui/material';

// Internal Imports
import { ButtonFlex,  Root } from '../Home';
import { MainSignin, signinStyles } from '../SignIn';
import { useNavigate } from 'react-router-dom';

interface petTypeSelectionProps {
    onSearch: (petType: string, zipCode: string) => void;
}

export const PetTypeSelection: React.FC<petTypeSelectionProps> = ({ onSearch }) => {
    const [petType, setPetType] = useState<string>('dog');
    const [zipCode, setZipCode] = useState<string>('');
    const navigate = useNavigate()

    const handleZipCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setZipCode(event.target.value)
    };

    const handleSearch = (selectedPetType:string) => {
        onSearch(petType, zipCode)
        navigate(`/petlist?type=${selectedPetType}&zip=${zipCode}`)
    };

    const myAuth = localStorage.getItem('myAuth')
    
    if (myAuth === 'true') {
        return (
            <Root>
                <MainSignin sx={{backgroundImage:'none'}}>
                    <Container maxWidth='sm'>
                        <Typography sx={signinStyles.typographyStyle}>
                            Search for Pet
                        </Typography>
                        <Box display='flex' flexDirection='column'>
                                <TextField
                                    label='Zip Code'
                                    value={zipCode}
                                    onChange={handleZipCodeChange}
                                    variant='outlined'
                                    size='small' />
                                <ButtonFlex>
                                    <Button variant='contained' color='primary' onClick={() => handleSearch('dog')}>
                                        Search Dogs
                                    </Button>
                                    <Button variant='contained' color='primary' onClick={() => handleSearch('cat')}>
                                        Search Cats
                                    </Button>
                                </ButtonFlex>
                        </Box>
                    </Container>
                </MainSignin>
        </Root>
        )
    } else {
        return (
            <Box>
                <Typography variant='h4'>Please sign in to start the journey with me!</Typography>
            </Box>
        )
    }
};
