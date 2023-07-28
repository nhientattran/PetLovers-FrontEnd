import React, { useState } from 'react';
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
    Button, 
    CssBaseline,
    Box,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Container,
    Alert,
    AlertTitle,
    Snackbar
} from '@mui/material';
import { getAuth } from 'firebase/auth';
import MenuIcon from '@mui/icons-material/Menu';
import { ChevronRight, ChevronLeft } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { theme } from '../../Theme/themes';
import { PetTypeSelection } from '../Form/PetTypeSelection';


export const drawerWidth = 240;
export const myStyles = {
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        })
    },

    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        })
    },

    menuButton: {
        marginRight: theme.spacing(2)
    },

    hide: {
        display: 'none'
    },

    drawer: {
        width: drawerWidth,
        flexShrink: 0
    },

    drawerPaper: {
        width: drawerWidth
    },

    drawerHeader: {
        display: 'flex',
        width: drawerWidth,
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end'
    },

    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        marginLeft: 0
    },

    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        }),
        marginLeft: 0
    },

    toolbar: {
        display: 'flex'
    },

    toolbarButton: {
        marginLeft: 'auto',
        backgroundColor: 'red'
    }
}

export const Dashboard = () => {
    const navigate = useNavigate()
    const [ open, setOpen ] = useState(false);
    const [ dialogOpen, setDialogOpen ] = useState(false);
    const [selectedPetType, setSelectedPetType] = useState<string>('dog');
    const [zipCode, setZipCode] = useState<string>('');

    const handleDrawerOpen = () => {
        setOpen(true)
    }

    const handleDrawerClose = () => {
        setOpen(false)
    }

    const handleDialogOpen = () => {
        setDialogOpen(true)
    }

    const handleDialogClose = () => {
        setDialogOpen(false)
    }

    const handleSearch = (petType: string, zipCode: string) => {
        setSelectedPetType(petType)
        setZipCode(zipCode)
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
                            <Typography variant='h6' noWrap>Dashboard</Typography>
                            {myAuth === 'true' ?
                                <Button onClick={() => navigate('/favorite')} sx={myStyles.toolbarButton}>My Favorite</Button>
                                :
                                <div></div>
                            }
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
                        <Box sx={myStyles.content}>
                            <Box sx={{paddingTop: '50px'}}>
                                <PetTypeSelection onSearch={handleSearch} />
                            </Box>
                        </Box>
        </Box>
    )
};