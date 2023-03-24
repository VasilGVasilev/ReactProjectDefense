import { useContext, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import * as matchService from '../../services/matchServices'

import { AuthContext } from '../../contexts/AuthContext';
import { MatchContext } from '../../contexts/MatchContext';



const MatchDetails = ({
}) => {

    const { user } = useContext(AuthContext);
    const { voteAdd, matches } = useContext(MatchContext);

    
    const { matchId } = useParams();
    const match = matches.find(x => x._id == matchId)


    {

        // comment logic hardcoding users that comment
        const [ comment, setComment] = useState({
            username: '',
            comment: '',
        });
    
        // const [error, setError] = useState({
        //     username: '',
        //     comment: '',
        // });
    
    
        // const addCommentHandler = (e) => {
        //     e.preventDefault();
        //     addComment(gameId, `${comment.username}: ${comment.comment}`)
        //     console.log(comment)
        // }
    
        // const onChange = (e) => {
        //     setComment(state => ({
        //         ...state,
        //         [e.target.name]: e.target.value // name="username" :  value={comment.username}
        //     }))
        // }
    
        // const validateUsername = (e) => {
        //     const username = e.target.value;
        //     let errorMessage = '';
        //     if (username.length < 4){
        //         errorMessage = 'Username must be minimum 4 characters long!'
        //     } else if (username.length > 10) {
        //         errorMessage = 'Username must be shorter than 10 characters!'
        //     }
        //     setError(state => ({
        //         ...state,
        //         [e.target.name]: errorMessage
        //     }))
    
        // }
    }
    // Object { _ownerId: "35c62d76-8152-4626-8712-eeb96381bea8", date: "2023-03-23", teamOne: "CSKA", teamOneColor: "#b80000", teamTwo: "Levski", teamTwoColor: "#5300EB", _createdOn: 1679581828243, _id: "9046b5e8-11bc-4344-9bee-999eac59efca" }
    
    let owner = user._id == match._ownerId ? true : false;
    let loggedIn = user.email || false;

    const handleTeamOne = () => {
        let current = match.teamOneVotes;
        current++;
        match.teamOneVotes = current;

        voteAdd(match);

    }

    const handleTeamTwo = () => {
        let current = match.teamTwoVotes;
        current++;
        match.teamTwoVotes = current;

        voteAdd(match);

    }


    const teamOneChartFullStyle = {
        flex:`${match.teamOneVotes}`,
        backgroundColor: `${match.teamOneColor}`
    }

    const teamTwoChartFullStyle = {
        flex:`${match.teamTwoVotes}`,
        backgroundColor: `${match.teamTwoColor}`
    }

    // const deleteMatch = () => {

    //     matchService.del(matchId)
    //         .then(result => {
    //             return;
    //         })
        
    // }


    return(
        <section className='detailsPage'>
            <div className='container'>

                <h1 className='title'>Vote for your team!</h1>
                <div className='infoSection'>
                    <div className='date'>
                        {match.date}
                    </div>

                    <div className='matchHeader'>
                        <div className='teamOne'>
                            <div className='teamOneChart'>
                                <Link className='teamOneChartEmpty' style={{flex:`${match.teamTwoVotes}`}}></Link>
                                <Link className='teamOneChartFull' onClick={loggedIn ? handleTeamOne : null} style={teamOneChartFullStyle}>{match.teamOneVotes}</Link>
                            </div>
                        </div>

                        <div className='teamTwo'>
                            <div className='teamTwoChart'>
                                <Link className='teamTwoChartEmpty' style={{flex:`${match.teamOneVotes}`}}></Link>
                                <Link className='teamTwoChartFull' onClick={loggedIn ? handleTeamTwo : null} style={teamTwoChartFullStyle}>{match.teamTwoVotes}</Link>
                            </div>
                        </div>
                    </div>
                    <div className='matchNames'>                              
                        <Link className='teamOneName' onClick={loggedIn ? handleTeamOne : null}>{match.teamOne}</Link>
                        <Link className='teamTwoName' onClick={loggedIn ? handleTeamTwo : null}>{match.teamTwo}</Link>
                    </div>

        {
            owner 
                ?
                    <div className='buttonsDelEdit'>
                        <Link to={`/matches/${matchId}/edit`} className='buttonEdit'>
                            Edit
                        </Link>
                        <Link className='buttonDel'>
                            Delete
                        </Link>
                    </div>
                :
                    <>
                    </>

        }


                    <div className='detailsComments'>
                        <h2>Comments:</h2>
                        <ul>
                            {match.comments?.map(x =>
                                <li className='comment'>
                                    <p>{x}</p>
                                </li>
                            )}
                        </ul>
                        {!match.comments &&
                            <div className='detailsCommentsOne'>

                                <p className='noComment'>No comments.</p>

                            </div>
                        }
                    </div>


                </div>
            </div>

            {/* <article className='create-comment'>
                <label>Add new comment:</label>
                <form className='form' onSubmit={addCommentHandler}>
                    <input
                        type='text'
                        name='username'
                        placeholder='John Doe'
                        onChange={onChange}
                        onBlur={validateUsername}
                        value={comment.username}
                    />
                    {error.username && 
                        <div style={{color: 'red'}}>{error.username}</div>
                    }
                    <textarea
                        name='comment'
                        placeholder='Comment......'
                        onChange={onChange}
                        value={comment.comment}
                        
                    />
                    <input
                        className='btn submit'
                        type='submit'
                        defaultValue='Add Comment'
                    />
                </form>
            </article> */}
        </section>
    )
}
export default MatchDetails;