import * as React from "react";
import { Routes, Route, useNavigate, useLocation, Navigate } from "react-router-dom";
import Login from './login';
import Signin from './signin';

const PAGE_HOME = '/';
const PAGE_LOGIN = '/login';

const CheckToken = props => {
  // const { token } = props;
  const token = window.localStorage.getItem('token');
  if(location.pathname == PAGE_HOME && !token) {
    return <Navigate to="/login" />;
  }
  if(location.pathname == PAGE_LOGIN && token) {
    return <Navigate to="/" />;
  }

  return <></>;
}

const WrappApp = () => {
  const history = useNavigate()
  const location = useLocation()

  return <App history={history} location={location} />
}

class App extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = { 
      token: null,
    };
  }

  componentDidMount() {
    const token = window.localStorage.getItem('token');
    if(token) {
      this.setState({ token });
    }
  }
 
  render() {
    const { token } = this.state;
    const { history, location } = this.props;

    return (
      <>
        <Routes>
          <Route path="/" element={<div>Home</div>} /> 
          <Route path="/login" element={<Login />} /> 
          <Route path="/signin" element={<Signin />} /> 
        </Routes>
        <CheckToken token={token} history={history} location={location} />
      </>
    );
  }
}

export default WrappApp;