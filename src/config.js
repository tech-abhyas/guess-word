let api_base_url = "http://localhost:5000/api/v1"

export const API_URL = {
    // user api
    register: `${api_base_url}/user/register`,
    updateScore: `${api_base_url}/user/update-score/`,
    userScore: `${api_base_url}/user/user-score/`,
    leaderBoard: `${api_base_url}/user/leaderBoard`,

    // round api
    fetchRound: `${api_base_url}/round/fetch`,
    totalRound: `${api_base_url}/round/total-round`,

}

