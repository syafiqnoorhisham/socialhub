# Social Hub

A social media platform built with Django REST Framework and vanilla JavaScript. Users can create accounts, share posts with images, and interact through comments.

Demo: [https://socialhub-1-nvc4.onrender.com](https://socialhub-1-nvc4.onrender.com)

## Features

- User authentication using JWT tokens
- Create, read, update, and delete posts
- Image upload support for posts
- Comment on posts
- Secure API endpoints with proper permissions

## Tech Stack

### Backend

- Django 5.1
- Django REST Framework
- Simple JWT for authentication
- SQLite database (local)
- PostgreSQL (production)
- Pillow for image handling

### Frontend

- HTML5
- CSS3
- Vanilla JavaScript
- Fetch API for HTTP requests

### Deployment

- Deployed on Render.com
- Automatic deployments from GitHub
- SSL enabled

## Getting Started

### Prerequisites

- Python 3.11+
- pip
- Git

### Local Development Setup

1. Clone the repository:

```bash
git clone https://github.com/syafiqnoorhisham/socialhub.git
cd socialhub
```

2. Backend setup:

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

3. Frontend setup:

```bash
cd frontend
python -m http.server 8080
```

The application will be available at:

- Frontend: http://localhost:8080
- Backend API: http://localhost:8000

## API Endpoints

### Authentication

- POST `/users/register/` - Register new user
- POST `/users/login/` - Login and get JWT token

### Posts

- GET `/api/posts/` - List all posts
- POST `/api/posts/` - Create new post
- GET `/api/posts/{id}/` - Get specific post
- DELETE `/api/posts/{id}/` - Delete post (owner only)

### Comments

- GET `/api/comments/` - List all comments
- POST `/api/comments/` - Create new comment
- DELETE `/api/comments/{id}/` - Delete comment (owner only)

## Project Structure

```
socialhub/
├── backend/
│   ├── config/          # Django project settings
│   ├── users/           # User authentication app
│   ├── posts/           # Posts and comments app
│   ├── media/           # Uploaded files
│   └── requirements.txt
├── frontend/
│   ├── css/
│   ├── js/
│   └── index.html
└── README.md
```

## Live Demo

Visit [https://socialhub-1-nvc4.onrender.com](https://socialhub-1-nvc4.onrender.com) to see the application in action.

To test the application:

1. Register a new account
2. Login with your credentials
3. Create posts with images and captions
4. Comment on posts
5. Try editing and deleting your own content
