// Import axios package
import axios from 'axios'

// Set the URL query to begin all API requests
const BASE_URL = 'https://swapi.dev/api'

// Function that returns search result on a specific resource
const getSearch = async (resource, query, page) => {
    const data = await axios.get(`${BASE_URL}/${resource}/?search=${query}&page=${page}`);
    return data;
}

// Function that returns data of all items for a specific resource and page
const getResourceAll = async (resource, page = 1) => {
    const data = await axios.get(`${BASE_URL}/${resource}/?page=${page}`);
    return data;
}

// Function that returns data of a single item for a specific resource and id
const getResourceOne = async (resource, id) => {
    const data = await axios.get(`${BASE_URL}/${resource}/${id}`);
    return data;
}

// Export functions that can be used by other files
// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getSearch,
    getResourceAll,
    getResourceOne,
}