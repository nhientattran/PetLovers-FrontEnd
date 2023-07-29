// External Imports
import React, { useEffect, useState } from 'react';
import { fetchPets } from '../../api';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    Drawer as MUIDrawer,
    AppBar,
    Box,
    CssBaseline,
    ListItemButton,
    List,
    ListItemText, 
    Toolbar,
    IconButton,
    Typography,
    Divider, 
    Avatar,
    Card,
    CardHeader,
    CardMedia,
    CardContent,
    CardActions,
    Collapse,
    Button
} from '@mui/material';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MenuIcon from '@mui/icons-material/Menu';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ChevronRight, ChevronLeft } from '@mui/icons-material';

// Internal Imports
import { theme } from '../../Theme/themes';
import { drawerWidth, myStyles } from '../Dashboard';
import { serverCalls } from '../../api/server';

export interface Pet {
    name: string;
    photos: {
        small: string;
        medium: string;
        large: string;
        full: string;
    }[];
    description: string;
    breeds: {
        mixed: boolean;
        primary: string;
        secondary: string;
        unknown: boolean;
    };
    gender: string;
    age: string;
    size: string;
    distance: string;
    contact: {
        email: string;
        phone: string;
    };
}

export interface NewPet {
    name: string;
    photos: string;
    description: string;
    breeds: string;
    gender: string;
    age: string;
    size: string;
    distance: string;
    contact: string;
  }

