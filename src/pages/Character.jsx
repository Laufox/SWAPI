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
 *  @returns full list of a specific character
 * 
 */
const Character = () => {

    // Get id param from route
    const { id } = useParams();
    // Characters info for current page
    const [characterData, setCharacterData] = useState();

    // Request data from API and apply result to useStates
    const getCharacter = async (id) => {
        const res = await SwapiAPI.getCharacter(id);
        if (res.status === 200) {
            setCharacterData(res.data)
        }
        
    }

    // Use effect to run whenever id state changes
    useEffect( () => {
        getCharacter(id);
    }, [id]);

    return (
        <>
            <h1>Character info</h1>

            {
                characterData && <h2>{characterData.name}</h2>
            }
        </>
    )
}

export default Character