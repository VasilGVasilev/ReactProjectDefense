import * as request from "./util/requester"

const baseUrl = 'http://localhost:3030/users';

export const login = async (email, password) => request.post(`${baseUrl}/login`, {email, password})

// request so that server can destroy session token
export const logout = async (accessToken) => {
    try {
        const response = await fetch(`${baseUrl}/logout`, {
            headers: {
                'X-Authorization': accessToken
            }
        });
// dont  resolve  with .then() Server docs requires to just return!
        return response;
    } catch (error) {
        console.log(error);
    }
};

export const register = async (email, password) => request.post(`${baseUrl}/register`, {email, password})