export const PetList = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const searchParams = new URLSearchParams(location.search)
    const petType = searchParams.get('type') || 'dog'
    const zipCode = searchParams.get('zip') || ''

    const [pets, setPets] = useState<Pet[]>([])
    const [open, setOpen] = useState(false)
    const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({})
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [totalPages, setTotalPages] = useState<number>(1)
    const [favoritePetsList, setFavoritePetsList] = useState<Pet[]>([])

    const handleDrawerOpen = () => {
        setOpen(true)
    }

    const handleDrawerClose = () => {
        setOpen(false)
    }

    const handleFavoriteClick = async (petName: string) => {
        const isFavorite = favoritePetsList.some((pet) => pet.name === petName)
        
        if (isFavorite) {
            const updatedFavoritePets = favoritePetsList.filter ((pet) => pet.name !== petName)
            setFavoritePetsList(updatedFavoritePets)
        } else {
            const selectedPet = pets.find((pet) => pet.name === petName)

                if (selectedPet) {
                    const newPet: NewPet = {
                        name: selectedPet.name,
                        photos: selectedPet.photos[0].medium,
                        description: selectedPet.description,
                        breeds: selectedPet.breeds.primary,
                        gender: selectedPet.gender,
                        age: selectedPet.age,
                        size: selectedPet.size,
                        distance: selectedPet.distance,
                        contact: selectedPet.contact.email,
                      };
                      
                    console.log(newPet)
                    
                
                try {
                    await serverCalls.create(newPet)
                    const updatedFavoritePets = [...favoritePetsList, selectedPet]
                    setFavoritePetsList(updatedFavoritePets)
                } catch (error) {
                    console.error('Failed to save favorite pet:', error)
                }
            }}
        }
    


    const generatePageNumber = (totalPages: number) => {
        const maxPages = 5
        const currentPageIndex = currentPage - 1
        
        if (totalPages <= maxPages) {
            return Array.from({ length: totalPages }, (_, index) => index + 1)
        } else {
            const pageNumbers: (number | '...')[] = []

            let startPageIndex = currentPageIndex - Math.floor(maxPages / 2)
            let endPageIndex = currentPageIndex + Math.floor(maxPages / 2)

            if (startPageIndex <= 0) {
                startPageIndex = 0
                endPageIndex = maxPages - 1
            } else if (endPageIndex >= totalPages - 1) {
                startPageIndex = totalPages - maxPages
                endPageIndex = totalPages - 1
            }

            if (startPageIndex > 0) {
                pageNumbers.push(1)
                if (startPageIndex > 1) {
                    pageNumbers.push('...')
                }
            }

            for (let i = startPageIndex; i <= endPageIndex; i++) {
                pageNumbers.push(i + 1)
            }

            if (endPageIndex < totalPages - 1) {
                if(endPageIndex < totalPages - 2) {
                    pageNumbers.push('...')
                }
                pageNumbers.push(totalPages)
            }

            return pageNumbers
        }
    }

    const handleExpandClick = (petName:string) => {
        setExpanded((prevExpanded) => ({
            ...prevExpanded,
            [petName]: !prevExpanded[petName]
        }))
    }

    const myAuth = localStorage.getItem('myAuth')

    const itemList = () => {
        if (myAuth === 'false') {
            return [
            {
                text: 'Home',
                onClick: () => navigate('/')
            },
            {
                text: 'Sign In',
                onClick: () => navigate('/signin')
            }
        ];
        } else {
            return [
            {
                text: 'Home',
                onClick: () => navigate('/')
            },
            {
                text: 'Dashboard',
                onClick: () => navigate('/dashboard')
            },
            {
                text: 'Sign Out',
                onClick: () => navigate('/signin')
            }
        ];
        }
    }
    

    useEffect(() => {
        async function getPets() {
            try {
                const { animals, pagination } = await fetchPets(zipCode, petType, currentPage)
                setPets(animals)
                setTotalPages(pagination.total_pages)
            } catch (error) {
                console.error('Error fetching pets:', error)
            }
        }

        getPets();
    }, [ zipCode, petType, currentPage ]);


    return (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <CssBaseline />
                    <AppBar
                        sx={open ? myStyles.appBarShift : myStyles.appBar}
                        position='fixed'>
                        <Toolbar sx={myStyles.toolbar}>
                            <IconButton
                                color='inherit'
                                aria-label='open drawer'
                                onClick={handleDrawerOpen}
                                edge='start'
                                sx={open ? myStyles.hide : myStyles.menuButton}>
                                <MenuIcon />
                            </IconButton>
                            <Typography variant='h6' noWrap>Pet List</Typography>
                            <Button onClick={() => navigate('/favorite')} sx={myStyles.toolbarButton}>My Favorite</Button>
                        </Toolbar>
                    </AppBar>
                <MUIDrawer
                    sx={open ? myStyles.drawer : { display: 'none' }}
                    variant='persistent'
                    anchor='left'
                    open={open}>
                    <Box
                        sx={myStyles.drawerHeader}>
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'ltr' ? <ChevronLeft /> : <ChevronRight />}
                        </IconButton>
                    </Box>
                    <Divider />
                    <List>
                        {itemList().map((item) => {
                            const { text, onClick } = item;
                            return (
                                <ListItemButton key={text} onClick={onClick}>
                                    <ListItemText primary={text} />
                                </ListItemButton>
                            );
                        })}
                    </List>
                </MUIDrawer>
                <Box 
                    sx={{
                        display: 'flex',
                        flex: 1,
                        flexDirection: 'column',
                        alignItems: 'center',
                        transition: 'margin-left 0.3s ease'
                    }}>
                    <div style={{ marginTop: '3em', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', padding: '40px', marginLeft: open ? drawerWidth: 0 }}>
                    {pets.map((pet) => (
                        <Card key={pet.name} sx={{ width: 450, marginBottom: '1rem', border: '1px black' }}>
                            <CardHeader
                                avatar={
                                    <Avatar sx={{ bgcolor: red[500] }} aria-label='pet'>
                                        {pet.name.charAt(0)}
                                    </Avatar>
                                }
                                title={pet.name}
                                subheader={pet.age} />
                                {pet.photos.length > 0 && (
                                    <CardMedia component='img' height='350' image={pet.photos[0].medium} alt={pet.name} />
                                )}
                                {pet.description && (
                                    <CardContent>
                                        <Typography variant='body2' color='text.secondary'>
                                            {pet.description}
                                        </Typography>
                                    </CardContent>
                                )}
                            <CardContent>
                                <CardActions disableSpacing>
                                    <IconButton aria-label='add to favorites' onClick={() => handleFavoriteClick(pet.name)}>
                                        {favoritePetsList.some((favoritePet) => favoritePet.name === pet.name) ? (
                                            <FavoriteIcon color='error' />
                                        ) : (
                                        <FavoriteIcon />
                                        )}
                                    </IconButton>
                                    <IconButton 
                                        aria-label='show more'
                                        onClick={() => handleExpandClick(pet.name)}
                                        aria-expanded={expanded[pet.name]}>
                                            <ExpandMoreIcon />
                                        </IconButton>
                                </CardActions>
                                <Collapse in={expanded[pet.name]} timeout='auto' unmountOnExit>
                                    <CardContent>
                                        <Typography paragraph>Breed: {pet.breeds.primary}</Typography>
                                        <Typography paragraph>Gender: {pet.gender}</Typography>
                                        <Typography paragraph>Size: {pet.size}</Typography>
                                        <Typography paragraph>Contact:</Typography>
                                        <Typography paragraph>- Email: {pet.contact.email}</Typography>
                                        <Typography paragraph>- Phone Number: {pet.contact.phone}</Typography>
                                        <Typography paragraph>Distance: {Math.floor(parseInt(pet.distance))} miles</Typography>
                                    </CardContent>
                                </Collapse>
                            </CardContent>
                        </Card>
                    ))}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center',  marginBottom:'15px'}}>
                        {generatePageNumber(totalPages).map((page) => (
                            <Button 
                                color='primary'
                                variant='contained'
                                key={page}
                                onClick={() => {
                                    if (typeof page === 'number') {
                                        setCurrentPage(page)
                                        window.scrollTo(0, 0)
                                    }
                                }}
                                disabled={typeof page === 'number' && currentPage === page}
                                >
                                    {page}
                                </Button>
                        ))}
                    </div>
                </Box>
            </Box>
    )
}
