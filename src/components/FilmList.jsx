// Import component from react-bootstrap
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button';
// Import from react-router-dom
import { Link } from "react-router-dom"
// Import function to extract ID value from URL
import { getIdFromUrl } from '../services/getIdFromUrl'

/** 
 * 
 *  Component to display a list of films from SWAPI API
 * 
 */

const FilmList = ({list, title}) => {
    
    return (
        <section>
            <h2>{title}</h2>

            <ListGroup className='swapi-list'>
                {
                    // Loop over all items in list as a clickable link-item
                    list.map( (item, index) => {
                        return <ListGroup.Item key={index} action as={Link} to={`/films/${getIdFromUrl(item.url)}`} className='swapi-list-item'>

                                    <article>

                                        <header>
                                            <h3>{item.title}</h3>
                                        </header>

                                        <main>
                                            { item.release_date } / { item.director } / { item.characters.length } characters
                                        </main>

                                        <footer>
                                            <Button variant="info">More info about {item.title}</Button>
                                        </footer>

                                    </article>
                                    
                               </ListGroup.Item>
                    } )
                }
            </ListGroup>

        </section>
        
    )
}

export default FilmList