// Import component from react-bootstrap
import ListGroup from 'react-bootstrap/ListGroup'
// Import from react-router-dom
import { Link } from "react-router-dom"

/** 
 *  Component to display a list of films from SWAPI API
 */
const FilmList = ({list, title}) => {
    return (
        <section>
            <h2>{title}</h2>

            <ListGroup>
                {
                    // Loop over all items in list as a clickable link-item
                    list.map( (item, index) => {
                        return <ListGroup.Item key={index} action as={Link} to={`/`}>
                                    <h3>{item.title}</h3>
                               </ListGroup.Item>
                    } )
                }
            </ListGroup>

        </section>
        
    )
}

export default FilmList