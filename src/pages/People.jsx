// Import hooks from react
import { useEffect, useState } from 'react';
// Import from react-router-dom
import { useSearchParams } from 'react-router-dom';
// Import own components
import PeopleList from '../components/PeopleList';
import SearchForm from '../components/SearchForm';
import Pagination from '../components/Pagination';
import Loading from '../components/Loading';
import ErrorEl from '../components/ErrorEl';
// Import functions that communicate with SWAPI API
import SwapiAPI from '../services/SwapiAPI';

/**
 * 
 *  Page for traffic to /people
 * 
 */

const People = () => {

    // Search param to show results for page given by url query
    const [searchParams, setSearchParams] = useSearchParams();
    // Page constant to hold value of page parameter in url, or one if paramter is not set
    const page = searchParams.get('page') ? Number(searchParams.get('page')) : 1;
    // Query constant to hold value of query parameter in url
    const query = searchParams.get('query');
    // Characters info
    const [peopleData, setPeopleData] = useState(false);
    // Pagination page that is currently displaying
    const [currentPage, setCurrentPage] = useState(page);
    // Usestates for loading and error status
    const [loading, setLoading] = useState(false);
    const [hasError, setHasError] = useState(false);

    // Request data from API and apply reult to useStates
    const getPeople = async (page, query = null) => {

        setLoading(true);
        setPeopleData(false);
        setHasError(false);

        try {

            // If there's a query parameter, request a search, otherwise request all people
            const res = query ? await SwapiAPI.getSearch("people", query, page) : await SwapiAPI.getResourceAll("people", page);
            if (res.status === 200) {

                setPeopleData(res.data);
                
            } else {

                setHasError(true);
                setPeopleData(false);

            }

        } catch (error) {

            setHasError(true);
            setPeopleData(false);

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
        // Call for new api result for all people
        getPeople(1);

    }

    // Use effect to act when page url parameter changes
    useEffect( () => {

        setCurrentPage(page)

    }, [page])

    // Use effect to run whenever currentPage or query state changes
    useEffect( () => {

        getPeople(currentPage, query);
        window.scrollTo(0, 0);
        
    }, [currentPage, query]);

    return (
        <>
            <h1>List of characters</h1>

            {/* Search form component */}
            <SearchForm onSearch={handleSearch} onShowAll={handleReset} />

            {
                // Apply loading component when loading state is true
                loading && <Loading resource='Characters' />
            }

            {
                // Apply error component when hasError state is true
                hasError && <ErrorEl resource='Characters' />
            }

            {
                // If a search had no hits, inform the user
                peopleData && !peopleData.count && (
                    <div className='loading-container'>
                        <p>There were no matches for {query}</p>
                    </div>
                    
                )
            }

            {/* If theres any result from API, display list and pagination component to user */}
            {
                peopleData && peopleData.results.length > 0 && (
                    <>
                    <PeopleList list={peopleData.results} title={query ? `Showing search results for "${query}":` : 'All characters:' } />
                    <Pagination paging={ {
                            prevPage: peopleData.previous, 
                            nextPage: peopleData.next, 
                            currentPage, 
                            numberOfPages: Math.ceil(peopleData.count / 10) 
                        } } onSwitch={ switchPage } />
                    </>
                )
            }

        </>
    )
}

export default People