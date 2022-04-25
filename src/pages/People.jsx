// Import hooks from react
import { useEffect, useState } from 'react';
// Import from react-router-dom
import { useSearchParams } from 'react-router-dom';
// Import bootstrap components
import Button from 'react-bootstrap/Button';
// Import own components
import PeopleList from '../components/PeopleList';
// Import functions that communicate with SWAPI API
import SwapiAPI from '../services/SwapiAPI';

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
    const page = searchParams.get('page') ? searchParams.get('page') : 1;
    // Characters info for current page
    const [peopleList, setPeopleList] = useState([]);
    // Page that is currently displaying
    const [currentPage, setCurrentPage] = useState(page);
    // Usestates for knowing if pagination button should be clickable
    const [prevPage, setPrevPage] = useState(null);
    const [nextPage, setNextPage] = useState(null);

    // Request data from API and apply reult to useStates
    const getPeople = async (page) => {

        const res = await SwapiAPI.getAllPeople(page);
        if (res.status === 200) {
            setPeopleList(res.data.results)
            setNextPage(res.data.next);
            setPrevPage(res.data.previous);
        }
        
    }

    // Function to change what page the user is currently on
    const switchPage = async (num) => {
        
        setSearchParams( { page: currentPage + num } );
        setCurrentPage( (prevCurrentPage) => {return prevCurrentPage + num} );
        
    }

    // Use effect to run whenever currentPage state changes
    useEffect( () => {
        getPeople(currentPage);
    }, [currentPage]);

    return (
        <>
            <h1>List of people</h1>

            {/* If theres any result from API, display list component to user */}
            {
                peopleList && <PeopleList list={peopleList} title="Characters" />
            }

            {/* Display pagination */}
            <Button variant="info" onClick={ () => { switchPage(-1) } } disabled={prevPage === null}>Previous</Button>
            <Button variant="info" onClick={ () => { switchPage(1) } } disabled={nextPage === null}>Next</Button>
        </>
    )
}

export default People