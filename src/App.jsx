import 'bootstrap/dist/css/bootstrap.css'
import './App.css';
import {Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation';
import Homepage from './pages/Homepage';
import Container from 'react-bootstrap/Container';
import People from './pages/People';

const App = () => {

    return (
        <div id="App">
            <Navigation />

            <Container>
                <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/people" element={<People />} />
                </Routes>
            </Container>
            
        </div>
      
    );
}

export default App;
