import { createContext, useContext, useReducer, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

import * as matchService from '../services/matchServices'

export const MatchContext = createContext();

// reducing function outside component -> to not be re-rendered every time we update state
const matchReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_MATCHES':
            return action.payload.map( x => ({  ...x, vote: {} }))
            // return action.payload.slice() // Safety check - if we expect an array, easiest way to have a new reference -> someValue.slice() || [...someValue]
        case 'ADD_MATCH':
            return [...state, action.payload];
        case 'FETCH_MATCH_DETAILS': //since we want the same return, namely, set updated state with comment in first case and edited in second case, we can stack them and put only one return for both
        case 'EDIT_MATCH':
            return state.map(x => x._id === action.matchId ? action.payload : x)
        case 'ADD_VOTE':
            return state.map(x => x._id === action.payload.matchId ? {...x, vote: action.payload.vote} : x)
        case 'REMOVE_MATCH':
            return state.filter(x => x._id !== action.matchId);
        default:
            return state; //if no valid action is inputed into dispatch
    }
}

// Why have provider 
// -> not overclutter App component
// -> updating voting requires more complex state structure, thus, useReducer() for similar to Redux global state management
export const MatchProvider = ({children}) => {
    const [matches, dispatch] = useReducer(matchReducer, []); // useReducer main advantage -> easier to read, matches and votes DB into single state
    const navigate = useNavigate();

    useEffect(() => {
        matchService.getAll()
            .then(result => {
                    const action = {
                        type: 'ADD_MATCHES',
                        payload: result
                    }
                    dispatch(action)     
                })
    }, [])


    // CRUD on matches

    const matchAdd = (matchData) => {
        dispatch({
            type: 'ADD_MATCH',
            payload: matchData,
        })
        navigate('/catalog')
    };

    const matchEdit = (matchId, matchData) => {
        dispatch({
            type: 'EDIT_MATCH',
            payload: matchData,
            matchId,
        });
    }

    const matchDel = (matchId) => {
        dispatch({
            type: 'REMOVE_MATCH',
            matchId,
        });
    }

    const fetchMatchDetails = (matchId, matchData) => {
        dispatch({
            type: 'FETCH_MATCH_DETAILS',
            payload: matchData,
            matchId,
        })
    }

    const selectMatch = (matchId) => {
        return matches.find(x => x._id === matchId); //so that deleting match from state does not crash due to undefined if updating state is outside fetch of updateing DB
    };

    // CRUD on votes

    const voteAdd = (voteData) => {
        dispatch({
            type: 'ADD_VOTE',
            payload: voteData
        });
    }

    return(
        <MatchContext.Provider value={{ 
            matches, 
            matchAdd, 
            voteAdd,
            matchEdit, 
            matchDel,
            fetchMatchDetails,
            selectMatch 
        }}>
            {children}
        </MatchContext.Provider>
    )
}

export const useMatchContext = () => {
    const context = useContext(MatchContext);
    return context;
}

