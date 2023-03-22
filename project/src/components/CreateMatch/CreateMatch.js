import { useState } from 'react'
import { GithubPicker } from 'react-color'


const CreateMatch = () => {
    const [teamOneColor, setTeamOneColor] = useState('#B80000')
    const [teamTwoColor, setTeamTwoColor] = useState('#5300EB')

    const onSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const date = formData.get('date');
        const teamOne = formData.get('teamOne');
        const teamTwo = formData.get('teamTwo');
        
        let info = {date, teamOne, teamTwo, teamOneColor, teamTwoColor}
        console.log(info);
        

    }

    return(
        <section className='loggedFormContainer'>
        <div className='formWrapper'>
            <span className='logo'>Create Game</span>
            <form onSubmit={onSubmit}>
                <label htmlFor="date">Date:</label>
                <input type="date" name="date" id='date'/>
                <label htmlFor="teamOne">Team 1:</label>
                <input type="text" name="teamOne" id='teamOne' placeholder='Enter Team 1'/>
                <label htmlFor="teamOneColor">Color: <span style={{color: teamOneColor}}>{teamOneColor}</span></label>
                <GithubPicker
                    color={teamOneColor}
                    onChangeComplete={(color) => {setTeamOneColor(color.hex)}}
                />
                <label htmlFor="teamTwo">Team 2:</label>
                <input type="text" name="teamTwo" id='teamTwo' placeholder='Enter Team 2'/>
                <label htmlFor="teamTwoColor">Color: <span style={{color: teamTwoColor}}>{teamTwoColor}</span></label>
                <GithubPicker
                    onChangeComplete={(color) => {setTeamTwoColor(color.hex)}}
                />
                <button>Create</button>
            </form>

        </div>
    </section>
    )
}

export default CreateMatch;


