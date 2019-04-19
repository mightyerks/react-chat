import React, { Component } from 'react'

import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'

// admin page
import EventHistory from '../admin/EventHistory'
import ChatHistory from '../admin/ChatHistory'
import Rooms from '../admin/Rooms'


export default class Private extends Component {
  render() {
    return (
      <BrowserRouter>
        <nav className="navbar navbar-default">
        <div className="container">
            <ul className="nav navbar-header">
                <li><Link to={"/event-history"}>Event History</Link></li>
                <li><Link to={"/chat-history"}>Chat History</Link></li>
                <li><Link to={"/rooms"}>Rooms</Link></li>
            </ul>
        </div>
      </nav>
        <Switch>
            <Route path="/event-history" exact component={ EventHistory } />
            <Route path="/chat-history" exact component={ ChatHistory } />
            <Route path="/rooms" component={ Rooms } />
        </Switch>
    </BrowserRouter>
    )
  }
}


