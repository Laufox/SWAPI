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
                                filmData.characters.map( (character, index) => {
                                    return <Button key={index} variant="info" as={Link} to={`/people/${getIdFromUrl(character)}`}>{getIdFromUrl(character).padStart(2, '0')}</Button>
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