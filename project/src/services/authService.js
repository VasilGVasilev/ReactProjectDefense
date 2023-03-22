import * as request from "./util/requester"

const baseUrl = 'http://localhost:3030/users';

// no need to resolve promise wrapped in request (ex. via async await)
// due to services passing on synchroniously to be resolved in respective components


export const login = async (email, password) => request.post(`${baseUrl}/login`, {email, password})

// request so that server can destroy session token
export const logout = async (accessToken) => {
    try {
        const response = await fetch(`${baseUrl}/logout`, {
            headers: {
                'X-Authorization': accessToken
            }
        });
        // The service returns an empty response - if you attempt to parse it as JSON, you will receive an error!
        // Thus, no parsing of response! -> no const result = await response.json();
        return response;
    } catch (error) {
        console.log(error);
    }
};

export const register = async (email, password) => request.post(`${baseUrl}/register`, {email, password})