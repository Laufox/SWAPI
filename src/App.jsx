// Import css files
import 'bootstrap/dist/css/bootstrap.css'
import './App.css';
// Import components from react-router-dom
import {Routes, Route } from 'react-router-dom'
// Import Components from react-bootstrap
import Container from 'react-bootstrap/Container';
// Import own components
import Navigation from './components/Navigation';
// Import own pages
import Homepage from './pages/Homepage';
import People from './pages/People';
import Movies from './pages/Movies';
import Character from './pages/Character';
import Film from './pages/Film';

/**
 * 
 *  Main site component holding navigation and site routing
 * 
 */

const App = () => {

    return (
        <div id="app">
            {/* Navigation component to be shown on all pages */}
            <Navigation />

            {/* Container with routes for all possible pages the user can get to */}
            <Container>
                <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/people" element={<People />} />
                    <Route path="/people/:id" element={<Character />} />
                    <Route path="/films" element={<Movies />} />
                    <Route path="/films/:id" element={<Film />} />
                </Routes>
            </Container>
            
        </div>
      
    );
}

export default App;
