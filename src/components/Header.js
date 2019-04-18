import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export const Header = (props) => {
    return (
      <nav className="navbar navbar-default">
        <div className="container">
            <ul className="nav navbar-header">
                <li><Link to={"/"}>Chat</Link></li>
                <li><Link to={"/login"}>Admin Login</Link></li>
            </ul>
        </div>
      </nav>
    )
}
