import './style.scss'

import Header from './components/Header/Header';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import CreateMatch from './components/CreateMatch/CreateMatch';
import Catalog from './components/Catalog/Catalog';
import MatchDetails from './components/MatchDetails/MatchDetails';


import * as gameService from './services/gameServices'


import { Routes, Route, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';

function App() {
  const [games, setGames] = useState([]);
  useEffect(()=>{
      gameService.getAll()
              .then(result => {
                  setGames(result)
              })
  },[])

  return (
    <div className="box">
     <Header></Header>
     <main className='main-content'>
      <Routes>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/create' element={<CreateMatch />}></Route>
        <Route path='/catalog' element={<Catalog games={games} />}></Route>
        <Route path='/catalog/:matchId' element={<MatchDetails />}></Route>


      </Routes>

     </main>
    </div>
  );
}

export default App;
