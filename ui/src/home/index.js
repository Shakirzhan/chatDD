import * as React from "react";

import api from '../api';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = { 
          token: ''
        };
      }

    componentWillMount() {
        const token = window.localStorage.getItem('token');
        if (token) {
            this.setState({ token })
        }
    }

    send() {
        const token = window.localStorage.getItem('token');

        api.get('/users', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(() => {
        })
        .catch(() => {
        })
    }

    render() {

        return <div>
            Home
            <button onClick={this.send}>list</button>
        </div>
    }
}