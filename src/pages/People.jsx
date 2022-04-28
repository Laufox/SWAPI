// Import hooks from react
import { useEffect, useState } from 'react';
// Import from react-router-dom
import { useSearchParams } from 'react-router-dom';
// Import own components
import PeopleList from '../components/PeopleList';
import SearchForm from '../components/SearchForm';
// Import functions that communicate with SWAPI API
import SwapiAPI from '../services/SwapiAPI';
import Pagination from '../components/Pagination';

/**
 * 
 *  Page for traffic to /people
 *  @returns full list of people with pagination
 * 
 */
const People = () => {

    // Search param to show results for page given by url query
    const [searchParams, setSearchParams] = useSearchParams();
    // If url has page param use it in page constant, otherwise set it to one
    const page = searchParams.get('page') ? Number(searchParams.get('page')) : 1;
    const query = searchParams.get('query');
    // Characters info for current page
    const [peopleList, setPeopleList] = useState([]);
    // Page that is currently displaying
    const [currentPage, setCurrentPage] = useState(page);
    // Usestates for knowing if pagination button should be clickable
    const [prevPage, setPrevPage] = useState(null);
    const [nextPage, setNextPage] = useState(null);
    const [numberOfPages, setNumberOfPages] = useState();

    // Request data from API and apply reult to useStates
    const getPeople = async (page, query = null) => {

        // If there's a query parameter, request a search otherwise request all people
        const res = query ? await SwapiAPI.getSearch("people", query, page) : await SwapiAPI.getAllPeople(page);
        if (res.status === 200) {
            setPeopleList(res.data.results)
            setNextPage(res.data.next);
            setPrevPage(res.data.previous);
            setNumberOfPages(res.data.count);
        }
        
    }

    // Function to change what page the user is currently on
    const switchPage = async (num) => {

        // Change query parameters depending on if a search was made or not
        const paramObject = query ? {query, page: currentPage + num} : {page: currentPage + num}
        setSearchParams( paramObject );
        setCurrentPage( (prevCurrentPage) => {return prevCurrentPage + num} );
        
    }

    const handleSearch = (query) => {

        // Set query parameters and reset page number
        setSearchParams( { query } )
        setCurrentPage(1);

    }

    const handleReset = () => {

        // Set query parameters and reset page number
        setSearchParams( {  } )
        setCurrentPage(1);
        getPeople(1);

    }

    useEffect( () => {

        setCurrentPage(page)

    }, [page])

    // Use effect to run whenever currentPage or query state changes
    useEffect( () => {

        getPeople(currentPage, query);
        
    }, [query, currentPage]);

    return (
        <>
            <h1>List of people</h1>

            {/* Search form component */}
            <SearchForm onSearch={handleSearch} onShowAll={handleReset} />

            {/* If theres any result from API, display list component to user */}
            {
                peopleList && <PeopleList list={peopleList} title="Characters" />
            }

            <Pagination paging={{prevPage, nextPage, currentPage, numberOfPages}} onSwitch={ switchPage } />
        </>
    )
}

export default People