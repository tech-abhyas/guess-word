import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchRound, gameScoreTrack, updateScore } from '../../slice/authSlice'
import { useNavigate } from 'react-router-dom'


function RoundComponent() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { roundData, user, userScore } = useSelector(state => state.authReducer)
    const [guessWord, setGuessWord] = useState({})

    const [allRoundComplete, setAllRoundComplete] = useState(false)
    const [currentRound, setCurrentRound] = useState(1)
    const [tiralComplete, setTrialComplete] = useState({})


    useEffect(() => {
        dispatch(fetchRound(currentRound))
        setTrialComplete({})
        setGuessWord({})
    }, [currentRound])


    // input change handler
    const changeHandler = (e, guessWord, round) => {
        setGuessWord(
            (prev) => ({
                ...prev,
                [round]:
                    e.nativeEvent.inputType === 'deleteContentBackward' ?
                        (prev[round] || '').slice(0, -1) :
                        (prev[round] || '') + e.target.value
            })
        )
    }


    // track the trial round
    useEffect(() => {
        if (Object.keys(guessWord).length === 3) {
            Object.keys(guessWord).forEach(key => {
                if (roundData[key].answer?.toLowerCase() === guessWord[key]?.toLowerCase()) {
                    setTrialComplete(prev => ({ ...prev, [key]: 1 }))
                } else {
                    setTrialComplete(prev => ({ ...prev, [key]: 0 }))
                }

            })
        }
    }, [guessWord])


    // for the reducer
    function add(accumulator, a) {
        return accumulator + a;
    }


    // round submit and score track
    const submitRound = () => {
        // filter the answer with the correct one
        const currentScore = {}
        Object.keys(roundData).forEach(key => {
            if (roundData[key].answer?.toLowerCase() === guessWord[key]?.toLowerCase()) {
                currentScore[`round_${currentRound}`] = (currentScore[`round_${currentRound}`] || 0) + 1
            }
        })

        console.log("currentRound", currentRound)
        console.log("parseInt(user.round)", parseInt(user.round))
        dispatch(gameScoreTrack(currentScore))
        if (currentRound < parseInt(user.round)) {
            setCurrentRound(prev => prev + 1)
            setAllRoundComplete(false)
        } else {
            setAllRoundComplete(true)
        }
    }


    // final submit
    const completeGame = () => {
        let totalScore = 0
        userScore.map(item => {
            totalScore = totalScore + parseInt(Object.values(item))
        })


        const postData = {
            user: user._id,
            score: totalScore
        }
        dispatch(updateScore(postData)).then(resp => {
            if (resp.payload.success) {

                navigate(`/score/${user._id}`)
            } else {
                alert("Something went wrong")
            }

            // 
        }).catch(err => alert("Something went wrong"))
    }



    return (
        <div className="row">

            <div className="col-lg-12 p-2 m-2">
                <h5>Round : {currentRound}</h5>
            </div>
            <div className="col-lg-12">
                <ul className="list-group">
                    {Object.keys(roundData).map((item, i) => (
                        (i === 3 || i === 4) ?
                            (
                                Object.values(tiralComplete).reduce(add, 0) === 3 &&

                                <li className="list-group-item" key={item._id}>
                                    <div className="hint">
                                        <h6>{i + 1}. {roundData[item].hint} </h6>
                                    </div>
                                    <div className="d-flex">
                                        <div className="row d-flex">
                                            {roundData[item].answer?.split("").map((char, ic) => (
                                                <div className="col-xs-2 col-lg-2 col-md-2 col-sm-1 p-0 m-1" key={`${char}+${ic}`}>
                                                    <input className="form-control" type="text" maxlength="1"
                                                        onChange={(e) => { changeHandler(e, roundData, item) }}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </li>)
                            :
                            <li className="list-group-item" key={item._id}>
                                <div className="hint">
                                    <h6> {i + 1} - {roundData[item].hint} </h6>
                                </div>
                                <div className="d-flex">
                                    <div className="row d-flex">
                                        {roundData[item].answer?.split("").map((char, ic) => (
                                            <div className="col-xs-2 col-lg-2 col-md-2 col-sm-1 p-0 m-1" key={`${char}+${ic}`}>
                                                <input className="form-control" type="text" maxlength="1"
                                                    onChange={(e) => { changeHandler(e, roundData, item) }}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </li>
                    ))}
                </ul>
            </div>
            <div className="col-lg-12">
                {allRoundComplete ?
                    <button className="btn btn-sm btn-primary" onClick={() => completeGame()}>Save and View Score </button> :
                    <button className="btn btn-sm btn-primary" onClick={() => submitRound()}>Next Round </button>}

            </div>
        </div>
    )
}

export default RoundComponent