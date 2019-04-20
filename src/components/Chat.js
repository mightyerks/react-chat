import React from "react";
import io from "socket.io-client";


class Chat extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username: '',
            message: '',
            room: 'Main',
            rooms:[],
            messages: [],
            user:'',
            currentRoom:'',
            users:[]
        };


        this.socket = io('localhost:4000');

        this.socket.on('UPDATE_CHAT', (uname, msg, room)=>{
            var message = {author: uname, message:msg, room:room}
            addMessage(message);
        });

        this.socket.on('UPDATE_ROOMS', (rooms, currentRoom)=>{
            console.log(currentRoom)
            this.setState({rooms:rooms, currentRoom:currentRoom})
        })

        // chat box
        const addMessage = data => {
            console.log(data); // {author: "fffdsa", message: "fsa"}
            this.setState({messages: [...this.state.messages, data]});
            console.log(this.state.messages); 
            // 0: {author: "fdsa", message: "fdsa"}
            // 1: {author: "fdsa", message: "fdsfafdsa"}
        };

        // sending message
        this.sendMessage = e => {
            e.preventDefault();
            this.socket.emit('SEND_MESSAGE', {
                author: this.state.username,
                message: this.state.message,
                room: this.state.room
            })
            this.setState({message: ''});
        }

        // adding message
        this.connectUser = e => {
            e.preventDefault();
            this.socket.emit('USER_CONNECTED', {
                author: this.state.username
            })
            this.setState({author: ''});
        }

        this.handleRoomChange = e => {
            if (room === e.target.value){
                console.log('already in the room')
            }else{
                this.socket.emit('SWITCH_ROOM', e.target.value)
                this.setState({room:e.target.value})
            }
        }

        const {rooms, user, room, admin} = this.state

    }

    handleChange = function(e){
        this.setState({selectValue:e.target.value});
    }


    render(){
        // const { messages, room, username, message} = this.state
        return (
            <div className="container">
                <div className="row">
                    <div className="col-4">
                        <div className="card">
                            <div className="card-body">
                                <div className="card-title">Global Chat</div>
                                <div className="dropdown">
                                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Chat Rooms
                                    </button>
                                    <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
                                        <select defaultValue={this.state.selectValue} onChange={this.handleChange}>
                                            <option className="dropdown-item" value='Main Chat' onChange={ev => this.setState({room: ev.target.value})}>Main Chat</option>
                                            <option className="dropdown-item" value='Only Wizards' onChange={ev => this.setState({room: ev.target.value})}>Only Wizards</option>
                                            <option className="dropdown-item" value='Only Muggles' onChange={ev => this.setState({room: ev.target.value})}>Only Muggles</option>
                                        </select>
                                    </div>
                                </div>
                                <hr/>
                                <div className="messages">
                                    {this.state.messages.map((message, i) => {
                                        return (
                                            <div key={i}> {message.author}: {message.message}</div>
                                        )
                                    })}
                                </div>
                            </div>
                            <div className="card-footer">
                                <input type="text" placeholder="Username" value={this.state.username} onChange={ev => this.setState({username: ev.target.value})} className="form-control"/>
                                <br/>
                                <button 
                                id = "1"
                                disabled ={!this.state.username}
                                onClick={this.connectUser} className="btn btn-primary form-control">add</button>
                                <br/><br/>
                                <input type="text" placeholder="Message" className="form-control" value={this.state.message} onChange={ev => this.setState({message: ev.target.value})}/>
                                <br/>
                                <button 
                                disabled = {!this.state.username || !this.state.message} 
                                onClick={this.sendMessage} className="btn btn-primary form-control">Send</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Chat;