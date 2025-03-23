Task Management App
A full-stack task management application with user authentication, CRUD operations, and modern frontend state management.
Tech Stack
Backend

FastAPI: Modern, high-performance web framework
PostgreSQL/SQLite: Database
SQLAlchemy: ORM for database operations
JWT Authentication: Secure user authentication
Swagger/OpenAPI: API documentation

Frontend

React: UI library
Vite: Build tool
TanStack Query: Data fetching and state management
TanStack Router: Client-side routing
Tailwind CSS: Utility-first styling
shadcn/ui: UI component library
Zustand: Lightweight state management

Features

User Authentication

Signup, Login, and Logout
JWT-based authentication
Protected routes


Task Management

Create, read, update, and delete tasks
Filter tasks by status (Pending, In Progress, Completed)
Task details include title, description, status, and due date
User-specific tasks (users can only manage their own tasks)


Modern Frontend Architecture

TanStack Query for API state management with caching and optimistic updates
TanStack Router for type-safe routing
Responsive design with Tailwind CSS



Getting Started
Prerequisites

Node.js (v16+)
Python (v3.8+)
Docker and Docker Compose (optional)

Local Development Setup
Backend Setup

Navigate to the backend directory:
bashCopycd backend

Create and activate a virtual environment:
bashCopypython -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

Install dependencies:
bashCopypip install -r requirements.txt

Set up environment variables:
bashCopycp .env.example .env
# Edit .env with your configuration

Run database migrations:
bashCopyalembic upgrade head

Start the FastAPI server:
bashCopyuvicorn app.main:app --reload


The API will be available at http://localhost:8000 and the Swagger documentation at http://localhost:8000/docs.
Frontend Setup

Navigate to the frontend directory:
bashCopycd frontend

Install dependencies:
bashCopynpm install

Set up environment variables:
bashCopycp .env.example .env.local
# Edit .env.local with your configuration

Start the development server:
bashCopynpm run dev


The application will be available at http://localhost:5173.
Docker Setup

Build and start the containers:
bashCopydocker-compose up -d

Access the application:

Frontend: http://localhost:5173
Backend API: http://localhost:8000




Project Structure
Copytask-management-app/
├── backend/
│   ├── alembic/             # Database migrations
│   ├── app/
│   │   ├── api/             # API endpoints
│   │   ├── core/            # Core functionality (config, security)
│   │   ├── db/              # Database models and session
│   │   ├── schemas/         # Pydantic models
│   │   └── main.py          # Application entry point
│   ├── tests/               # Backend tests
│   ├── .env.example         # Example environment variables
│   ├── Dockerfile           # Backend Dockerfile
│   └── requirements.txt     # Python dependencies
├── frontend/
│   ├── public/              # Static assets
│   ├── src/
│   │   ├── assets/          # Frontend assets
│   │   ├── components/      # React components
│   │   ├── hooks/           # Custom hooks
│   │   ├── lib/             # Utility functions
│   │   ├── pages/           # Page components
│   │   ├── routes/          # TanStack Router configuration
│   │   ├── services/        # API service functions
│   │   ├── store/           # Zustand store
│   │   ├── App.tsx          # Main component
│   │   └── main.tsx         # Entry point
│   ├── .env.example         # Example environment variables
│   ├── Dockerfile           # Frontend Dockerfile
│   ├── package.json         # Node.js dependencies
│   ├── tailwind.config.js   # Tailwind CSS configuration
│   └── vite.config.ts       # Vite configuration
├── docker-compose.yml       # Docker Compose configuration
└── README.md                # Project documentation
API Endpoints
Authentication

POST /api/auth/signup - Register a new user
POST /api/auth/login - Log in and get JWT token
POST /api/auth/logout - Log out (invalidate token)

Tasks

GET /api/tasks - Get all tasks for the authenticated user
GET /api/tasks/{task_id} - Get a specific task
POST /api/tasks - Create a new task
PUT /api/tasks/{task_id} - Update a task
DELETE /api/tasks/{task_id} - Delete a task

Deployment
Backend
The backend can be deployed to any platform that supports Docker containers or Python applications, such as:

AWS (EC2, ECS, or Lambda)
Google Cloud Run
Heroku
Railway

Frontend
The frontend can be deployed to:

Vercel
Netlify
GitHub Pages
AWS Amplify

Contributing

Fork the repository
Create a feature branch (git checkout -b feature/amazing-feature)
Commit your changes (git commit -m 'Add some amazing feature')
Push to the branch (git push origin feature/amazing-feature)
Open a Pull Request

License
This project is licensed under the MIT License - see the LICENSE file for details