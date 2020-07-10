import React from 'react'
import Navigation from './Navigation'
import {Link} from 'react-router-dom'

function Header(){
    return (
        <header className="border-b p-3 flex justify-between items-center">
		  <h1 className="font-bold">Route Config</h1>
            <Navigation />
        </header>
    )
}

export default Header
