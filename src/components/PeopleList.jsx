// Import component from react-bootstrap
import ListGroup from 'react-bootstrap/ListGroup'
// Import from react-router-dom
import { Link } from "react-router-dom"
// Import function to extract ID value from URL
import { getIdFromUrl } from '../services/getIdFromUrl'

/** 
 *  Component to display a list of people from SWAPI API
 */
const PeopleList = ({list, title}) => {

    return (
        <section>
            <h2>{title}</h2>

            <ListGroup>
                {
                    // Loop over all items in list as a clickable link-item
                    list.map( (item, index) => {
                        return <ListGroup.Item key={index} action as={Link} to={`/people/${getIdFromUrl(item.url)}`}>
                                    <h3>{item.name}</h3>
                               </ListGroup.Item>
                    } )
                }
            </ListGroup>

        </section>
        
    )
}

export default PeopleList