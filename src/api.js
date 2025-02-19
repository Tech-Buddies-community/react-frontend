import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL
const customAPI = axios.create({
    baseURL: `${API_URL}/api/v1`,
    headers: {
        'Content-Type': 'application/json',
    }
});

export default customAPI;