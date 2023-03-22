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
        


CRUD on matches