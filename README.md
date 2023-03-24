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

    Catalog:
        we sort the last added match to be first left-to-right.

    CreateMatch:
        we make a create POST request and update the local App via Context API method passed in as a value.

    MatchDetail:
        we load the chosen match onto matchDetails component state and use it to visualise default properties. Likes are dynamic, we use CSS flex to make bar chart out of visible and invisible block above it. handleClick changes the proportion of these to flex blocks so that it represents a bar chart. We use the central matches state in App component to extracted away the one we want details for. Each click to vote mutates the state of the locally extracted match and via Context API useContext method from App component we update the match details regarding voting in the central state (App component). This is done on Front-End only due to limits of the Softuni Practice Server to make PUT requests to collections by users other than the owner. If you refresh likes are destroyed since state is re-set based on fetch from DB.

    EditMatch:
        we fetch data from DB into a controlled form, there is a note saying that voting will be reset, since for now it does not persist even in memory of DB