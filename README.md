# Expense Tracker

Expense Tracker is a modern, responsive web application built with React and Node.js that helps users manage their daily expenses and income. It provides a clean interface to track financial transactions, view summaries, and maintain a budget.

## Features

- **Expense & Income Tracking**: Easily add, edit, and delete transactions with detailed information.
- **Responsive Design**: Built with Tailwind CSS for a seamless experience across desktop and mobile devices.
- **User Authentication**: Secure login and registration system.
- **Transaction History**: View all transactions with filtering and sorting capabilities.
- **Dashboard**: Visual overview of total expenses, income, and remaining balance.
- **Category Management**: Organize transactions by custom categories.

## Tech Stack

### Frontend
- **React**: UI library for building the user interface.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Vite**: Fast build tool and development server.

### Backend
- **Node.js**: JavaScript runtime for the server.
- **Express.js**: Web framework for building the API.
- **MongoDB**: NoSQL database for storing user data and transactions.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB.

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/) (local or cloud instance)

### Installation

1.  **Clone the repository**
    ```bash
    git clone <repository-url>
    cd ExpenseTracker
    ```

2.  **Backend Setup**
    ```bash
    cd backend
    npm install
    ```
    Create a `.env` file in the `backend` directory with the following variables:
    ```env
    PORT=5000
    MONGODB_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    ```

3.  **Frontend Setup**
    ```bash
    cd frontend
    npm install
    ```
    Create a `.env` file in the `frontend` directory with the following variable:
    ```env
    VITE_API_URL=http://localhost:5000
    ```

### Running the Application

1.  **Start the backend server**
    ```bash
    cd backend
    npm start
    ```

2.  **Start the frontend development server**
    ```bash
    cd frontend
    npm run dev
    ```

The application will be accessible at `http://localhost:5173`.

## Usage

1.  **Register** a new account on the login page.
2.  **Login** with your credentials.
3.  Use the **Dashboard** to view your financial summary.
4.  Navigate to **Transactions** to add, edit, or delete expenses and income.
5.  Manage your **Categories** to organize your spending.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.