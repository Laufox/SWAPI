// Import from react-router-dom
import { Link } from "react-router-dom"

/** 
 * 
 *  Page for traffic to /
 * 
 */

const Homepage = () => {
    return (
        <>
            <h1>Welcome to star wars</h1>

            {/* Show list of available lists */}
            <ul className="index-list">
                <li>
                    <Link to="/people" >View character list</Link>
                </li>
                <li>
                    <Link to="/films" >View movie list</Link>
                </li>
            </ul>
            
            
        </>
    )
}

export default Homepage