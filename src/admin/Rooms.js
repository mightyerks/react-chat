import React, { Component } from 'react'


export default class Rooms extends Component {

  constructor(props){
    super(props);
    this.state = {
      room: '',
      createdDate: Date.now(),
      editDate: Date.now(),
      status: '',
      
    }
  }

  render() {
    return (
      <div>
        Rooms are found here
        <button>Add Rooms</button>
        {/* 
            [Add new room button]
            Id
            Room#
            Created Date
            Edit Date
            Status
            [Edit button]
                -- room name
                -- status
                [save button]
        */}
      </div>
    )
  }
}
