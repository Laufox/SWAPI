import axios from 'axios'

const BASE_URL = 'https://swapi.dev/api'

const getAllPeople = async () => {
    const data = await axios.get(`${BASE_URL}/people`)
    return data;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
	getAllPeople,

}