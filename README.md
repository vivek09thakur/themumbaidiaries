# Mumbaidaires

An ananomous social media platform for Mumbaidaires.

## Project Structure

The project consists of two main parts:

- **Client**: React + Vite frontend application
- **Server**: Django backend application

## Features

- User authentication (Login/Signup)
- User profile management
- CORS enabled for secure cross-origin requests
- REST API endpoints

## Tech Stack

### Frontend

- React
- Vite
- ESLint
- HMR (Hot Module Replacement)

### Backend

- Django 5.1
- Django CORS Headers
- SQLite Database

## Getting Started

### Backend Setup

1. Navigate to the server directory:

```bash
cd server
```

2. Create a virtual environment and activate it:

```bash
  python -m venv venv
  source venv/bin/activate
```

3. Install dependencies:

```bash
pip install -r requirements.txt
```

4. Run migrations:

```bash
python manage.py migrate
```

5. Run the server:

```bash
python manage.py runserver
```
