# Blog Platform Backend

This is a CRUD web application for a blogging platform that incorporates database relationships
using Sequelize and implements user authentication and authorization. The application allows users
to register, login, create, read, update, and delete posts and comments.

## Table of Contents

-   [Installation](#installation)
-   [Usage](#usage)
-   [Database Tables and Relationships](#database-tables-and-relationships)
-   [User Authentication and Authorization](#user-authentication-and-authorization)
-   [CRUD Operations for Posts](#crud-operations-for-posts)
-   [CRUD Operations for Comments](#crud-operations-for-comments)
-   [Testing](#testing)

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/PatrickLisiecki/blog-platform-backend
    ```

2. Open the repository in an IDE of your choice.

3. Run `npm install` in the terminal to install the necessary dependencies.

4. Create a PostgreSQL database for your project.

5. Create a `.env` file in the root project directory and populate it with the following
   information:

    ```env
    DB_USER=<your_username>
    DB_HOST=<hostname_of_database>
    DB_NAME=<database_name>
    DB_PASSWORD=<your_password>
    DB_PORT=<database_port>
    SESSION_SECRET=<randomly_generated_seed>
    ```

6. Run the migrations in the terminal once the database connection is established:

    ```bash
    npx sequelize-cli db:migrate
    ```

7. (Optional) Populate the database with some mock data by running the seed file in the terminal:

    ```bash
    npx sequelize-cli db:seed:all
    ```

## Usage

1. Once the database connection is established and the tables are created, run the server with
   ```npm start```.

2. Once the server is up and running, you can use any API testing tool like Postman to test the API
   endpoints.

## Database Tables and Relationships

This is an explanation of the tables and relationships included in the project.

1. The following tables with their respective columns and relationships:

    - **Users**: Represents the users of the blogging platform. Each user can have multiple posts
      and comments. Users have an id, name, and password.
    - **Posts**: Represents the blog posts created by the users. Each post can have multiple
      comments. Each post has an id, title, content, and a UserId (foreign key).
    - **Comments**: Represents the comments made on the blog posts. Each comment belongs to a user
      and a post. Each comment has an id, content, PostId (foreign key), and a UserId (foreign key).

2. Relationships between the tables:
    - One-to-Many: A User can have multiple Posts and Comments.
    - One-to-Many: A Post can have multiple Comments.
    - Many-to-One: A Comment belongs to a User and a Post.

Make sure to test the relationships by creating sample data and performing queries to retrieve
associated records.

## User Authentication and Authorization

The application includes user registration and login functionality with secure password storage.

1. The bcryptjs package is used to hash and salt passwords for secure storage.
2. To protect routes that require authentication, the application uses middleware that checks for a
   valid session cookie.
3. You can test the user registration and login endpoints using Postman or any other API testing
   tool. Make sure that only authenticated users can access the protected routes.

## CRUD Operations for Posts

The application allows CRUD operations for the Posts resource. Only authenticated users can perform
CRUD operations on Posts. Unauthenticated users should receive an error or be redirected.

1. API endpoints to handle the following operations:
    - Create a new Post.
    - Retrieve all Posts.
    - Retrieve a specific Post by ID.
    - Update a Post.
    - Delete a Post.

2. Test the CRUD operations using Postman. Create sample posts, retrieve and update them, and
    finally delete them to ensure everything works as expected.

## CRUD Operations for Comments

The application also supports CRUD operations for the Comments resource. Only authenticated users
can perform CRUD operations on Comments. Unauthenticated users should receive an error or be
redirected.

1. API endpoints to handle the following operations:
    - Create a new Comment for a specific post.
    - Retrieve all Comments for a specific Post.
    - Retrieve a specific Comment by ID.
    - Update a Comment.
    - Delete a Comment.

2. Test the CRUD operations using Postman. Create comments, retrieve and update them, and finally
   delete them to ensure the functionality is working correctly.

## Testing

Use Postman or a similar tool to perform various tests, including creating complex queries, testing
edge cases, and ensuring data integrity.

Make sure to simulate different scenarios and validate the expected behavior of the application.
