import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import WrapForm from '../components/WrapForm';
import Copyright from '../components/Copyright';
import api from '../api';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      username: '',
      password: '',
      email: '',
      usernameError: false,
      passwordError: false,  
      emailError: false
    };
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit(e) {
    e.preventDefault();
    const { username, password, email } = this.state;
    const history = this.props.history;
    this.setState({ usernameError: !username });
    this.setState({ passwordError: !password });
    this.setState({ emailError: !email });

    if(!username || !password || !email) {
      return;
    }

    api.post('/signup', { username, password, email })
    .then(response => {
      localStorage.setItem('token', response.data.token);
      history('/', { replace: true })
    })
    .catch(() => {})
  }

  render() {
    const { username, password, email, passwordError, usernameError, emailError } = this.state;

    return (
      <WrapForm title="Регистрация" onSubmit={(e) => this.onSubmit(e)}>
        <TextField
          margin="normal"
          required
          autoFocus
          fullWidth
          name="email"
          value={email}
          error={emailError}
          helperText={emailError && "Поле Описание обязательное для заполнения!"}
          onChange={e => this.onChange(e)}
          label="Email"
          type="text"
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Логин"
          name="username"
          value={username}
          error={usernameError}
          helperText={usernameError && "Поле Описание обязательное для заполнения!"}
          onChange={e => this.onChange(e)}
          autoComplete="off"
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          value={password}
          error={passwordError}
          helperText={passwordError && "Поле Описание обязательное для заполнения!"}
          onChange={e => this.onChange(e)}
          label="Пароль"
          type="password"
          autoComplete="current-password"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Зарегистрироваться
        </Button>
        <Grid container>
          <Grid item xs>
          </Grid>
          <Grid item>
            <Link href="/login" variant="body2">
              Вход
            </Link>
          </Grid>
        </Grid>
        <Copyright sx={{ mt: 5 }} />
      </WrapForm>
    );
  }
}

export default Signup;
