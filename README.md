# Social Media Web Application

![License](https://img.shields.io/badge/License-MIT-blue.svg)
![Node.js](https://img.shields.io/badge/Node.js-16.x-brightgreen)
![React](https://img.shields.io/badge/React-17.x-blue)
![Express](https://img.shields.io/badge/Express-4.x-lightgrey)
![MongoDB](https://img.shields.io/badge/MongoDB-4.x-green)

## Overview

This is a modern social media web application created using the MERN stack (MongoDB, Express.js, React.js, Node.js). The application allows users to create accounts, post updates, follow other users, and engage in conversations.

## Features

- **User Authentication**: Sign up, log in, and log out functionality.
- **User Profiles**: View and edit user profiles.
- **Posts**: Create, edit, delete, and view posts.
- **Comments**: Add comments to posts.
- **Likes**: Like and unlike posts.
- **Follow System**: Follow and unfollow other users.
- **Real-time Updates**: Instant updates on new posts and comments using WebSockets.
- **Responsive Design**: Fully responsive design for mobile and desktop.

## Tech Stack

- **Frontend**: React.js, Redux, React Router
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Styling**: CSS Modules, SASS
- **Real-time Communication**: Socket.io
- **Testing**: Jest, Enzyme

## Installation

1. **Clone the repository**

    ```bash
    git clone https://github.com/YASSINEKS007/Social-Media-App-MERN.git
    cd social-media-app
    ```

2. **Install dependencies**

    - For the backend:
        ```bash
        cd backend
        npm install
        ```

    - For the frontend:
        ```bash
        cd ../frontend
        npm install
        ```

3. **Set up environment variables**

    Create a `.env` file in the `backend` directory with the following variables:

    ```env
    PORT=backend_server_port
    MONGO_URI=your_mongodb_connection_url
    JWT_SECRET=your_jwt_secret
    ```

4. **Run the application**

    - Start the backend server:
        ```bash
        cd backend
        npm start
        ```

    - Start the frontend development server:
        ```bash
        cd ../frontend
        npm run dev
        ```

    The frontend will be available at `http://localhost:3000`.
    The frontend will be available at `http://localhost:8000`. (if you choose PORT=8000) 

## Usage

1. Open your browser and navigate to `http://localhost:3000`.
2. Sign up for a new account or log in with an existing account.
3. Explore the features such as creating posts, following users, and engaging with content.

## Screenshots

![Login Page](imgs/login-page.png)
*Login Page*

![SignUp Page](imgs/signup-page.png)
*Sign Up Page*

![Profile DARK Page](imgs/profile-dark.png)
*Main Page Dark Mode*

![Profile LIGHT Page](imgs/profile-light.png)
*Main Page Dark Mode*

![Profile LIGHT Page](imgs/profile.png)
*Profile Page*

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes. Make sure to follow the project's coding standards and include appropriate tests.


## Acknowledgements

- [React](https://reactjs.org/)
- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [JWT](https://jwt.io/)
- [Socket.io](https://socket.io/)
