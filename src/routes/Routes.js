import React from 'react'
import { BrowserRouter, Route, Switch, Redirect, Link } from 'react-router-dom'

import Chat from '../Chat'
import Login from './Login'
import Home from './Home'
import Private from './Private'

const loggedIn = false;

export default () => (
    <BrowserRouter>
        <nav className="navbar navbar-default">
        <div className="container">
            <ul className="nav navbar-header">
                <li><Link to={"/"}>Chat</Link></li>
                <li><Link to={"/admin"}>{loggedIn ? "Logout" : "Admin Login"}</Link></li>
            </ul>
        </div>
      </nav>
        <Switch>
            <Route path="/" exact component={ Chat } />
            <Route path="/login" exact component={ Login } />
            <Route path="/home" component={ Home } />
            <Route path="logout" component = {Chat}/>
            <Route path="/admin" 
                exact render = {() =>
                    loggedIn ? (<Private/>) : 
                    (<Redirect to={{pathname: '/login'}}/>)
                } 
            />
        </Switch>
    </BrowserRouter>
)