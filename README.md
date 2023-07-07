# Reading Recommendation System

The Reading Recommendation System is an API that provides reading interval submission functionality and recommends top-rated books based on the number of unique pages read by users. It allows users to track their reading progress and discover new books based on popular reading trends.

## Table of Contents

- [Features](#features)
- [System Overview](#system-overview)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Specification](#api-specification)
- [Authentication and Authorization](#authentication-and-authorization)
- [Error Handling](#error-handling)
- [Contributing](#contributing)

## Features

- Submit reading intervals for specific books
- Retrieve the top recommended books based on the number of unique pages read
- Role-based authorization to restrict access to certain endpoints
- User authentication and authorization using JWT (JSON Web Tokens)
- Logging and exception handling for improved error reporting and debugging

## System Overview

The Reading Recommendation System API provides two main operations:

1. Allow users to submit an interval of starting and ending pages that they read for a specific book. Note that the user can submit multiple intervals for the same book.
2. Show the top recommended books in the system, picked based on how many unique pages have been read for all the users that submitted their intervals. The books are sorted by the number of read pages in descending order.

## Technologies Used

- NestJS (Node.js framework)
- PostgreSQL (Relational database)
- TypeORM (Object-Relational Mapping)
- JWT (JSON Web Tokens) for authentication and authorization
- GitFlow for version control

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   ```

Alternatively, you can download the source code as a ZIP file and extract it.

- cd reading-recommendation-system
- Install the dependencies:
 ```bash
   npm install
 ```
- Configure the database connection:
- Open the congig/ormconfig.developmnet.json file and update the PostgreSQL connection details.
- Start the API server:
 ```bash
  npm run start:dev
 ```
The API server will start running at http://localhost:3000.

## Usage
- You can find postman collection in docs/Nestjs project.postman_collection.json in the repositry
- Register a new user by sending a POST request to /auth/signup with the following payload:
 ![sign up](https://github.com/AhmedkamalR/reading-recommendation-system/assets/87860547/f134972f-66d8-418a-8447-4b78d50acf32)

- Login with the registered user credentials by sending a POST request to /auth/signin with the following payload:
  The response will include an access token.
 ![sign in](https://github.com/AhmedkamalR/reading-recommendation-system/assets/87860547/9cf4aaa3-df4d-4527-8e68-9e1ea1bca5af)

- Include the access token in the request header for authenticated endpoints:
  -Authorization: Bearer <access-token>
- Submit a reading interval by sending a POST request to /reading-intervals/submit-interval with the following payload:
![submint intervals](https://github.com/AhmedkamalR/reading-recommendation-system/assets/87860547/91aca421-b030-4577-aa44-37fee6b16229)

- Retrieve the top recommended books by sending a GET request to /reading-intervals/top-books
 -don't forget to include access token

![top books](https://github.com/AhmedkamalR/reading-recommendation-system/assets/87860547/70b869be-24e8-4d08-8e70-5bfcd9161060)

- only admins can Add and modify book
 - to Add book send a POST request to /books with the following payload for Example:
![add book](https://github.com/AhmedkamalR/reading-recommendation-system/assets/87860547/14841288-2e4c-4d43-9f57-4daf6c0f84f6)

 - to modify book send a PUT request to /books/:id with the following payload for Example
![modify book](https://github.com/AhmedkamalR/reading-recommendation-system/assets/87860547/0b705791-9ab9-4da4-a92f-49f9ca390e46)

Refer to the API specification for detailed request and response examples.

## API Specification

The API follows the RESTful principles and provides the following endpoints:

- POST /auth/signup : Register a new user.
- POST /auth/signin : Login with username and password to obtain an access token.
- POST /reading-intervals/submit-interval : Submit a reading interval for a specific book.
- GET /reading-intervals/top-books : Retrieve the top recommended books based on the number of unique pages read.
- POST /books : Add new book
- PUT /books/:id : modify book

## Authentication and Authorization

- Only authenticated users can submit reading intervals.
- The API requires users to provide a valid access token in the request header.
- User authentication is implemented using JWT (JSON Web Tokens).
- Role-based authorization is implemented to restrict access to certain endpoints.
- Only admin users can create and modify books.

## Error Handling

- The API implements logging and exception handling for improved error reporting and debugging.
- Custom error messages and appropriate HTTP status codes are returned for different types of errors.

## Contributing

If you want to contribute to the Reading Recommendation System API, please follow these guidelines:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes and push the branch to your fork.
4. Submit a pull request with a detailed description of your changes.
