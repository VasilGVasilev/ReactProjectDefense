import { useContext, useState } from 'react'
import { GithubPicker } from 'react-color'
import { MatchContext } from '../../contexts/MatchContext';

import * as matchService from '../../services/matchServices';
import * as votingService from '../../services/votingService'


// Controlled form for viewing the code of the color
const CreateMatch = () => {
    const { matchAdd, voteAdd } = useContext(MatchContext)
    const colors = ["#800000", "#DB3E00", "#FCCB00", "#004DCF", "#5300EB", "#FF0000", "#999999", "#028A0F", "#FE9200", "#A4DD00", "#68CCCA", "#73D8FF",
        "#AEA1FF", "#FDA1FF", "#333333", "#cccccc", "#E27300", "#B0BC00", "#68BC00", "#0047AB", "#009CE0", "#7B64FF", "#FB9E00", "#653294",
      ];
      
    const [values, setValues] = useState({
        date: '',
        teamOne: '',
        teamOneColor: '#800000',
        teamTwo: '',
        teamTwoColor: '#0047AB',
    });


    const onSubmit = (e) => {
        e.preventDefault();
        
        // init object with defualt likes due to custom bar chart using flex
        const vote = {
            teamOneVotes: 1,
            teamTwoVotes: 1
        }


        let matchData = values;

        // Order of update:
            // Fist matches collection DB updated (Back-End)
            // Then matches state updated (Front-End)
            // Separate voting DB updated likewise, then state added to matches
            // thus, up-to-date with server for multi-user experience

        matchService.create(matchData)
            .then(result=>{
                matchAdd(result)
                votingService.create(result._id, vote)
                    .then(result=>{
                        voteAdd(result) 
                    })
            })



    }

    const changeHandler = (e) => {
        setValues(state => ({
            ...state,
            [e.target.name]: e.target.value
        }));
    };

    return(
        <section className='createFormContainer'>
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
                    <label htmlFor='teamOneColor'>Color: <span style={{color: values.teamOneColor, fontWeight: 'bold'}}>{values.teamOneColor}</span></label>
                    <GithubPicker
                        color={values.teamOneColor}
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
                        value={values.teamTwo}
                    />
                    <label htmlFor='teamTwoColor'>Color: <span style={{color: values.teamTwoColor, fontWeight: 'bold'}}>{values.teamTwoColor}</span></label>
                    <GithubPicker
                        color={values.teamTwoColor}
                        colors={colors}
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


