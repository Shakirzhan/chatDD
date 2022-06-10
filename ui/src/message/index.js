import * as React from "react";
import SendIcon from '@mui/icons-material/Send';
import IconButton from '@mui/material/IconButton';
import { useParams } from "react-router-dom";
import styles from './styles';

const WrappMessage = () => {
    const params = useParams()
  
    return <Message params={params} />
  }

class Message extends React.Component {
    constructor(props) {
        super(props);
      }

    render() {
        const params = this.props.params;

        console.log(params)

        return (
            <div className='chat' style={styles.chat}>
                <header style={styles.chatHeader}>
                    <h2 className='title' style={styles.chatHeaderH2}>
                        <a href='#' style={styles.chatHeaderH2H}>Имя</a>
                    </h2>
                    <div style={styles.both}></div>
                </header>
                <div className='body' style={styles.chatBody}>
           
                    <div className="wrap">
                        <div className="incoming" style={styles.incoming}>
                            <div className="bubble" style={styles.Ibubble}>1111</div>
                        </div>
                        <div style={styles.both}></div>
                        <div className="outgoing" style={styles.outgoing}>
                            <div className="bubble" style={styles.Obubble}>222</div>
                        </div>
                        <div style={styles.both}></div>
                    </div>

                </div>
                <div style={styles.footer}>
                    <input type='text' style={styles.message} placeholder="Сообщение..." />
                    
                    <IconButton style={styles.button} size="small">
                        <SendIcon fontSize="inherit" />
                    </IconButton>
                </div>
                
            </div>
        )
    }
}

export default WrappMessage;