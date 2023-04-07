import { useParams, Link, useNavigate } from 'react-router-dom';
import * as matchService from '../../services/matchServices'
import * as votingService from '../../services/votingService'

import { useAuthContext } from '../../contexts/AuthContext';
import { useMatchContext } from '../../contexts/MatchContext';
import { useEffect } from 'react';



const MatchDetails = () => {
    const navigate = useNavigate()
    const { user, isAuthenticated } = useAuthContext();
    const { voteAdd, matchDel, fetchMatchDetails, selectMatch } = useMatchContext();

    
    const { matchId } = useParams();

    const match = selectMatch(matchId)

    // abstracted for easier update
    const votes = match?.vote;

    // use self-executing function async() => {}() so that we can have two resolved fetches to input into third function, alternative is Promise.all()
    useEffect(() => {
        (async () => {
            const matchDetails = await matchService.getOne(matchId);
            const matchVotes = await votingService.getByMatchId(matchId);
            const lastestVote = matchVotes.length - 1
            const recentVote = matchVotes[lastestVote];

            // update match so that at re-render select finds the updated match with voting
            fetchMatchDetails(matchId, { ...matchDetails, vote: {...recentVote.vote} });
        })();
    }, []) //no need to update dependency, we do not rely on server for fresh data, we update simultaneously server and state


    const handleTeamOne = () => {
        let current = votes?.teamOneVotes;
        current++;
        votes.teamOneVotes = current;

        const voteData = {
            matchId,
            vote: votes
        }
        votingService.create(matchId, votes)
            .then(result=>{
                voteAdd(voteData);
            })
    }

    const handleTeamTwo = () => {
        let current = votes?.teamTwoVotes;
        current++;
        votes.teamTwoVotes = current;

        const voteData = {
            matchId,
            vote: votes
        }

        votingService.create(matchId, votes)
            .then(result=>{
                voteAdd(voteData);
            })


    }


    const deleteMatch = () => {
        matchService.del(matchId)
            .then(() => {
                navigate('/catalog')
                matchDel(matchId)
            })
    }



    // CSS variables
    const owner = user._id == match?._ownerId ? true : false;

    // dynamic style
    const teamOneChartFullStyle = {
        flex:`${votes?.teamOneVotes}`,
        backgroundColor: `${match?.teamOneColor}`
    }

    const teamTwoChartFullStyle = {
        flex:`${votes?.teamTwoVotes}`,
        backgroundColor: `${match?.teamTwoColor}`
    }

    // numerous match?. due to intial render being on an empty initial state, thus, need to handle undefined and allow initial render, only after which useEffect populates data
    return(
        <section className='detailsPage'>
            <div className='container'>
                {isAuthenticated
                    ?
                        <h1 className='title'>Click for your team !</h1>
                    :
                        <Link style={{textDecoration: 'none', cursor: 'pointer'}} to={'/login'}><h1 className='title' >Login to vote</h1></Link>
                }
                
                <div className='infoSection'>
                    {
                        owner &&
                                <div className='buttonsDelEdit'>
                                    <Link to={`/matches/${matchId}/edit`} className='buttonEdit'>
                                        Edit
                                    </Link>
                                    <Link onClick={deleteMatch} className='buttonDel'>
                                        Delete
                                    </Link>
                                </div>
                    }
                    <div className='date'>
                        {match?.date}
                    </div>
                    <div className='matchHeader'>
                        {
                            !!votes &&   //error handling with enabled throttling - intitial render based on useEffect which may be slow
                                <>                      
                                    <div className='teamOne'>
                                        <div className='teamOneChart'>
                                            <Link className='teamOneChartEmpty' style={{flex:`${votes.teamTwoVotes}`}}></Link>
                                            <Link className='teamOneChartFull' onClick={isAuthenticated ? handleTeamOne : null} style={teamOneChartFullStyle}>{votes.teamOneVotes}</Link>
                                        </div>
                                    </div>

                                    <div className='teamTwo'>
                                        <div className='teamTwoChart'>
                                            <Link className='teamTwoChartEmpty' style={{flex:`${votes.teamOneVotes}`}}></Link>
                                            <Link className='teamTwoChartFull' onClick={isAuthenticated ? handleTeamTwo : null} style={teamTwoChartFullStyle}>{votes.teamTwoVotes}</Link>
                                        </div>
                                    </div>
                                </>
                        }
                    </div>
                    <div className='matchNames'>                              
                        <Link className='teamOneName' onClick={isAuthenticated ? handleTeamOne : null}>{match?.teamOne}</Link>
                        <Link className='teamTwoName' onClick={isAuthenticated ? handleTeamTwo : null}>{match?.teamTwo}</Link>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default MatchDetails;

// best practice is to to update the server via fetch and
// within the resolving of the request update state and navigate