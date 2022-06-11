import * as React from "react";
import SendIcon from '@mui/icons-material/Send';
import IconButton from '@mui/material/IconButton';
import { useParams } from "react-router-dom";
import styles from './styles';

import api from '../api';

const WrappMessage = () => {
    const params = useParams()
  
    return <Message params={params} />
  }

class Message extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            message: '',
            messages: []
        }
    }

    componentDidMount() {
        const { user_id: get_user_id } = this.props.params;

        api.get('/messages/'+get_user_id)
        .then(response => {
            const messages = response.data
            this.setState({ messages })
        })
        .catch(() => {
         
        })
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSend(e) {
        e.preventDefault();

        const { user_id: get_user_id } = this.props.params;
        const message = this.state.message;

        api.post('/send', { get_user_id, message })
        .then(() => {
            this.setState({ message: '' })
        })
        .catch(() => {
         
        })
    }

    render() {
        const { user_id: get_user_id } = this.props.params;

        const { messages, message } = this.state

        return (
            <div className='chat' style={styles.chat}>
                <header style={styles.chatHeader}>
                    <h2 className='title' style={styles.chatHeaderH2}>
                        <a href='#' style={styles.chatHeaderH2H}>Имя</a>
                    </h2>
                    <div style={styles.both}></div>
                </header>
                <div className='body' style={styles.chatBody}>
                    {messages.map(message => <div className="wrap" key={message.id}>
                        {message.send_user_id == get_user_id && <>
                            <div className="incoming" style={styles.incoming}>
                                <div className="bubble" style={styles.Ibubble}>{message.message}</div>
                            </div>
                            <div style={styles.both}></div>
                        </>}
                         
                         {message.send_user_id != get_user_id && <>
                            <div className="outgoing" style={styles.outgoing}>
                                <div className="bubble" style={styles.Obubble}>{message.message}</div>
                            </div>
                            <div style={styles.both}></div>
                         </>}
                        
                     </div>)}
                   

                </div>
                <div style={styles.footer}>
                    <form onSubmit={e => this.onSend(e)}>
                    <input 
                        type='text' 
                        style={styles.message}  
                        name="message" 
                        onChange={e => this.onChange(e)} 
                        value={message}
                        placeholder="Сообщение..." 
                    />
                    
                    <IconButton onClick={e => this.onSend(e)} button="submit" style={styles.button} size="small">
                        <SendIcon fontSize="inherit" />
                    </IconButton>
                    </form>
                </div>
                
            </div>
        )
    }
}

export default WrappMessage;