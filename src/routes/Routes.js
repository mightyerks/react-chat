import React from 'react'
import { BrowserRouter, Route, Switch, Redirect, Link } from 'react-router-dom'

import Chat from '../components/Chat'
import Login from '../admin/Login'
import AdminRoute from '../admin/AdminRoute'

const loggedIn = true; 
// if it is set to false, admin will always redirect to login page


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
            <Route path="logout" component = {Chat}/>
            <Route path="/admin" 
                exact render = {() =>
                    loggedIn ? (<AdminRoute/>) : 
                    (<Redirect to={{pathname: '/login'}}/>)
                } 
            />
        </Switch>
    </BrowserRouter>
)