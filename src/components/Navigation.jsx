// Import components from react-bootstrap
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
// Import from react-router-dom
import { Link, NavLink } from 'react-router-dom'

/**
 * 
 * @returns Navigation menu
 */
const Navigation = () => {
	return (

        <Navbar bg="dark" variant="dark" expand="md" className='mb-5'>
            <Container>
                <Navbar.Brand as={Link} to="/">Swapi</Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link as={NavLink} to="/people" end>People</Nav.Link>
                        <Nav.Link as={NavLink} to="/films">Movies</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>    
        
	)
}

export default Navigation
