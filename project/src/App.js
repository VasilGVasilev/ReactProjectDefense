import './style.scss'

import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Logout from './components/Logout/Logout';

import CreateMatch from './components/CreateMatch/CreateMatch';
import Catalog from './components/Catalog/Catalog';
import MatchDetails from './components/MatchDetails/MatchDetails';


import { MatchProvider } from './contexts/MatchContext'
import { AuthProvider } from './contexts/AuthContext'

import PrivateGuard from './components/PrivateGuard/PrivateGuard'
import { Routes, Route } from 'react-router-dom'
import EditMatch from './components/EditMatch/EditMatch';


function App() {
    return (
        <AuthProvider>
            <div className="box">
                <Header />
                <MatchProvider>
                    <main className='main-content'>
                        <Routes>
                            <Route path='/' element={<Home />} />
                            <Route path='/login' element={<Login />} />
                            <Route path='/register' element={<Register />} />
                            <Route element={<PrivateGuard />}>
                                <Route path='/logout' element={<Logout />} />
                                <Route path='/create' element={<CreateMatch />} />
                                <Route path='/matches/:matchId/edit' element={<EditMatch />} />
                            </Route>
                            <Route path='/catalog' element={<Catalog />} />
                            <Route path='/catalog/:matchId' element={<MatchDetails />} />
                        </Routes>
                    </main>
                </MatchProvider>
            </div>
        </AuthProvider>
    );
}

export default App;
