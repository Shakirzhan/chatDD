import * as React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./home";
import Login from "./login";
import Signup from "./signup";
import WrappHistory from "./components/WrappHistory";

const PAGE_HOME = '/';
const PAGE_LOGIN = '/login';

const CheckToken = () => {
  // const { token } = props;
  const token = window.localStorage.getItem('token');

  if(location.pathname == PAGE_HOME && !token) {
    return <Navigate to="/login" />;
  } else if(location.pathname == PAGE_LOGIN && token) {
    return <Navigate to="/" />;
  }

  return <></>;
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
          <Route path="/" element={<Home />} /> 
          <Route path="/login" element={<WrappHistory Component={Login} />} /> 
          <Route path="/signup" element={<WrappHistory Component={Signup} />} /> 
        </Routes>
        <CheckToken token={token} history={history} location={location} />
      </>
    );
  }
}

export default App;