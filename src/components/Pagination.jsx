// Import from react-bootstrap
import Button from 'react-bootstrap/Button';

/**
 * 
 *  Component for rendering pagination elements
 * 
 */

const Pagination = ({paging, onSwitch}) => {

    // Array to hold a number element for each pagination page
    const pages = [];

    // Push elements to page array as many times as the numberOfPages property in paging argument
    for (let i = 1; i <= paging.numberOfPages; i++) {
        pages.push(i);
    }

    return (
        <div className='pagination-container'>
            <Button variant="success" disabled={!paging.prevPage} onClick={ () => {
                onSwitch(-1)
            } } >Previous</Button>

            <div className='pages-list-container'>
                {
                    // Print out list of available pages
                    pages.map( (page, index) => {
                        return <span 
                            key={index} 
                            onClick={ () => { onSwitch( (index + 1 - paging.currentPage) ) } } 
                            className={page === paging.currentPage ? 'pages-list-item current' : 'pages-list-item'}
                        >
                            {page.toString().padStart(2, '0')}
                        </span>
                    } )
                }
            </div>

            <Button variant="success" disabled={!paging.nextPage} onClick={ () => {
                onSwitch(1)
            } } >Next</Button>
        </div>
    )
}

export default Pagination