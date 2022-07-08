import * as React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const WrappHistory = ({ Component = () => {} }) => {
    const history = useNavigate();
    const location = useLocation();
  
    return <Component history={history} location={location} />
}

export default WrappHistory;