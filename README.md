# Full-Stack Expense Tracker Application

This is a full-stack expense tracker application designed to help users manage their personal finances effectively. It features a modern, microservices-oriented architecture with a Next.js frontend, a Node.js/Express core backend, and a Python/FastAPI service for data analysis.

## Features

*   **User Authentication:** Secure user registration and login system using JWT.
*   **Expense Management (CRUD):** Users can add, view, update, and delete their expenses.
*   **Budgeting:** Set, view, update, and delete monthly spending limits for various categories.
*   **Interactive Dashboard:** A comprehensive dashboard provides a quick overview of key financial metrics like total monthly spending, top spending categories, and spending trends.
*   **Intelligent Suggestions:** An analysis microservice provides personalized financial advice by identifying high-spending categories, trend increases, and unusual spending spikes.
*   **Dynamic Data Tables:** Expenses and budgets are displayed in sortable, filterable, and paginated tables for easy management.

## Technology Stack

| Service             | Framework/Library                                                              | Language   | Database/Storage |
| ------------------- | ------------------------------------------------------------------------------ | ---------- | ---------------- |
| **Frontend**        | Next.js, React, Tailwind CSS, shadcn/ui, Tanstack Table                        | TypeScript | -                |
| **Backend (Core)**  | Node.js, Express.js, Mongoose                                                  | JavaScript | MongoDB          |
| **Backend (Analysis)** | FastAPI, Pandas                                                                | Python     | -                |

## Architecture Overview

1.  The **Frontend (Next.js)** is the user's entry point. It communicates with the **Node.js Backend** for all primary operations like authentication, expense management, and budgeting.
2.  Authentication is handled using JSON Web Tokens (JWT) stored in secure, `httpOnly` cookies.
3.  For financial suggestions, the **Frontend** first fetches recent expense data from the **Node.js Backend**.
4.  It then sends this data to the **FastAPI Analysis Service**, which processes it using Pandas and returns a list of personalized suggestions.

---

## Project Setup and Running Instructions

Follow these steps to get the full application running on your local machine.

#### **1. Prerequisites**

Make sure you have the following software installed on your system:

*   **Node.js:** Version 22 or higher.
*   **Python:** Version 3.11 or higher.
*   **MongoDB:** A local installation is recommended, but you can also use a cloud-based service like MongoDB Atlas.

---

#### **2. Backend (Node.js) Setup**

1.  Navigate to the `backend` directory:
    ```bash
    cd backend
    ```
2.  Create a `.env` file by copying the example:
    ```bash
    # For Windows
    copy .env.example .env

    # For macOS/Linux
    cp .env.example .env
    ```
3.  Fill in the required environment variables (like your `MONGO_URI` and `JWT_SECRET`) in the new `.env` file.
4.  Install the necessary packages:
    ```bash
    npm install
    ```

---

#### **3. Frontend (Next.js) Setup**

1.  Navigate to the `frontend` directory:
    ```bash
    cd frontend
    ```
2.  Create a `.env` file by copying the example:
    ```bash
    # For Windows
    copy .env.example .env

    # For macOS/Linux
    cp .env.example .env
    ```
3.  Update the API URLs in the new `.env` file if your services are not running on the default ports.
4.  Install the necessary packages:
    ```bash
    npm install
    ```

---

#### **4. Analysis Service (FastAPI) Setup**

1.  Navigate to the `FastAPI` directory:
    ```bash
    cd FastAPI
    ```
2.  Create a Python virtual environment:
    ```bash
    python -m venv venv
    ```
3.  Activate the virtual environment:
    ```bash
    # For Windows
    .\venv\Scripts\activate

    # For macOS/Linux
    source venv/bin/activate
    ```
4.  Install the required Python packages:
    ```bash
    pip install -r requirements.txt
    ```

---

#### **5. Running the Application**

You need to run all three services simultaneously in separate terminal windows.

1.  **Start the Backend:**
    *   Go to the `backend` directory.
    *   Run the command: `npm run dev`

2.  **Start the Frontend:**
    *   Go to the `frontend` directory.
    *   Run the command: `npm run dev`

3.  **Start the Analysis Service:**
    *   Go to the `FastAPI` directory.
    *   Make sure your virtual environment is activated.
    *   Run the command: `python main.py`

Once all three services are running, you can access the application in your browser at `http://localhost:3000`.

---

## API Endpoints

### Backend API (Node.js / Express)

Base URL: `http://localhost:8080`

#### Authentication (`/auth`)
*   `POST /signup`: Register a new user.
*   `POST /login`: Log in a user and return a JWT.
*   `POST /verify-auth`: Verify the validity of a JWT (used by frontend middleware).

#### Expenses (`/expenses`)
*   `POST /`: Add a new expense.
*   `GET /`: Retrieve all expenses for the user (supports query params for filtering).
*   `PUT /:id`: Update a specific expense.
*   `DELETE /:id`: Delete a specific expense.
*   `GET /current-month`: Get all expenses from the current calendar month.

#### Budgets (`/budgets`)
*   `POST /`: Create a new monthly budget.
*   `GET /`: Retrieve all budgets for the user.
*   `PUT /:id`: Update a specific budget.
*   `DELETE /:id`: Delete a specific budget.

#### Dashboard (`/dashboard`)
*   `GET /monthly-total`: Get the sum of all expenses in the current month.
*   `GET /top-spending-category`: Get the category with the highest spending in the current month.
*   `GET /top-payment-methods`: Get the top 3 most used payment methods.
*   `GET /category-spending`: Get a breakdown of spending by category for the current month.
*   `GET /spending-trend`: Get daily spending data for a line chart.

### Analysis API (Python / FastAPI)

Base URL: `http://localhost:8000`

#### Suggestions (`/suggestions`)
*   `POST /`: Analyzes a provided list of user expenses and returns a list of personalized financial suggestions.
    *   **Request Body**: A JSON object with an `expenses` key containing an array of expense objects.
    *   **Response**: A JSON object with a `suggestions` key containing an array of suggestion strings.
