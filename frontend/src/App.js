import React, {useState} from 'react';
import './App.css';
import Header from "./components/Header";
import {Route, Routes} from "react-router-dom";
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import {useSelector} from "react-redux";
import {fetchUserData} from "./api/authenticationService";

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };




    return (
        <React.Fragment>
      <header>
        <Header isLoggedIn={isLoggedIn}/>
      </header>

        <main>
          <Routes>
            <Route path="/login" element={<Login handleLoginSuccess={handleLoginSuccess} />} />
            <Route path="/signup" handleLoginSuccess={handleLoginSuccess} element={<Signup />} />
            <Route path="/user" element={<Home />} />
          </Routes>

        </main>

        </React.Fragment>
    );
}

export default App;
