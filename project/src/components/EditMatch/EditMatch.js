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
    const colors = ["#800000", "#DB3E00", "#FCCB00", "#004DCF", "#5300EB", "#FF0000", "#999999", "#FFFFFF", "#FE9200", "#A4DD00", "#68CCCA", "#73D8FF",
        "#AEA1FF", "#FDA1FF", "#333333", "#cccccc", "#E27300", "#B0BC00", "#68BC00", "#0047AB", "#009CE0", "#7B64FF", "#FB9E00", "#653294",
    ];

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
        
        // votes remain the same due to not updating separate votes collection
        let matchData = values;

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
        <section className='editFormContainer'>
            <div className='formWrapper'>
                <div className="logoAndNB">
                    <span className='logo'>Edit Game</span>
                </div>
                <form onSubmit={onSubmit}>
                    <label htmlFor='date' defaultValue={values?.date} >Date:</label>
                    <input 
                        type='date' 
                        name='date' 
                        id='date'
                        onChange={changeHandler}
                        defaultValue={values?.date}
                    />
                    <label htmlFor='teamOne'>Team 1:</label>
                    <input 
                        type='text' 
                        name='teamOne' 
                        id='teamOne' 
                        placeholder='Enter Team 1'
                        onChange={changeHandler}
                        defaultValue={values?.teamOne}
                    />
                    <label htmlFor='teamOneColor'>Color: <span style={{color: values?.teamOneColor}}>{values?.teamOneColor}</span></label>
                    <GithubPicker
                        color={values?.teamOneColor}
                        colors={colors}
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
                        defaultValue={values?.teamTwo}
                    />
                    <label htmlFor='teamTwoColor'>Color: <span style={{color: values?.teamTwoColor}}>{values?.teamTwoColor}</span></label>
                    <GithubPicker
                        color={values?.teamOneColor}
                        colors={colors}
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
