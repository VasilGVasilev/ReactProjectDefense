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

import { AuthProvider } from './contexts/AuthContext'
import { MatchContext } from './contexts/MatchContext'

import PrivateGuard from './components/PrivateGuard/PrivateGuard'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';
import EditMatch from './components/EditMatch/EditMatch';


function App() {
    const navigate = useNavigate();

    const [matches, setMatches] = useState([]);

    useEffect(() => {
        matchService.getAll()
            .then(result => {
                setMatches(result)
            })
    }, [])





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
            // alternative -> return [...state.map(x => x._id === matchData._id ? matchData : x)]
        })
    }

    const matchEdit = (matchData) => {
        setMatches(state => state.map(x => x._id === matchData._id ? matchData : x));
    }

    const matchDel = (matchId) => {
        setMatches(state => state.filter(x => x._id !== matchId));
    }


    return (
        // user:auth for custom visualisation, userLogin and userLogout -> to enable real-time authentication
        <AuthProvider>
            <div className="box">
                <Header></Header>
                
                <MatchContext.Provider value={{ matches, matchAdd, voteAdd, matchEdit, matchDel }}>
                    <main className='main-content'>
                        <Routes>
                            <Route path='/' element={<Home />}></Route>
                            <Route path='/login' element={<Login />}></Route>
                            <Route path='/register' element={<Register />}></Route>
                            <Route element={<PrivateGuard />}>
                                <Route path='/logout' element={<Logout />}></Route>
                                <Route path='/create' element={<CreateMatch />}></Route>
                                <Route path='/matches/:matchId/edit' element={<EditMatch />}></Route>
                            </Route>
                            <Route path='/catalog' element={<Catalog matches={matches} />}></Route>
                            <Route path='/catalog/:matchId' element={<MatchDetails />}></Route>


                        </Routes>
                    </main>
                </MatchContext.Provider>
            </div>
        </AuthProvider>
    );
}

export default App;
