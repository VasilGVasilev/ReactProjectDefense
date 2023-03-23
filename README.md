# ReactProjectDefense

## What's in the stack

- Styling with [SASS](https://sass-lang.com/)


## Development

- Start Front-End in ./project:

  ```sh
  npm start
  ```
- Start Back-End in ./server:

  ```sh
  node server
  ```



How does the app work:

Auth
    separation of concerns:
        we use a model of component calling services calling util function

    Registration: 
        we make a registration request according to softuni practice server docs
        the service automatically creates a session on the server and returns an object with {email, password, createdOn, -id and accessToken}
        we pass on this object to our userLogin function via context API
    
    Login:
        we utilize the custom hook combining setting the object as a value of state for App component and setting the value of localStorage

    Navigation:
        we filter Links based on if there is user.email in Context API, because only logged-in user has email, default auth is empty object {}

    
CRUD on matches

    CreateMatch:
        we make a create POST request and update the local App via Context API method passed in as a value. It is quintessetial that for the purposes of the app showing the latest request first we update the local state and separately sort when getting all the matches from DB