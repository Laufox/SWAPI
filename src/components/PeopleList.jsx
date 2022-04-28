// Import component from react-bootstrap
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button';
// Import from react-router-dom
import { Link } from "react-router-dom"
// Import function to extract ID value from URL
import { getIdFromUrl } from '../services/getIdFromUrl'

/** 
 * 
 *  Component to display a list of people from SWAPI API
 * 
 */

const PeopleList = ({list, title}) => {

    return (
        <section>
            <h2>{title}</h2>

            <ListGroup className='swapi-list'>
                {
                    // Loop over all items in list as a clickable link-item
                    list.map( (item, index) => {
                        return <ListGroup.Item key={index} action as={Link} to={`/people/${getIdFromUrl(item.url)}`} className='swapi-list-item'>
                                    
                                    <article>

                                        <header>
                                            <h3>{item.name}</h3>
                                        </header>

                                        <main>
                                            Born { item.birth_year } / { item.mass } kg / { item.films.length } movies
                                        </main>

                                        <footer>
                                            <Button variant="info">More info about {item.name}</Button>
                                        </footer>

                                    </article>

                               </ListGroup.Item>
                    } )
                }
            </ListGroup>

        </section>
        
    )
}

export default PeopleList