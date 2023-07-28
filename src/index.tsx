// External Imports
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import { FirebaseAppProvider } from 'reactfire';
import 'firebase/auth';

// Internal Imports
import { Home, LearnMore, SignIn, SignUp, Dashboard, PetList, FavoritePet } from './components/index';
import './index.css';
import { theme } from './Theme/themes';
import { firebaseConfig } from './firebaseConfig';


ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <FirebaseAppProvider firebaseConfig={firebaseConfig}>
            <ThemeProvider theme={theme}>
                <Router>
                    <Routes>
                        <Route path='/' element={<Home title={'Pet Lovers'} />} />
                        <Route path='/learnmore' element={<LearnMore title={'Learn More'} />} />
                        <Route path='/dashboard' element={<Dashboard />} />
                        <Route path='/signin' element={<SignIn />} />
                        <Route path='/signup' element={<SignUp />} />
                        <Route path='/petlist' element={<PetList favoritePets={[]} onFavoriteClick={() => {}} />} />
                        <Route path='/favorite' element={<FavoritePet pets={[]} />} />
                    </Routes>
                </Router>
            </ThemeProvider>
        </FirebaseAppProvider>
    </React.StrictMode>
)

