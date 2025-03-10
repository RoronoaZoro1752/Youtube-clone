
# YouTube Clone - Full Stack Application

## Overview
This is a full-stack YouTube Clone built using MERN stack (MongoDB, Express.js, React.js, Node.js). It allows users to upload, view, and manage videos. The application features user authentication, video uploads, and a comment system, providing a simple and clean video streaming experience.

## Features
- **User Authentication**: Allows users to register, login, and logout securely using JWT (JSON Web Token).

- **Video Management**: Users can upload videos with a title, description, and thumbnail, and view videos uploaded by other users.

- **Comment System**: Enables users to add comments on videos and view all comments related to a particular video.

- **UI Design**: Provides a simple and clean user interface built with Tailwind CSS.

- **Video Listing Page**: Displays a collection of uploaded videos, allowing users to browse and watch content.


## Technologies Used
- **Frontend**: React.js, TailwindCSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JSON Web Token (JWT)

## Setup Instructions
To set up the project locally, follow these steps:

1. Clone this repository.

2. Navigate to the frontend directory.

3. Install dependencies with the below command.
```
npm install
```
4. Navigate back to the main directory and navigate to the backend directory.

5. Install dependencies with the below command.
```
npm install
```
6. Setup Environment Variables: Create a .env file in the backend directory and add the following:
```
MONGODB=<your-mongodb-connection-string>
```
7. Run your backend application with the following command.
```
node index.js
```

8. Run your frontend application with the following command.
```
npm run dev
```

9. Well done;) The setup is complete.
