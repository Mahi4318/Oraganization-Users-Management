# InterviewBuddy Full Stack Application

A comprehensive full-stack web application for managing organizations and users, designed to streamline interview coordination and management processes.

## 🚀 Main Functionality

InterviewBuddy is a robust organization and user management system that provides:

- **Organization Management**: Create, read, update, and delete organizations with comprehensive details
- **User Management**: Manage users within organizations with role-based access
- **Status Tracking**: Monitor organization status (Active, Blocked, Inactive)
- **Admin Dashboard**: Centralized interface for managing all organizational data
- **Support System**: Integrated support functionality for assistance and inquiries

## 🛠️ Technologies Used

### Backend
- **FastAPI**: Modern, fast web framework for building APIs with Python
- **SQLAlchemy**: Powerful SQL toolkit and Object-Relational Mapping (ORM) library
- **PyMySQL**: Pure Python MySQL client library
- **Pydantic**: Data validation using Python type annotations
- **Uvicorn**: ASGI server implementation for running FastAPI applications
- **Python-dotenv**: Environment variable management

### Frontend
- **React 18**: Modern JavaScript library for building user interfaces
- **TypeScript**: Typed superset of JavaScript for enhanced development experience
- **Vite**: Fast build tool and development server
- **React Router DOM**: Declarative routing for React applications
- **React Query**: Powerful data fetching and state management library
- **React Hook Form**: Performant, flexible, and extensible forms library
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **shadcn/ui**: Beautifully designed components built with Radix UI and Tailwind CSS
- **Lucide React**: Consistent icon library for React applications

### Database
- **MySQL**: Relational database management system
- **UUID**: Unique identifiers for primary keys ensuring global uniqueness

## 📁 Project Structure

```
InterviewBuddyFullStack/
├── backend/                    # FastAPI backend application
│   ├── main.py                # Main FastAPI application entry point
│   ├── models.py              # SQLAlchemy database models
│   ├── requirements.txt       # Python dependencies
│   ├── controllers/           # Business logic and CRUD operations
│   │   └── crud.py
│   ├── database/              # Database configuration and setup
│   │   ├── database.py
│   │   └── create_tables.py
│   ├── routers/               # API route definitions
│   │   ├── organisations.py
│   │   └── users.py
│   └── schemas/               # Pydantic data validation schemas
│       └── schemas.py
├── frontend/                  # React frontend application
│   ├── src/
│   │   ├── components/        # Reusable React components
│   │   │   ├── ui/            # shadcn/ui components
│   │   │   └── Layout.tsx     # Main layout component
│   │   ├── pages/             # Page components
│   │   │   ├── Dashboard.tsx
│   │   │   ├── Organizations.tsx
│   │   │   ├── OrganizationDetails.tsx
│   │   │   ├── Support.tsx
│   │   │   └── NotFound.tsx
│   │   ├── hooks/             # Custom React hooks
│   │   ├── lib/               # Utility functions and configurations
│   │   ├── App.tsx            # Main App component with routing
│   │   └── main.tsx           # Application entry point
│   ├── package.json           # Node.js dependencies and scripts
│   ├── vite.config.ts         # Vite configuration
│   ├── tailwind.config.ts     # Tailwind CSS configuration
│   └── tsconfig.json          # TypeScript configuration
└── README.md                  # This file
```

## 🏗️ Database Schema

### Organisation Model
- **org_id**: UUID primary key
- **org_name**: Unique organization name
- **org_mail**: Organization email
- **org_contact**: Contact information
- **org_slug**: Unique URL-friendly identifier
- **status**: Organization status (Active, Blocked, Inactive)
- **pending_requests**: Count of pending requests
- **primary_admin_name/email**: Primary administrator details
- **support_email**: Support contact email
- **phone/alt_phone**: Contact phone numbers
- **max_coordinators**: Maximum allowed coordinators
- **timezone**: Timezone settings
- **language**: Default language
- **website_url**: Organization website
- **created_date/updated_date**: Timestamps

### User Model
- **user_id**: UUID primary key
- **user_name**: User's name
- **user_role**: User's role within the organization
- **org_id**: Foreign key referencing the organization
- **created_date/updated_date**: Timestamps

## 🚀 Getting Started

### Prerequisites
- Python 3.8+
- Node.js 16+
- MySQL database

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Set up your database connection in the environment variables

4. Run database migrations:
   ```bash
   python database/create_tables.py
   ```

5. Start the FastAPI server:
   ```bash
   uvicorn main:app --reload
   ```

The backend API will be available at `http://localhost:8000`

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install Node.js dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The frontend application will be available at `http://localhost:5173`

## 📚 API Endpoints

### Organizations
- `GET /` - Get all organizations
- `POST /organisations/` - Create a new organization
- `GET /organisations/{org_id}` - Get organization by ID
- `PUT /organisations/{org_id}` - Update organization
- `PUT /organisations/{org_id}/status` - Update organization status
- `DELETE /organisations/{org_id}` - Delete organization

### Users (within organizations)
- `POST /organisations/{org_id}/users` - Create user for organization
- `PUT /organisations/{org_id}/users/{user_id}` - Update user
- `DELETE /organisations/{org_id}/users/{user_id}` - Delete user

## 🎯 Key Features

- **Modern Architecture**: Clean separation of concerns with RESTful API design
- **Type Safety**: Full TypeScript support across frontend and backend
- **Responsive Design**: Mobile-friendly interface using Tailwind CSS
- **Data Validation**: Comprehensive input validation using Pydantic schemas
- **Error Handling**: Robust error handling and user feedback
- **Scalable Design**: Modular architecture for easy scaling and maintenance
- **Real-time Updates**: React Query for efficient data synchronization

## 🔧 Development

### Running Tests
- Backend tests can be run from the backend directory
- Frontend tests can be run using npm test

### Code Quality
- ESLint for JavaScript/TypeScript linting
- Prettier for code formatting
- TypeScript for static type checking
