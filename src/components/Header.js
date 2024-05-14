import React from 'react'
import { Link } from 'react-router-dom'

function Header() {


    return (
        <header className="mb-4">
            <div className='d-flex justify-content-between'>
                <Link to="/"><h3 className="float-md-start mb-0">Guess-a-Word</h3></Link>
            </div>
        </header>

    )
}

export default Header