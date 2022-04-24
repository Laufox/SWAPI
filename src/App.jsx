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

/**
 * 
 *  Main site component holding navigation and site routing
 * 
 */
const App = () => {

    return (
        <div id="App">
            {/* Navigation component to be shown on all pages */}
            <Navigation />

            {/* Container with routes for all possible pages the user can get to */}
            <Container>
                <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/people" element={<People />} />
                    <Route path="/films" element={<Movies />} />
                </Routes>
            </Container>
            
        </div>
      
    );
}

export default App;
