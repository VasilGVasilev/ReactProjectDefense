import './style.scss'

import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Logout from './components/Logout/Logout';

import CreateMatch from './components/CreateMatch/CreateMatch';
import Catalog from './components/Catalog/Catalog';
import MatchDetails from './components/MatchDetails/MatchDetails';

import * as matchService from './services/matchServices'

import { AuthContext } from './contexts/AuthContext'
import { MatchContext } from './contexts/MatchContext'

import { Routes, Route, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';


function App() {
    const navigate = useNavigate();

    const [matches, setMatches] = useState([]);
    const [auth, setAuth] = useLocalStorage('auth', {}); // 'auth' is a hardcoded key



    useEffect(() => {
        matchService.getAll()
            .then(result => {
                setMatches(result)
            })
    }, [])

    // encapsulating the setting of auth state functionality and then passing it on via Context API is good practice

    // AUTH
    // we use returned from login fetch data to set it in localStorage and component state
    const userLogin = (authData) => {
        setAuth(authData)
    }

    // we use remove data from localStorage and component state
    const userLogout = () => {
        setAuth({})
    }

    // CRUD on matches
    const matchAdd = (matchData) => {
        setMatches(state => [
            ...state,
            matchData
        ]);

        navigate('/catalog')
    };

    const voteAdd = (matchData) => {
        setMatches(state => {
            // you cannot just state: ...state, matchData
            // it will add instead of update the version
            // thus, we use rest operator to fill state with all matches BUT for the updated via filtering it out
            // the, we add the updated to the state
            return [
                ...state.filter(x => x._id !== matchData._id),
                matchData
            ]
        })
    }


    return (
        // user:auth for custom visualisation, userLogin and userLogout -> to enable real-time authentication
        <AuthContext.Provider value={{ user: auth, userLogin, userLogout }}>
            <div className="box">
                <Header></Header>
                
                <MatchContext.Provider value={{ matches, matchAdd, voteAdd }}>
                    <main className='main-content'>
                        <Routes>
                            <Route path='/' element={<Home />}></Route>
                            <Route path='/login' element={<Login />}></Route>
                            <Route path='/register' element={<Register />}></Route>
                            <Route path='/logout' element={<Logout />}></Route>
                            <Route path='/create' element={<CreateMatch />}></Route>
                            <Route path='/catalog' element={<Catalog matches={matches} />}></Route>
                            <Route path='/catalog/:matchId' element={<MatchDetails />}></Route>

                        </Routes>
                    </main>
                </MatchContext.Provider>
            </div>
        </AuthContext.Provider>
    );
}

export default App;
