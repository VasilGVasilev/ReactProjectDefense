import * as request from './util/requester'

const baseUrl = 'http://localhost:3030/data/votes';

export const create = (matchId, vote) =>
    request.post(baseUrl, { matchId, vote });

export const getByMatchId = (matchId) => {
    const search = encodeURIComponent(`matchId="${matchId}"`);
    return request.get(`${baseUrl}?where=${search}`);
}

// getByGame will return a relation between games and comments collection:
	
// 0:	
//     _ownerId:	"35c62d76-8152-4626-8712-eeb96381bea8"
//     gameId:	"126777f5-3277-42ad-b874-76d043b069cb"
//     text:	"Zombie gang 1"
//     _createdOn:	1680091875264
//     _id:	"073d9dcc-877b-40b6-9a34-a80bf6e9e75c"
//     user:	
//         email:	"peter@abv.bg"
//         _id:	"35c62d76-8152-4626-8712-eeb96381bea8"
// 1:	
//     _ownerId:	"35c62d76-8152-4626-8712-eeb96381bea8"
//     gameId:	"126777f5-3277-42ad-b874-76d043b069cb"
//     text:	"Zombie Gang 2"
//     _createdOn:	1680091893542
//     _id:	"74a1bc1c-5123-42ac-a930-6ba4fd6b1710"
//     user:	
//         email:	"peter@abv.bg"
//         _id:	"35c62d76-8152-4626-8712-eeb96381bea8"
