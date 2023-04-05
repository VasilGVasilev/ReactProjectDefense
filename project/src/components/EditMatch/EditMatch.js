import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';

import { GithubPicker } from 'react-color'

import * as matchService from '../../services/matchServices';
import { MatchContext } from "../../contexts/MatchContext";

const EditMatch = () => {
    const { matchEdit } = useContext(MatchContext);
    const { matchId } = useParams();
    const navigate = useNavigate();

    // to offset -> The warning "A component is changing an uncontrolled input to be controlled" occurs when an input value is initialized to undefined but is later changed to a different value.
    const [values, setValues] = useState({
        date: '',
        teamOne: '',
        teamOneColor: '',
        teamTwo: '',
        teamTwoColor: '',
    });

    const colors = ["#800000", "#DB3E00", "#FCCB00", "#004DCF", "#5300EB", "#FF0000", "#999999", "#028A0F", "#FE9200", "#A4DD00", "#68CCCA", "#73D8FF",
        "#AEA1FF", "#FDA1FF", "#333333", "#cccccc", "#E27300", "#B0BC00", "#68BC00", "#0047AB", "#009CE0", "#7B64FF", "#FB9E00", "#653294",
    ];

    const [errors, setErrors] = useState({
        noDate: false,
        noTeamOne: false,
        noTeamTwo: false,
    })

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

        // Data validation:

        if(matchData.date == ''){
            setErrors(state => ({
                ...state,
                noDate: true
            }))
            return;
        }
        if(matchData.teamOne == ''){
            setErrors(state => ({
                ...state,
                noTeamOne: true
            }))
            return;
        }
        if(matchData.teamTwo == ''){
            setErrors(state => ({
                ...state,
                noTeamTwo: true
            }))
            return;
        }

        // first update server
        matchService.edit(matchId, matchData)
            .then(result=>{
        //second pass on data to update client state
                matchEdit(matchId, result);
                navigate(`/catalog/${matchId}`)
                // no update of votes, we want them to persist
            })
    }

    const changeHandler = (e) => {
        setValues(state => ({
            ...state,
            [e.target.name]: e.target.value
        }));
        // reset data validation on click
        setErrors(state => ({
            ...state,
            noDate: false,
            noTeamOne: false,
            noTeamTwo: false,
        }));
    };

    return (
        <section className='editFormContainer'>
            <div className='formWrapper'>
                <div className="logoAndNB">
                    <span className='logo'>Edit Game</span>
                </div>
                <form onSubmit={onSubmit}>
                    <label htmlFor='date' >Date:</label>
                    {errors.noDate && <div className='errors'>Enter date</div>}
                    <input 
                        type='date' 
                        name='date' 
                        id='date'
                        onChange={changeHandler}
                        value={values?.date}
                    />
                    <label htmlFor='teamOne'>Team 1:</label>
                    {errors.noTeamOne && <div className='errors'>Enter name</div>}
                    <input 
                        type='text' 
                        name='teamOne' 
                        id='teamOne' 
                        placeholder='Enter Team 1'
                        onChange={changeHandler}
                        value={values?.teamOne}
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
                    {errors.noTeamTwo && <div className='errors'>Enter name!</div>}
                    <input 
                        type='text' 
                        name='teamTwo' 
                        id='teamTwo' 
                        placeholder='Enter Team 2'
                        onChange={changeHandler}
                        value={values?.teamTwo}

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
