# Login-Flow

The Login Flow is a simple authentication application built using NestJS and MongoDB. It allows users to register an account, log in and log out of the application.

## Table of Contents

- [Login-Flow](#login-flow)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Getting Started](#getting-started)
  - [Database Setup](#database-setup)
  - [Installation](#installation)
  - [Built With](#built-with)

## Features

- User registration: Users can create an account by providing their name, phone number, and password.
- User authentication: Users can log in to the application using their phone number and password.
- User authorization: Authenticated users can access protected routes such as the get, update, and delete apis.
- User logout: Authenticated users can log out of the application.

## Getting Started

To get started with the project, follow these steps:

    Clone the repository to your local machine.
    Install the dependencies using npm install.
    Set up a Mongo database.
    Start the backend server using npm run start:dev.
    Use http://localhost:3000 in your send request tool.

## Database Setup

1. Create a new Mongo database named `login_app`.

`use login_app`

```
db.createUser({
  user: 'admin',
  pwd: 'admin',
  roles: [{role: "readWrite", db: "login_app"}]
})

```

## Installation

1. Clone the repository to your local machine.
2. Navigate to the project directory and run `npm install` or `yarn` to install dependencies.
3. Start the API in dev mode with `npm run start:dev` or `yarn start:dev`.

## Built With

- [Node.js](https://nodejs.org) - JavaScript Runtime
- [Nest](https://nestjs.com/) - JavaScript API Framework
- [MongoDB](https://www.mongodb.com/) - Open Source Non Relational Database
