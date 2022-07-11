import * as React from 'react';
import { connect } from 'react-redux';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import WrapForm from '../components/WrapForm';
import Copyright from '../components/Copyright';
import { addToken } from '../redux/actions';
import api from '../api';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      username: '',
      password: '',
      usernameError: false,
      passwordError: false,  
    };
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit(e) {
    e.preventDefault();
    const { username, password } = this.state;
    const { setToken } = this.props;
    const history = this.props.history;
    this.setState({ usernameError: !username });
    this.setState({ passwordError: !password });

    if(!username || !password) {
      return;
    }

    api.post('/login', { username, password })
    .then(response => {
      const token = response.data.token;
      localStorage.setItem('token', token);
      setToken(token);
      history('/', { replace: true })
    })
    .catch(() => {})
  }

  render() {
    const { username, password, usernameError, passwordError } = this.state;

    return (
      <WrapForm title="Вход" onSubmit={(e) => this.onSubmit(e)}>
        <TextField
          margin="normal"
          required
          fullWidth
          label="Логин"
          name="username"
          value={username}
          onChange={e => this.onChange(e)}
          autoFocus
          error={usernameError}
          helperText={usernameError && "Поле Описание обязательное для заполнения!"}
          autoComplete="off"
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          value={password}
          onChange={e => this.onChange(e)}
          label="Пароль"
          type="password"
          error={passwordError}
          helperText={passwordError && "Поле Описание обязательное для заполнения!"}
          autoComplete="current-password"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Войти
        </Button>
        <Grid container>
          <Grid item xs>
          </Grid>
          <Grid item>
            <Link href="/signup" variant="body2">
              Регистрация
            </Link>
          </Grid>
        </Grid>
        <Copyright sx={{ mt: 5 }} />
      </WrapForm>
    );
  }
}

const mapStateToProps = () => ({
  
})

const mapDispatchToProps = (dispatch) => ({
  setToken: (token) => dispatch(addToken(token))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
