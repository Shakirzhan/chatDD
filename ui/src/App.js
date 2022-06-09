import * as React from "react";
import { Routes, Route } from "react-router-dom";
import SignInSide from './signin';
import Home from './home';

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/login" element={<SignInSide />} /> 
      </Routes>
    </div>
  );
}