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
    // Films info for current page
    const [filmList, setFilmList] = useState(false);
    // Pagination page that is currently displaying
    const [currentPage, setCurrentPage] = useState(page);
    // Usestates for knowing if pagination button should be clickable
    const [prevPage, setPrevPage] = useState(null);
    const [nextPage, setNextPage] = useState(null);
    // Amount of pagination pages to display
    const [numberOfPages, setNumberOfPages] = useState();
    // Usestates for loading and error status
    const [loading, setLoading] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [emptySearchResponse, setEmptySearchRespons] = useState(false);

    // Request data from API and apply reult to useStates
    const getMovies = async (page, query=null) => {

        setLoading(true);
        setFilmList(false);
        setEmptySearchRespons(false);
        try {
            // If there's a query parameter, request a search, otherwise request all people
            const res = query ? await SwapiAPI.getSearch("films", query, page) : await SwapiAPI.getAllFilms(page);
            if (res.status === 200) {
                if (res.data.count === 0) {
                    setEmptySearchRespons(true);
                } else {
                    setFilmList(res.data.results)
                    setNextPage(res.data.next);
                    setPrevPage(res.data.previous);
                    setNumberOfPages(Math.ceil(res.data.count / 10));
                }
                
            } else {
                setHasError(true);
            }
        } catch (error) {
            setHasError(true);
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
                emptySearchResponse && (
                    <div className='loading-container'>
                        <p>There were no matches for {query}</p>
                    </div>
                    
                )
            }

            {/* If theres any result from API, display list component to user */}
            {
                filmList && (
                    <>
                    <FilmList list={filmList} title={query ? `Showing search results for ${query}:` : 'All movies:' } />
                    <Pagination paging={ {prevPage, nextPage, currentPage, numberOfPages} } onSwitch={ switchPage } />
                    </>
                )
            }
            
        </>
    )
}

export default Movies