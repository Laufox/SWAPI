// Import hooks from react
import { useEffect, useState } from 'react';
// Import from react-router-dom
import { useParams } from 'react-router-dom';
// Import bootstrap components
import Button from 'react-bootstrap/Button';
// Import functions that communicate with SWAPI API
import SwapiAPI from '../services/SwapiAPI';

/**
 * 
 *  Page for traffic to /people/:id
 *  @returns full list of a specific movie
 * 
 */
const Film = () => {

    // Get id param from route
    const { id } = useParams();
    // Movie info for current page
    const [filmData, setFilmData] = useState();

    // Request data from API and apply result to useStates
    const getMovie = async (id) => {
        const res = await SwapiAPI.getMovie(id);
        if (res.status === 200) {
            setFilmData(res.data)
        }
        
    }

    // Use effect to run whenever id state changes
    useEffect( () => {
        getMovie(id);
    }, [id]);

    return (
        <>
            <h1>Movie info</h1>

            {
                filmData && <h2>{filmData.title}</h2>
            }
        </>
    )
}

export default Film