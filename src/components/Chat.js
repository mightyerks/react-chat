import React from "react";
import io from "socket.io-client";


class Chat extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            username: '',
            message: '',
            messages: []
        };


        this.socket = io('localhost:4000');

        this.socket.on('RECEIVE_MESSAGE', function(data){
            addMessage(data);
        });

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
                message: this.state.message
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
    }

    render(){
        return (
            <div className="container">
                <div className="row">
                    <div className="col-4">
                        <div className="card">
                            <div className="card-body">
                                <div className="card-title">Global Chat</div>
                                <hr/>
                                <div className="messages">
                                    {this.state.messages.map(message => {
                                        return (
                                            <div>{message.author}: {message.message}</div>
                                        )
                                    })}
                                </div>
                            </div>
                            <div className="card-footer">
                                <input type="text" placeholder="Username" value={this.state.username} onChange={ev => this.setState({username: ev.target.value})} className="form-control"/>
                                <br/>
                                <input type="text" placeholder="Message" className="form-control" value={this.state.message} onChange={ev => this.setState({message: ev.target.value})}/>
                                <br/>
                                <button onClick={this.sendMessage} className="btn btn-primary form-control">Send</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Chat;