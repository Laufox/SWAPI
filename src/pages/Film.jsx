// Import hooks from react
import { useEffect, useState } from 'react';
// Import from react-router-dom
import { useParams, Link } from 'react-router-dom';
// Import bootstrap components
import Button from 'react-bootstrap/Button';
// Import functions that communicate with SWAPI API
import SwapiAPI from '../services/SwapiAPI';
// Import function to extract ID value from URL
import { getIdFromUrl } from '../services/getIdFromUrl'
// Import own components
import Loading from '../components/Loading';
import ErrorEl from '../components/ErrorEl';

/**
 * 
 *  Page for traffic to /films/:id
 * 
 */

const Film = () => {

    // Get id param from route
    const { id } = useParams();
    // Movie info for current page
    const [filmData, setFilmData] = useState(false);
    // Usestates for loading and error status
    const [loading, setLoading] = useState(false);
    const [hasError, setHasError] = useState(false);

    // Request data from API and apply result to useStates
    const getMovie = async (id) => {

        setLoading(true);

        try {

            const res = await SwapiAPI.getResourceOne("films", id);
            if (res.status === 200) {

                setFilmData(res.data);

            }else {

                setHasError(true);
                setFilmData(false);

            }

        } catch (error) {

            setHasError(true);
            setFilmData(false);

        }
        
        setLoading(false);
        
    }

    // Use effect to run whenever id state changes
    useEffect( () => {
        getMovie(id);
    }, [id]);

    return (
        <>
            <h1>Movie info</h1>

            {
                // Apply loading component when loading state is true
                loading && <Loading resource='Movie' />
            }

            {
                // Apply error component when hasError state is true
                hasError && <ErrorEl resource='Movie' />
            }

            {
                // If filmData state is truthy, print information about it
                filmData && (
                    <article className='film-item-article'>
                        <header>
                            <h2>{filmData.title}</h2>
                        </header>

                        <main>
                            <h3>About</h3>
                            <pre>{filmData.opening_crawl}</pre>
                            <aside>
                                <p>Episode: { filmData.episode_id}</p>
                                <p>Released: { filmData.release_date }</p>
                                <p>Directed by: { filmData.director }</p>
                            </aside>      
                        </main>

                        <footer>
                            <h3>Characters featured: </h3>
                            <div className='character-list'>
                            {
                                // List navigation to all characters in movie
                                filmData.characters.map( (character, index) => {
                                    return <Button key={index} variant="success" as={Link} to={`/people/${getIdFromUrl(character)}`}>{getIdFromUrl(character).padStart(2, '0')}</Button>
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

export default Film