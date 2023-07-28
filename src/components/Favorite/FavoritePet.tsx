import React, { useEffect, useState } from 'react';
import {
    Drawer as MUIDrawer,
    ListItemButton,
    List,
    ListItemText, 
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Divider, 
    CssBaseline,
    Box,
    Card,
    CardHeader,
    Avatar,
    CardMedia,
    CardContent,
    CardActions,
    Collapse
} from '@mui/material';
import { getAuth } from 'firebase/auth';
import { ChevronRight, ChevronLeft } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { theme } from '../../Theme/themes';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MenuIcon from '@mui/icons-material/Menu';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// Internal Imports
import { PetTypeSelection } from '../Form/PetTypeSelection';
import { Pet, PetList } from '../PetList';
import { drawerWidth } from '../Dashboard';
import { myStyles } from '../Dashboard';
import { red } from '@mui/material/colors';
import { fetchPets } from '../../api';
import { serverCalls } from '../../api';

interface FavoritePetProps {
    pets: Pet[]
}

export const FavoritePet: React.FC<FavoritePetProps> = ({ pets }) => {
    const navigate = useNavigate()
    const [ open, setOpen ] = useState(false)
    const [favoritePets, setFavoritePets] = useState<Pet[]>([])
    const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({})

    const handleExpandClick = (petName:string) => {
            setExpanded((prevExpanded) => ({
                ...prevExpanded,
                [petName]: !prevExpanded[petName]
            }))
        }

    const handleDrawerOpen = () => {
        setOpen(true)
    }

    const handleDrawerClose = () => {
        setOpen(false)
    }

    const handleDeleteClick = async (petName: string) => {
        const isFavorite = favoritePets.some((pet) => pet.name === petName);
    
        if (isFavorite) {
            const updatedFavoritePets = favoritePets.filter(
                (pet) => pet.name !== petName
            );
            setFavoritePets(updatedFavoritePets);
    
            try {
                await serverCalls.delete(petName);
                console.log(`Pet ${petName} removed from favorites.`);
                setFavoritePets((prevFavoritePets) => 
                    prevFavoritePets.filter((pet) => pet.name !== petName)
                );
            } catch (error) {
                console.log('Failed to remove favorite pet:', error);
        }
    };
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
        const fetchFavoritePets = async() => {
            try {
                const favoritePets = await serverCalls.get()
                setFavoritePets(favoritePets);
                console.log(favoritePets);
            } catch (error) {
                console.error('Error fetching favorite pets:', error)
            }
        }

        fetchFavoritePets()
    },[])

    return (
        <Box sx={{display: 'flex'}}>
            <CssBaseline />
                <AppBar
                    sx = {open ? myStyles.appBarShift: myStyles.appBar}
                    position='fixed'>
                        <Toolbar sx={myStyles.toolbar}>
                            <IconButton
                                color='inherit'
                                aria-label='open drawer'
                                onClick={ handleDrawerOpen }
                                edge='start'
                                sx={ open ? myStyles.hide: myStyles.menuButton }>
                                <MenuIcon />
                            </IconButton>
                            <Typography variant='h6' noWrap>Favorite</Typography>
                        </Toolbar>
                    </AppBar>
                    <MUIDrawer 
                        sx={open ? myStyles.drawer: {display: 'none'}}
                        variant='persistent'
                        anchor='left'
                        open={open}
                        style={{width: drawerWidth}}>
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
                                        )
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
                            {favoritePets.map((pet) => (
                                <Card key={pet.name} sx={{width:450, marginBottom:'1rem', border:'1px black'}}>
                                    <CardHeader
                                        avatar={
                                            <Avatar sx={{ bgcolor: red[500] }} aria-label='pet'>
                                                {pet.name.charAt(0)}
                                            </Avatar>
                                        }
                                        title={pet.name}
                                        subheader={pet.age} />
                                        
                                        <CardMedia component='img' height='350' image={pet.photos[0].medium} alt={pet.name} />

                                        {pet.description && (
                                            <CardContent>
                                                <Typography variant='body2' color='text.secondary'>
                                                    {pet.description}
                                                </Typography>
                                            </CardContent>
                                        )}
                                        <CardContent>
                                            <CardActions disableSpacing>
                                                <IconButton 
                                                    aria-label='remove from favorites' 
                                                        onClick={() => handleDeleteClick(pet.name)} >
                                                        {favoritePets.some((favoritePet) => favoritePet.name === pet.name) ? (
                                                            <FavoriteIcon color='error' />
                                                        ):(
                                                            <FavoriteIcon />
                                                        )}   
                                                    </IconButton>
                                                    <IconButton 
                                                        aria-label='show more'
                                                        onClick={() => handleExpandClick(pet.name)}
                                                        aria-expanded={expanded[pet.name]} >
                                                            <ExpandMoreIcon />
                                                        </IconButton>
                                            </CardActions>
                                            <Collapse in={expanded[pet.name]} timeout='auto' unmountOnExit>
                                                <CardContent>
                                                    {pet.breeds && (
                                                        <>
                                                        <Typography paragraph>Breed: {pet.breeds.primary}</Typography> 
                                                        <Typography paragraph>Gender: {pet.gender}</Typography>
                                                        <Typography paragraph>Size: {pet.size}</Typography>
                                                        <Typography paragraph>Contact:</Typography>
                                                        <Typography paragraph>- Email: {pet.contact.email}</Typography>
                                                        <Typography paragraph>- Phone Number: {pet.contact.phone}</Typography>
                                                        <Typography paragraph>Distance: {Math.floor(parseInt(pet.distance))} miles</Typography>
                                                        </>
                                                    )}
                                                </CardContent>
                                            </Collapse>
                                        </CardContent>
                                </Card>
                            )
                            )}
                            </div>
                        </Box>
    </Box>
    )}
