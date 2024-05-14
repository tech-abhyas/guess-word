import axios from "axios";
import { API_URL } from "../config";


const getAvailableRound = async () => {
    return await axios.get(API_URL.totalRound)
}

const fetchRound = async (data) => {
    return await axios.get(`${API_URL.fetchRound}/${data}`)
}


export const roundService = {
    getAvailableRound,
    fetchRound
}