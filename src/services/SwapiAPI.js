// Import axios package
import axios from 'axios'

// Set the URL query to begin all API requests
const BASE_URL = 'https://swapi.dev/api'

// Function that returns all characters on a specific page
const getAllPeople = async (page = 1) => {
    const data = await axios.get(`${BASE_URL}/people/?page=${page}`)
    return data;
}

// Function that returns all characters on a specific page
const getAllFilms = async (page = 1) => {
    const data = await axios.get(`${BASE_URL}/films/?page=${page}`)
    return data;
}

// Export function the be used by other files
// eslint-disable-next-line import/no-anonymous-default-export
export default {
	getAllPeople,
    getAllFilms,
}