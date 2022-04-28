/**
 * 
 *  Component for rendering error elements
 * 
 */

const ErrorEl = ({resource}) => {
    return (
        <div className="loading-container">
            <p>There was an error loading {resource}</p>
            <p>Try to reload the page</p>
        </div>
    )
}

export default ErrorEl