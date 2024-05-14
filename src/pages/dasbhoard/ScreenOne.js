import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { userRegister } from '../../slice/authSlice'
import { useNavigate } from 'react-router-dom'
import { authService } from '../../service/authService'

function StepOne() {

    const [userDetail, setUserDetail] = useState({ username: "", round: "" })
    const [leadboard, setLeadboard] = useState([])
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const submitHandler = (e) => {
        e.preventDefault()


        // basic validation
        if (userDetail.username === "") {
            alert("Please provide the username")
        } else if (userDetail.selectedRound === "") {
            alert("Please select the round")
        } else {
            dispatch(userRegister(userDetail)).then(resp => {
                if (resp.payload.success) {
                    navigate("/play-game")
                } else {
                    alert(resp.payload)
                }

            }).catch(err => console.log(err))
        }
    }


    useEffect(() => {
        authService.leaderBoard().then(resp => {
            if (resp.data.success) {
                setLeadboard(resp.data.score)
            } else {
                alert("something went wrong")
            }
        })
    }, [])

    console.log(leadboard)

    return (
        <div className="row">
            <div className="col-lg-6 col-sm-12 col-md-12">

                <h3>Scoring and Leaderboard</h3>
                <ul className='list-group'>
                    {leadboard.map((item, i) => (
                        <li key={i} className='list-group-item'>
                            <p>Score: {item.score}</p>
                            <p>username: {item.username}</p>
                            <p>round: {item.round}</p>
                        </li>
                    )
                    )}

                </ul>

            </div>
            <div className="col-lg-6 col-sm-12 col-md-12 px-5">
                <h5>Welcome</h5>
                <form onSubmit={(e) => submitHandler(e)}>
                    <div className="form-group my-3">
                        <label>Username</label>
                        <input type="text" name="username" className="form-control" placeholder="Enter the username" value={userDetail.username} onChange={(e) => setUserDetail(prev => ({ ...prev, username: e.target.value }))} />
                    </div>
                    <div className="form-group my-3">
                        <label>Round</label>
                        <select className="form-select" name="selectedRound" onChange={(e) => setUserDetail(prev => ({ ...prev, round: e.target.value }))}>
                            <option value="">Select</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                        </select>
                    </div>
                    <div className="form-group my-3">
                        <button className="btn btn-primary btn-sm" type='submit'>Start Game</button>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default StepOne