import Button from 'react-bootstrap/Button'

const Pagination = ({paging, onSwitch}) => {

    const pages = [];

    const calcPages = () => {
        const nrOfIterations = Math.ceil( paging.numberOfPages / 10 );

        for (let i = 1; i <= nrOfIterations; i++) {
            pages.push(i);
        }
    }
    calcPages();

    return (
        <div className='pagination-container'>
            <Button variant="success" disabled={!paging.prevPage} onClick={ () => {
                onSwitch(-1)
            } } >Previous</Button>

            <div className='pages-list-container'>
                {
                    pages.map( (page, index) => {
                        return <span key={index} className={page === paging.currentPage ? 'pages-list-item current' : 'pages-list-item'}>{page.toString().padStart(2, '0')}</span>
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