import { createContext } from "react";

import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'

import * as matchService from '../services/matchServices'

export const MatchContext = createContext();

// Why have provider 
// -> not overclutter App component
// -> updating voting requires more complex state structure, thus, useReducer() for similar to Redux global state management

export const MatchProvider = ({children}) => {
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

    return(
        <MatchContext.Provider value={{ 
            matches, 
            matchAdd, 
            voteAdd, 
            matchEdit, 
            matchDel 
        }}>
            {children}
        </MatchContext.Provider>
    )
}

export const useMatchContext = () => {
    const context = useContext(MatchContext);
    return context;
}

