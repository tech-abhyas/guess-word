import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { authService } from '../../service/authService'


function UserScore() {
    const params = useParams()
    const navigate = useNavigate()
    const [userScore, setUserScore] = useState(0)

    const closeHandler = () => {
        navigate("/")
        localStorage.clear()
    }

    useEffect(() => {
        authService.userScore(params.userid).then(resp => {
            if (resp.data.success) {
                setUserScore(resp.data.user)
            } else {
                alert("something went wrong")
            }
        }
        ).catch(err => alert("something went wrong"))
    }, [params.userid])

    return (
        <div className='text-center'>
            <h3>User Score</h3>
            <h3>Round : {userScore.round} </h3>
            <h3>Score : {userScore.score}</h3>

            <button onClick={closeHandler}>Go to main page</button>
        </div>
    )
}

export default UserScore