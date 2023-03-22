import * as request from './util/requester'

const baseUrl = 'http://localhost:3030/data/games';

// no need for promise resolve in services since they just pass on 
// promise wrapped in request to be resolved in App useEffect

export const getAll = () => request.get(baseUrl)

export const getOne = (gameId) => request.get(`${baseUrl}/${gameId}`);

export const create = (gameData) => request.post(baseUrl, gameData);

export const edit = (gameId, gameData) => request.put(`${baseUrl}/${gameId}`, gameData);
