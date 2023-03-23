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

    MatchDetail:
        we load the chosen match onto matchDetails component state and use it to visualise default properties. Likes are dynamic, we use CSS flex to make bar chart out of visible and invisible block above it. handleClick changes the proportion of these to flex blocks so that it represents adequatly the competition. 

        to be edited:
        Currently, useEffect updates via put the chnaged bit of the match object -> likes property, there is no need to notify and update the App component state via Context API or any, as done before, thus, leading to overpopulation of the state with same match until refresh clears. But this is done as I said via no update of App component state, just the details one and via useEffect the DB. BUT there is another problem, using put to update votes is possible only as an owner as per softuni practice server docs, thus I have to make another collection that identifies each match and keeps track of the likes for the teams that all users can send POSTs to. Then I will limit visually clickability of like buttons