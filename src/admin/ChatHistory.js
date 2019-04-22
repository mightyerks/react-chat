import React, { Component } from 'react'
import axios from 'axios';

const API = 'http://localhost:4000/api/history/';

export default class ChatHistory extends Component {

  constructor(props) {
    super(props);

    this.state = {
      hist: [],
    };
  }

  componentDidMount() {
    // when component mounted, start a GET request
    // to specified URL
    axios
      .get(API)
      // when we get a response map the body to json
      .then(({data}) => {
        this.setState({
          hist: data
        });
      })
      .catch((err) => {})
  }
//   render() {
//     const child = this.state.hist.map((el, index) => {
//       return <div key={index}>
//         <p>Title - { el.name }</p>
//         <p>Author - { el.room }</p>
//         <p>Title - { el.id }</p>
//         <p>Author - { el.message }</p>
//         <p>Author - { el.timestamp }</p>
//       </div>
//     });

//     return <div>
//       {/* <p>{ this.state.message }</p> */}
//       <div>{ child }</div>
//     </div>;
//   }
// }

  render() {
    return (
      <div>
        Chat History is here
        <table>
          <tr>
            <th>Name</th>
            <th>Room</th>
            <th>ID</th>
            <th>MESSAGE</th>
            <th>TIMESTAMP</th>
          </tr>
        {
          this.state.hist.map((history, i)=>{
            return <div key={i}>
            <tr>
              <td>{history.name}</td>
              <td>{history.room}</td>
              <td>{history.id}</td>
              <td>{history.message}</td>
              <td>{history.timestamp}</td>
            </tr>
            </div>
          })
        }
        </table>
      </div>
    )
  }
}
