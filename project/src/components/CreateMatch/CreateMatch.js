import { useContext, useState } from 'react'
import { GithubPicker } from 'react-color'
import { MatchContext } from '../../contexts/MatchContext';

import * as matchService from '../../services/matchServices';


const CreateMatch = () => {
    const { matchAdd } = useContext(MatchContext)

    const [values, setValues] = useState({
        date: '',
        teamOne: '',
        teamOneColor: '#B80000',
        teamTwo: '',
        teamTwoColor: '#5300EB',
    });


    const onSubmit = (e) => {
        e.preventDefault();
        
        // init object with defualt likes
        let matchData = values;
        matchData['teamOneLikes'] = 0;
        matchData['teamTwoLikes'] = 0;
        
        // first update server
        matchService.create(matchData)
            .then(result=>{
        //second pass on data to update client state
                matchAdd(result) 
            })
    }

    const changeHandler = (e) => {
        setValues(state => ({
            ...state,
            [e.target.name]: e.target.value
        }));
    };

    return(
        <section className='loggedFormContainer'>
        <div className='formWrapper'>
            <span className='logo'>Create Game</span>
            <form onSubmit={onSubmit}>
                <label htmlFor='date' value={values.date} >Date:</label>
                <input 
                    type='date' 
                    name='date' 
                    id='date'
                    onChange={changeHandler}
                    value={values.date}
                />
                <label htmlFor='teamOne'>Team 1:</label>
                <input 
                    type='text' 
                    name='teamOne' 
                    id='teamOne' 
                    placeholder='Enter Team 1'
                    onChange={changeHandler}
                    value={values.teamOne}
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
                    value={values.teamTwo}
                />
                <label htmlFor='teamTwoColor'>Color: <span style={{color: values.teamTwoColor}}>{values.teamTwoColor}</span></label>
                <GithubPicker
                    onChangeComplete={(color) => {setValues(state => ({
                        ...state,
                        teamTwoColor: color.hex
                    }))}}
                />
                <button>Create</button>
            </form>

        </div>
    </section>
    )
}

export default CreateMatch;


