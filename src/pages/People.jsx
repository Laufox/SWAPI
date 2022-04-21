import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import SwapiAPI from '../services/SwapiAPI';

const People = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const [prevPage, setPrevPage] = useState(null);
    const [nextPage, setNextPage] = useState(null);

    const getPeople = async (page) => {
        const res = await SwapiAPI.getAllPeople(page);
        if (res.status === 200) {
            console.log(res.data);
            setNextPage(res.data.next);
            setPrevPage(res.data.previous);
        }
        
    }

    const switchPage = async (num) => {
        console.log('Before update: ', currentPage);
        setCurrentPage( (prevCurrentPage) => {return prevCurrentPage + num} );
        console.log('After update: ', currentPage);
    }

    useEffect( () => {
        getPeople(currentPage);
    }, [currentPage]);

    return (
        <>
            <h1>List of people</h1>

            <Button variant="info" onClick={ () => { switchPage(-1) } } disabled={prevPage === null}>Previous</Button>
            <Button variant="info" onClick={ () => { switchPage(1) } } disabled={nextPage === null}>Next</Button>
        </>
    )
}

export default People