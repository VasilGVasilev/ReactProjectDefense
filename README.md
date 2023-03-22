# ReactProjectDefense

### `npm start` for Front-End initialization, terminal in /project

### `node server` for Back-End initialization, terminal in /server


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


CRUD on matches