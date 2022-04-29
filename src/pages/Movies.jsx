// Import hooks from react
import { useEffect, useState } from 'react';
// Import from react-router-dom
import { useSearchParams } from 'react-router-dom';
// Import own components
import FilmList from '../components/FilmList';
import SearchForm from '../components/SearchForm';
import Pagination from '../components/Pagination';
import Loading from '../components/Loading';
import ErrorEl from '../components/ErrorEl';
// Import functions that communicate with SWAPI API
import SwapiAPI from '../services/SwapiAPI';

/**
 * 
 *  Page for traffic to /films
 * 
 */

const Movies = () => {

    // Search param to show results for page given by url query
    const [searchParams, setSearchParams] = useSearchParams();
    // Page constant to hold value of page parameter in url, or one if paramter is not set
    const page = searchParams.get('page') ? Number(searchParams.get('page')) : 1;
    // Query constant to hold value of query parameter in url
    const query = searchParams.get('query');
    // Movies info
    const [filmData, setFilmData] = useState(false);
    // Pagination page that is currently displaying
    const [currentPage, setCurrentPage] = useState(page);
    // Usestates for loading and error status
    const [loading, setLoading] = useState(false);
    const [hasError, setHasError] = useState(false);

    // Request data from API and apply reult to useStates
    const getMovies = async (page, query=null) => {

        setLoading(true);
        setFilmData(false);
        setHasError(false);

        try {

            // If there's a query parameter, request a search, otherwise request all people
            const res = query ? await SwapiAPI.getSearch("films", query, page) : await SwapiAPI.getResourceAll("films", page);
            if (res.status === 200) {

                setFilmData(res.data);   
                
            } else {

                setHasError(true);
                setFilmData(false);

            }

        } catch (error) {

            setHasError(true);
            setFilmData(false);

        } finally {

            setLoading(false);

        }
        
    }

    // Function to change what page the user is currently on
    const switchPage = async (num) => {

        // Change query parameters depending on if a search was made or not
        const paramObject = query ? {query, page: currentPage + num} : {page: currentPage + num}
        setSearchParams( paramObject );
        setCurrentPage( (prevCurrentPage) => {return prevCurrentPage + num} );

    }

    // Function for when search form has been submitted
    const handleSearch = (query) => {
        // Set query parameters and reset page number
        setSearchParams( { query } )
        setCurrentPage(1);
    }

    // Function for when search form requests to reset/empty search results
    const handleReset = () => {

        // Set query parameters and reset page number
        setSearchParams( {  } )
        setCurrentPage(1);
        // Call for new api result for all movies
        getMovies(1);

    }

    // Use effect to act when page url parameter changes
    useEffect( () => {

        setCurrentPage(page)

    }, [page])

    // Use effect to run whenever currentPage state changes
    useEffect( () => {

        getMovies(currentPage, query);
        window.scrollTo(0,0);
        
    }, [currentPage, query]);

    return (
        <>
            <h1>List of movies</h1>

            {/* Search form component */}
            <SearchForm onSearch={handleSearch} onShowAll={handleReset} />

            {
                // Apply loading component when loading state is true
                loading && <Loading resource='Movies' />
            }

            {
                // Apply error component when hasError state is true
                hasError && <ErrorEl resource='Movies' />
            }

            {
                // If a search had no hits, inform the user
                filmData && !filmData.count && (
                    <div className='loading-container'>
                        <p>There were no matches for {query}</p>
                    </div>
                    
                )
            }

            {/* If theres any result from API, display list component to user */}
            {
                filmData && filmData.results.length > 0 && (
                    <>
                    <FilmList list={filmData.results} title={query ? `Showing search results for "${query}":` : 'All movies:' } />
                    <Pagination paging={ {
                            prevPage: filmData.previous, 
                            nextPage: filmData.next, 
                            currentPage, 
                            numberOfPages: Math.ceil(filmData.count / 10)
                        } } onSwitch={ switchPage } />
                    </>
                )
            }
            
        </>
    )
}

export default Movies