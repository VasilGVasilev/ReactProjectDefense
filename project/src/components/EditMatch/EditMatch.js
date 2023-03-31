import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';

import { GithubPicker } from 'react-color'

import * as matchService from '../../services/matchServices';
import { MatchContext } from "../../contexts/MatchContext";

const EditMatch = () => {
    const { matchEdit } = useContext(MatchContext);
    const { matchId } = useParams();
    const navigate = useNavigate();

    const [values, setValues] = useState({});

    useEffect(() => {
        matchService.getOne(matchId)
            .then(matchData => {
                setValues({
                    date: matchData.date,
                    teamOne: matchData.teamOne,
                    teamOneColor: matchData.teamOneColor,
                    teamTwo: matchData.teamTwo,
                    teamTwoColor: matchData.teamTwoColor,
                });
            })
    }, [])


    const onSubmit = (e) => {
        e.preventDefault();
        
        // init object with defualt likes
        let matchData = values;
        matchData['teamOneVotes'] = 1;
        matchData['teamTwoVotes'] = 1;

        // first update server
        matchService.edit(matchId, matchData)
            .then(result=>{
        //second pass on data to update client state
                matchEdit(matchId, result);
                navigate(`/catalog/${matchId}`)

            })
    }

    const changeHandler = (e) => {
        setValues(state => ({
            ...state,
            [e.target.name]: e.target.value
        }));
    };

    return (
        <section className='loggedFormContainer'>
            <div className='formWrapper'>
                <div className="logoAndNB">
                    <span className='logo'>Edit Game</span>
                    <span className="NB">Note voting will be reset!</span>
                </div>
                <form onSubmit={onSubmit}>
                    <label htmlFor='date' defaultValue={values.date} >Date:</label>
                    <input 
                        type='date' 
                        name='date' 
                        id='date'
                        onChange={changeHandler}
                        defaultValue={values.date}
                    />
                    <label htmlFor='teamOne'>Team 1:</label>
                    <input 
                        type='text' 
                        name='teamOne' 
                        id='teamOne' 
                        placeholder='Enter Team 1'
                        onChange={changeHandler}
                        defaultValue={values.teamOne}
                    />
                    <label htmlFor='teamOneColor'>Color: <span style={{color: values.teamOneColor}}>{values.teamOneColor}</span></label>
                    <GithubPicker
                        color={values.teamOneColor}
                        onChangeComplete={(color) => {setValues(state => ({
                            ...state,
                            teamOneColor: color.hex
                        }))}}
                    />
                    <label htmlFor='teamTwo'>Team 2:</label>
                    <input 
                        type='text' 
                        name='teamTwo' 
                        id='teamTwo' 
                        placeholder='Enter Team 2'
                        onChange={changeHandler}
                        defaultValue={values.teamTwo}
                    />
                    <label htmlFor='teamTwoColor'>Color: <span style={{color: values.teamTwoColor}}>{values.teamTwoColor}</span></label>
                    <GithubPicker
                        onChangeComplete={(color) => {setValues(state => ({
                            ...state,
                            teamTwoColor: color.hex
                        }))}}
                    />
                    <button>Edit</button>
                </form>

            </div>
        </section>
    );
}

export default EditMatch;
