// Import hooks from react
import { useEffect, useState } from 'react';
// Import from react-router-dom
import { useParams, Link } from 'react-router-dom';
// Import bootstrap components
import Button from 'react-bootstrap/Button';
// Import functions that communicate with SWAPI API
import SwapiAPI from '../services/SwapiAPI';
// Import function to extract ID value from URL
import { getIdFromUrl } from '../services/getIdFromUrl';
import Loading from '../components/Loading';
import ErrorEl from '../components/ErrorEl';

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
    const [characterData, setCharacterData] = useState(false);
    const [loading, setLoading] = useState(false);
    const [hasError, setHasError] = useState(false);

    // Request data from API and apply result to useStates
    const getCharacter = async (id) => {

        setLoading(true);
        try {
            const res = await SwapiAPI.getCharacter(id);
            if (res.status === 200) {
                setCharacterData(res.data)
            }else {
                setHasError(true);
                setCharacterData(false);
            }
        } catch (error) {
            setHasError(true);
            setCharacterData(false);
        }
        setLoading(false);
        
    }

    // Use effect to run whenever id state changes
    useEffect( () => {
        getCharacter(id);
    }, [id]);

    return (
        <>
            <h1>Character info</h1>

            {
                loading && <Loading resource='Character' />
            }

            {
                hasError && <ErrorEl resource='Character' />
            }

            {
                characterData && (
                    <article className='character-item-article'>
                        <header>
                            <h2>{characterData.name}</h2>
                        </header>

                        <main>
                            <h3>Attributes</h3>
                            <ul>
                                <li>Born: {characterData.birth_year}</li>
                                <li>Gender: {characterData.gender}</li>
                                <li>Hieght: {characterData.height} cm</li>
                                <li>Mass: {characterData.mass} kg</li>
                                <li>Skin color: {characterData.skin_color}</li>
                                <li>Hair color: {characterData.hair_color}</li>
                                <li>Eye color: {characterData.eye_color}</li>  
                            </ul>     
                        </main>

                        <footer>
                            <h3>Stars in: </h3>
                            <div className='film-list'>
                            {
                                characterData.films.map( (film, index) => {
                                    return <Button key={index} variant="info" as={Link} to={`/films/${getIdFromUrl(film)}`}>{getIdFromUrl(film).padStart(2, '0')}</Button>
                                } )
                            }
                            </div>
                        </footer>
                    </article>
                )
            }
        </>
    )
}

export default Character