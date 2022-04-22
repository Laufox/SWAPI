import ListGroup from 'react-bootstrap/ListGroup'
import { Link } from "react-router-dom"

const SwapiList = ({list, title}) => {
    return (
        <section>
            <h2>{title}</h2>

            <ListGroup>
                {
                    list.map( (item, index) => {
                        return <ListGroup.Item key={index} action as={Link} to={`/`}>
                                    <h3>{item.name}</h3>
                               </ListGroup.Item>
                    } )
                }
            </ListGroup>

        </section>
        
    )
}

export default SwapiList