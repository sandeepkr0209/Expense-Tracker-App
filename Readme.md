# Expense Tracker Application

A full-stack MERN application designed to help users manage their personal finances by tracking their income and expenses. The application features user authentication to ensure that each user's financial data is private and secure.

## ✨ Features

* **User Authentication**: Secure user registration and login system using JSON Web Tokens (JWT).
* **Income Management**: Users can add, view, update, and delete their income records.
* **Expense Management**: Users can add, view, update, and delete their expense records.
* **Protected Routes**: User-specific data (income and expenses) is protected and can only be accessed by the logged-in user.
* **RESTful API**: A well-structured backend API built with Node.js and Express.js.

## 🛠️ Technologies Used

* **Backend**: Node.js, Express.js
* **Database**: MongoDB (with Mongoose)
* **Authentication**: JSON Web Tokens (JWT), bcrypt.js
* **Frontend**: React.js
* **Environment Variables**: dotenv
* **CORS**: cors

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need to have Node.js and npm (or yarn) installed on your machine. You will also need a MongoDB database instance (either local or from a cloud provider like MongoDB Atlas).

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/your-repository-name.git](https://github.com/your-username/your-repository-name.git)
    cd your-repository-name
    ```

2.  **Install Backend Dependencies:**
    Navigate to the `backend` directory and install the required packages.
    ```bash
    cd backend
    npm install
    ```

3.  **Install Frontend Dependencies:**
    Navigate to the `frontend` directory and install the required packages.
    ```bash
    cd ../frontend
    npm install
    ```

4.  **Set Up Environment Variables:**
    In the `backend` directory, create a file named `.env`. This file will store your secret keys and database connection string. Add the following variables:

    ```env
    # Server Port
    PORT=5000

    # MongoDB Connection URI
    MONGODB_URI=your_mongodb_connection_string

    # JWT Secret Key for Token Generation
    JWT_SECRET=your_super_secret_key_for_jwt
    ```
    > **Note:** Create a `.env.example` file with the same keys but without the values to guide other developers.

5.  **Run the Application:**
    * **Start the Backend Server**: From the `backend` directory, run:
        ```bash
        npm start
        ```
        The server will start on the port defined in your `.env` file (e.g., http://localhost:5000).

    * **Start the Frontend Development Server**: From the `frontend` directory, run:
        ```bash
        npm start
        ```
        The React application will open in your browser (usually at http://localhost:3000).

## API Endpoints

All endpoints are prefixed with `/api/user`.

### User Authentication

| Method | Endpoint    | Description             | Access |
| :----- | :---------- | :---------------------- | :----- |
| `POST` | `/register` | Register a new user.    | Public |
| `POST` | `/login`    | Log in an existing user. | Public |

### Income Routes

| Method   | Endpoint             | Description                  | Access  |
| :------- | :------------------- | :--------------------------- | :------ |
| `POST`   | `/add-income`        | Add a new income record.     | Private |
| `GET`    | `/get-income`        | Get all income for the user. | Private |
| `PUT`    | `/update-income/:id` | Update an income record.     | Private |
| `DELETE` | `/delete-income/:id` | Delete an income record.     | Private |

### Expense Routes

| Method   | Endpoint              | Description                   | Access  |
| :------- | :-------------------- | :---------------------------- | :------ |
| `POST`   | `/add-expense`        | Add a new expense record.     | Private |
| `GET`    | `/get-expense`        | Get all expenses for the user.| Private |
| `PUT`    | `/update-expense/:id` | Update an expense record.     | Private |
| `DELETE` | `/delete-expense/:id` | Delete an expense record.     | Private |

> **Note**: `Private` routes require a valid JWT to be sent in the `Authorization` header as a Bearer token.
