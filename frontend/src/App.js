import React, {useState} from 'react';
import './App.css';
import Header from "./components/Header";
import {Route, Routes} from "react-router-dom";
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import MyFlights from "./pages/myFlights";
import Dashboard from "./pages/Dashboard";
import Account from "./pages/Account";
import CityPage from "./pages/CityPage";

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
            <Route path="/" element={<Home />} />
            <Route path="/my-flights" element={<MyFlights />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/my-account" element={<Account />} />
            <Route path="/city/:cityName" element={<CityPage />} />



          </Routes>

        </main>

        </React.Fragment>
    );
}

export default App;
