import { Link } from "react-router-dom"

const Homepage = () => {
    return (
        <>
            <h1>Welcome to star wars</h1>

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