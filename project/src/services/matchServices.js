import * as request from './util/requester'

const baseUrl = 'http://localhost:3030/data/matches';

// no need for promise resolve in services since they just pass on 
// promise wrapped in request to be resolved in App useEffect

export const getAll = () => request.get(`${baseUrl}?sortBy=_createdOn%20desc`)

export const getOne = (matchId) => request.get(`${baseUrl}/${matchId}`);

export const create = (matchData) => request.post(baseUrl, matchData);

export const edit = (matchId, matchData) => request.put(`${baseUrl}/${matchId}`, matchData);
