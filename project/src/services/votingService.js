import * as request from './util/requester'

const baseUrl = 'http://localhost:3030/data/votes';

export const create = (matchId, vote) =>
    request.post(baseUrl, { matchId, vote });

export const getByMatchId = (matchId) => {
    const search = encodeURIComponent(`matchId="${matchId}"`);
    return request.get(`${baseUrl}?where=${search}`);
}

