import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import * as gameService from '../../services/gameServices'

const GameDetails = ({
    // games,
    // addComment,

}) => {
    const [game, setGame] = useState({});
    const [teamOneVotes, setTeamOneVotes] = useState(4);
    const [teamTwoVotes, setTeamTwoVotes] = useState(1);
    const { matchId } = useParams();

    useEffect(()=>{
        gameService.getOne(matchId)
            .then(result => {
                setGame(result);
            })
    },[])

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

    const onChange = (e) => {
        setComment(state => ({
            ...state,
            [e.target.name]: e.target.value // name="username" :  value={comment.username}
        }))
    }

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



    const handleTeamOne = () => {
        console.log(teamOneVotes)
        setTeamOneVotes(s => s + 1)
    }

    const handleTeamTwo = () => {
        console.log(teamTwoVotes)
        setTeamTwoVotes(s => s + 1)
    }



    return(
        <section className='detailsPage'>
            <div className='container'>

                <h1 className='title'>Match Details</h1>
                <div className='infoSection'>
                    <div className='date'>
                        {game.date}
                    </div>

                    <div className='matchHeader'>
                        <div className='teamOne'>
                            <div className='teamOneChart'>
                                <Link className='teamOneChartEmpty' style={{flex:`${teamTwoVotes}`}}></Link>
                                <Link className='teamOneChartFull' onClick={()=>{handleTeamOne()}} style={{flex:`${teamOneVotes}`}}>{teamOneVotes}</Link>
                            </div>
                        </div>

                        <div className='teamTwo'>
                            <div className='teamTwoChart'>
                                <Link className='teamTwoChartEmpty' style={{flex:`${teamOneVotes}`}}></Link>
                                <Link className='teamTwoChartFull' onClick={()=>{handleTeamTwo()}} style={{flex:`${teamTwoVotes}`}}>{teamTwoVotes}</Link>
                            </div>
                        </div>
                    </div>
                    <div className='matchNames'>
                        <p className='teamOneName'>{game.teamOne}</p>
                        <p className='teamTwoName'>{game.teamTwo}</p>
                    </div>




                    <div className='buttonsDelEdit'>
                        <Link href='#' className='button'>
                            Edit
                        </Link>
                        <Link href='#' className='button'>
                            Delete
                        </Link>
                    </div>

                    <div className='detailsComments'>
                        <h2>Comments:</h2>
                        <ul>
                            {game.comments?.map(x =>
                                <li className='comment'>
                                    <p>{x}</p>
                                </li>
                            )}
                        </ul>
                        {!game.comments &&
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
export default GameDetails;