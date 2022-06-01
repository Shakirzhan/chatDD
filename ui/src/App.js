import * as React from "react";
import { Routes, Route } from "react-router-dom";
import SignInSide from './signin';

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<SignInSide />} /> 
      </Routes>
    </div>
  );
}