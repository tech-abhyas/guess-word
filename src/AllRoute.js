import React from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom';

import ScreenOne from './pages/dasbhoard/ScreenOne';
import GameScreen from './pages/dasbhoard/GameScreen';
import UserScore from './pages/dasbhoard/UserScore';


function AllRoute() {


    return (
        <>
            <Routes>
                <Route path="/" exact element={<ScreenOne />} />
            </Routes>
            <Routes>
                <Route path="/play-game/" exact element={<GameScreen />} />
            </Routes>
            <Routes>
                <Route path="/score/:userid" exact element={<UserScore />} />
            </Routes>

        </>
    )
}

export default AllRoute