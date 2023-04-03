# ReactProjectDefense

## What's in the stack

- Styling with [SASS](https://sass-lang.com/)
- Color picker with [React Color](https://casesandberg.github.io/react-color/)
- Server by [SoftUni Practice Server](https://github.com/softuni-practice-server/softuni-practice-server)

## Development

- Start Front-End in ./project:

  ```sh
  npm start
  ```
- Start Back-End in ./server:

  ```sh
  node server
  ```


## How does the app work:

Auth

    Registration: 
        Registration request triggers automatically the creation of a session on the server and returns an object with {email, password, createdOn, -id and accessToken}.
        Pass on this object to our userLogin function via context API.
    
    Login:
        Utilize the custom hook 'useLocalStorage' - sets the object both as a value of state for the App component and as a value of localStorage, thus, authentication persists in case of page refresh.

    Navigation:
        Filter links based on user.email available in Context API - only logged-in user will have valid user.email, default auth is empty object {}.

    
CRUD on matches

    Catalog:
        Sorts the last added match to be first left-to-right.

    CreateMatch:
        Sends a create POST request and updates the App component state via Context API.

    EditMatch:
        Fetches data only from matches collection DB into a controlled form, since editing votes will go against logic of app. 

    MatchDetail:
        Loads the chosen match onto matchDetails component from global state via ContextApi. Default visualisation with initial empty object global state value is error handled via '?.'. 
        Votes are dynamic - CSS flex to make bar chart out of visible and invisible block above it. Method handleClick() changes the proportion of these to flex blocks so that it represents a bar chart. 
        Each click to vote mutates the votes collection in DB while also updates the global state by adding votes to be a subvalue of matches. 
        The reason for two separate collections that are combined into single state only on Front-End - limitations of the Softuni Practice Server to make PUT requests to collections by users other than the owner.
