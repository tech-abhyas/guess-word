import axios from "axios";
import { API_URL } from "../config";



const register = async (data) => {
    return await axios.post(API_URL.register, data)
}

const updateScore = async (data) => {
    return await axios.put(API_URL.updateScore, data)
}
const userScore = async (id) => {
    return await axios.get(`${API_URL.userScore}${id}`)
}
const leaderBoard = async () => {
    return await axios.get(`${API_URL.leaderBoard}`)
}


export const authService = {
    register,
    updateScore,
    userScore,
    leaderBoard
}
