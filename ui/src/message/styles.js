import styles from '../home/styles';

const bubble = {
    display: 'inline-block',
    marginBottom: '5px',
    color: '#F9FBFF',
    fontSize: '1em',
    padding: '10px 10px 10px 12px',
    borderRadius: '20px',
}

const chatBody = {
    ...styles.chatBody,
    padding: 10
}

const Ibubble = {
    ...bubble,
    background: '#b2b2b2'
}

const Obubble = {
    ...bubble,
    background: '#79C7C5'
}

const wrap = {
    display: 'flex',
    justifyContent: 'space-between',
    padding: 10
}

const incoming = {
    float: 'left'
}

const outgoing = {
    float: 'right'
}

const message = {
    width: 'calc(100% - 30px)',
    margin: 0,
    padding: '10px 15px',
    border: 'none',
    boxSize: 'border-box',
    outline: 'none'
}

const footer = {
    position: 'relative'
}

const button = {
    position: 'absolute',
    top: '50%',
    right: 10,
    transform: 'translate(0, -50%)'
}

export default {
    ...styles,
    Ibubble,
    Obubble,
    wrap,
    incoming,
    outgoing,
    chatBody,
    message,
    footer,
    button,
}