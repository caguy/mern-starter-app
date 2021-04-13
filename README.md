# mern-starter-app
Starter for an all-in-one app including a Node/Express/MongoDB, and a SPA React app. 

Uses Mongoose, JWT authentification, custom Webpack configuration, Jest.

## What is this
- Express API boilerplate and basic features :
  - Neat file structure
  - Connexion to remote Mongo database
  - Authentification handler middleware to manage private routes
  - Error handler middleware
  - HTTP header middleware
  - Log handler fitted for dev and prod
  - Rejection utility handler for consistency when requests are rejected
- Basic starter router :
  - GET /users to retrieve all user names (public)
  - GET /users/:id to get details of a specific user (private)
  - POST /token to authenticate
  - DELETE /token to logout
- Model boilerplate and basic User exemple :
  - Basic schema
  - Validation and sanitization
  - Basic services to retrieve users
- Bootstrapped front-end SPA :
  - Custom Webpack config wity Babel, hot module replacement, static loaders
  - HTML template

## How to use
Install server and client dependencies :
```
npm run install
```

Run dev server (server and client served separately for hot reloading reasons) :
```
npm run dev
```

Build and serve production build locally :
```
npm run serve
```

Launch live server :
```
npm start
```
