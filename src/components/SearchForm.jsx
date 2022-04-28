// Import use hooks from react
import { useEffect, useRef, useState } from 'react'
// Import bootstrap components
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'

/**
 * 
 *  Component for rendering search form
 * 
 */

const AddNewTodoForm = ({ onSearch, onShowAll }) => {
	
    // Usestates for searches
    const [searchInput, setSearchInput] = useState('');
    const searchInputRef = useRef();

	// When a form is submitted
    const handleSubmit = (e) => {

        // Prevent default form behaviour
        e.preventDefault();

        onSearch(searchInput);

    }

	// When a form is reset
	const handleReset = (e) => {

		// Prevent default form behaviour
		e.preventDefault();
		setSearchInput('');
		onShowAll();

	}

	// focus on input field when component is mounted
	useEffect(() => {

		searchInputRef.current.focus();

	}, []);

	return (
		<Form onSubmit={handleSubmit} onReset={handleReset} className="mb-4 mt-4">
			<Form.Group className="mb-3" controlId="searchQuery">
				<Form.Label className='display-6'>Search form:</Form.Label>
				<Form.Control
					onChange={e => setSearchInput(e.target.value)}
					placeholder="Enter name to search for"
					ref={searchInputRef}
					required
					type="text"
					value={searchInput}
				/>
			</Form.Group>

			<div className="d-flex justify-content-start gap-3">
				<Button variant="success" type="submit" disabled={!searchInput.length}>Search</Button>
				<Button variant="warning" type="reset" >Show all</Button>
			</div>
		</Form>
	)
}

export default AddNewTodoForm