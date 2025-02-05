import React, { useContext, useEffect, useState } from 'react';
// import logo from './logo.svg';
import './App.css';
// import { Outlet, Routes } from 'react-router';
import { AuthProvider, AuthContext } from './context/AuthContext';
import Home from './page/Home';
import { LoginProvider } from './context/LoginContext';
import { PopupProvider } from "./context/PopupContext";

function App() {

  return (
    <>
      <PopupProvider>
        <LoginProvider>
          <AuthProvider>
            <Home />
          </AuthProvider>
        </LoginProvider>
      </PopupProvider>
    </>
  );
}

export default App;
