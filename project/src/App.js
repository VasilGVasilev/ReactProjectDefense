import './style.scss'

import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Logout from './components/Logout/Logout';

import CreateMatch from './components/CreateMatch/CreateMatch';
import Catalog from './components/Catalog/Catalog';
import MatchDetails from './components/MatchDetails/MatchDetails';

import * as gameService from './services/gameServices'

import { AuthContext } from './contexts/AuthContext'


import { Routes, Route, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';


function App() {
    const [games, setGames] = useState([]);

    const [auth, setAuth] = useLocalStorage('auth', {}); // 'auth' is a hardcoded key


    useEffect(() => {
        gameService.getAll()
            .then(result => {
                setGames(result)
            })
    }, [])

    // encapsulating the setting of auth state functionality and then passing it on via Context API is good practice

    // we use returned from login fetch data to set it in localStorage and component state
    const userLogin = (authData) => {
        setAuth(authData)
    }

    // we use remove data from localStorage and component state
    const userLogout = () => {
        setAuth({})
    }

    return (
        // user:auth for custom visualisation, userLogin and userLogout -> to enable real-time authentication
        <AuthContext.Provider value={{ user: auth, userLogin, userLogout }}>
            <div className="box">
                <Header></Header>
                <main className='main-content'>
                    <Routes>
                        <Route path='/' element={<Home />}></Route>
                        <Route path='/login' element={<Login />}></Route>
                        <Route path='/register' element={<Register />}></Route>
                        <Route path='/logout' element={<Logout />}></Route>
                        <Route path='/create' element={<CreateMatch />}></Route>
                        <Route path='/catalog' element={<Catalog games={games} />}></Route>
                        <Route path='/catalog/:matchId' element={<MatchDetails />}></Route>

                    </Routes>
                </main>
            </div>
        </AuthContext.Provider>
    );
}

export default App;
