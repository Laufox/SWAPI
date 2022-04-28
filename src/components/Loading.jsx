/**
 * 
 *  Component for rendering loading elements
 * 
 */

const Loading = ({resource}) => {
    return (
        <div className="loading-container">
            <p>Loading {resource} ...</p>
            <p>Please have patience</p>
        </div>
    )
}

export default Loading;