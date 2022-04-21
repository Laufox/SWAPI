import axios from 'axios'

const BASE_URL = 'https://swapi.dev/api'

const getAllPeople = async (page = 1) => {
    const data = await axios.get(`${BASE_URL}/people/?page=${page}`)
    return data;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
	getAllPeople,

}