import * as React from "react";
import styles from './styles';
import api from '../api';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = { 
          token: '',
          users: []
        };
      }

    getUsers() {
        const token = window.localStorage.getItem('token');

        api.get('/users', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            const users = response.data;

            this.setState({ users });
        })
        .catch(() => {

        })
    }

    componentDidMount() {
        this.getUsers();
    }

    render() {
        const { users } = this.state;

        return (
            <div className='chat' style={styles.chat}>
                <header style={styles.chatHeader}>
                    <h2 className='title' style={styles.chatHeaderH2}>
                        <a href='#' style={styles.chatHeaderH2H}>ElegantThemes</a>
                    </h2>
                    <div style={styles.both}></div>
                </header>
                <div className='body' style={styles.chatBody}>
                    <div className='search' style={styles.chatBodySearch}>
                        <input placeholder='Search...' type='text' style={styles.chatBodySearchInput} />
                    </div>
                    <ul style={styles.chatBodyUl}>
                        {users.map(user => <li key={user.id} style={styles.chatBodyUlLi}>
                            <a className='thumbnail' href={'/message/'+user.id} style={styles.chatBodyUlLiThumbnail}>
                                {user.username[0]}{user.username[1]}
                            </a>
                            <div className='content' style={styles.chatBodyUlLiContent}>
                                <h3 style={styles.chatBodyUlLiContentH3}>{user.username}</h3>
                            </div>
                        </li>)}
                   
                    </ul>
                </div>
                <footer>
                    <a style={styles.chatFooterA} href='#'>View All Messages</a>
                </footer>
            </div>
        )
    }
}