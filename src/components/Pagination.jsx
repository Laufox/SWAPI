import Button from 'react-bootstrap/Button'

const Pagination = ({paging, onSwitch}) => {


    return (
        <div>
            <Button variant="info" disabled={!paging.prevPage} onClick={ () => {
                onSwitch(-1)
            } } >Previous</Button>
            <Button variant="info" disabled={!paging.nextPage} onClick={ () => {
                onSwitch(1)
            } } >Next</Button>
        </div>
    )
}

export default Pagination