import axios from 'axios'

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const API_URL = `${BACKEND_URL}/api/entries`

// create entry
const makeEntry = async (formData) => {
    const response = await axios.post(API_URL, formData)
    return response.data
}

// find all entries
const getEntries = async () => {
    const response = await axios.get(API_URL)
    return response.data
}

const entryService = { makeEntry, getEntries }
export default entryService