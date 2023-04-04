const request = async (method, url, data) => {
    try {
        const user = localStorage.getItem('auth');
        const auth = JSON.parse(user || '{}') ;// user || '{}' -> catches if user is undefined

        let headers = {}

        if(auth.accessToken){
            headers['X-Authorization'] = auth.accessToken;
        }

        let buildRequest;

        if(method === 'GET'){
            buildRequest = fetch(url, { headers });
        } else {
            buildRequest = fetch(url, {
                method,
                headers: {
                    ...headers,
                    'content-type': 'application/json'
                },
                body: JSON.stringify(data)
            })
        }

        const response = await buildRequest;

        // logout has custom fetch so that it does not crash due to following parsing: see authService
        const result = await response.json();
        return result;

    } catch (error) {

    }
    
}

// .bind() requires first arg as context -> thus, here is empty obj/null
export const get = request.bind({}, 'GET');
export const post = request.bind({}, 'POST');
export const patch = request.bind({}, 'PATCH');
export const put = request.bind({}, 'PUT');
export const del = request.bind({}, 'DELETE');
