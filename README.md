# InterviewBuddy - B2B Organization Management Platform

A full-stack web application for managing B2B organizations with user management, support system, and comprehensive admin features.

## 🚀 Features

### Core Functionality
- **Organization Management**: Create, read, update, and delete organizations
- **User Management**: Add, edit, and remove users within organizations
- **Status Management**: Change organization status (Active, Blocked, Inactive)
- **Support System**: Complete support ticket system with priority levels
- **Real-time Updates**: All changes are instantly reflected in the database

### Frontend Features
- **Modern UI**: Built with React, TypeScript, and Tailwind CSS
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Interactive Components**: Rich UI components with smooth animations
- **Edit Functionality**: In-place editing with save/cancel options
- **Navigation**: Clean navbar with support for multiple pages

### Backend Features
- **FastAPI**: High-performance async REST API
- **MySQL Database**: Robust data persistence with proper relationships
- **CRUD Operations**: Complete Create, Read, Update, Delete functionality
- **Data Validation**: Input validation and error handling
- **CORS Support**: Cross-origin resource sharing enabled

## 🛠️ Tech Stack

### Frontend
- **React 18.3.1**: Modern UI framework with hooks
- **TypeScript**: Type-safe JavaScript development
- **Tailwind CSS**: Utility-first CSS framework
- **Shadcn/ui**: High-quality component library
- **Lucide React**: Beautiful icon library
- **React Router**: Client-side routing
- **React Query**: Server state management and caching

### Backend
- **FastAPI**: Modern, fast web framework for building APIs
- **SQLAlchemy**: Powerful ORM for database operations
- **MySQL**: Relational database management
- **Pydantic**: Data validation using Python type annotations
- **Uvicorn**: ASGI server for production deployment

### Development Tools
- **Vite**: Fast build tool and development server
- **ESLint**: Code linting and formatting
- **Git**: Version control system

## 📁 Project Structure

```
InterviewBuddyFullStack/
├── backend/                    # FastAPI backend
│   ├── routers/              # API route definitions
│   ├── models.py              # Database models (SQLAlchemy)
│   ├── crud.py                # CRUD operations
│   ├── schemas.py              # Pydantic models
│   ├── database.py            # Database configuration
│   ├── main.py                # Application entry point
│   └── requirements.txt       # Python dependencies
├── frontend/                  # React frontend
│   └── pixel-perfect-realized-main/
│       ├── src/
│       │   ├── components/     # Reusable UI components
│       │   ├── pages/         # Page components
│       │   └── main.tsx       # App entry point
│       ├── public/              # Static assets
│       ├── package.json        # Node.js dependencies
│       └── vite.config.ts      # Vite configuration
└── README.md                  # This file
```

## 🗄️ Database Schema

### Organisation Table
- `org_id`: Primary key (UUID)
- `org_name`: Organization name (unique, required)
- `org_mail`: Organization email
- `org_contact`: Contact phone number
- `org_slug`: URL-friendly identifier (unique)
- `status`: Organization status (Active/Blocked/Inactive)
- `pending_requests`: Number of pending requests
- `primary_admin_name`: Primary administrator name
- `primary_admin_mail`: Primary administrator email
- `support_email`: Support contact email
- `phone`: Primary phone number
- `alt_phone`: Alternative phone number
- `max_coordinators`: Maximum allowed coordinators
- `timezone_common`: Timezone common name
- `timezone_region`: Timezone region
- `language`: Organization language
- `website_url`: Official website URL
- `created_date`: Record creation timestamp
- `updated_date`: Last update timestamp

### User Table
- `user_id`: Primary key (UUID)
- `user_name`: User full name
- `user_role`: User role (Admin/Coordinator)
- `org_id`: Foreign key to organisation
- `created_date`: Account creation timestamp
- `updated_date`: Last update timestamp

## 🚀 Getting Started

### Prerequisites
- **Node.js 18+**: Frontend runtime
- **Python 3.8+**: Backend runtime
- **MySQL 8.0+**: Database server
- **Git**: Version control

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd InterviewBuddyFullStack
   ```

2. **Set up the backend**
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your database credentials
   ```

4. **Create database tables**
   ```bash
   python create_tables.py
   ```

5. **Start the backend server**
   ```bash
   python main.py
   ```

6. **Set up the frontend**
   ```bash
   cd frontend/pixel-perfect-realized-main
   npm install
   ```

7. **Start the frontend development server**
   ```bash
   npm run dev
   ```

### Access Points
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs

## 📚 API Endpoints

### Organizations
- `GET /organisations` - List all organizations
- `POST /organisations` - Create new organization
- `GET /organisations/{id}` - Get organization by ID
- `PUT /organisations/{id}` - Update organization
- `DELETE /organisations/{id}` - Delete organization
- `PUT /organisations/{id}/status` - Change organization status

### Users
- `POST /organisations/{id}/users` - Add user to organization
- `PUT /organisations/{id}/users/{user_id}` - Update user
- `DELETE /organisations/{id}/users/{user_id}` - Delete user

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the backend directory with:

```env
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_HOST=localhost
DB_PORT=3306
DB_NAME=org_user_db
```

### Database Setup
1. Install MySQL Server
2. Create database: `CREATE DATABASE org_user_db;`
3. Run table creation script
4. Verify tables are created successfully

## 🎨 UI Features

### Navigation
- **Logo**: Company branding in the header
- **Support**: Access to support system with headphones icon
- **Notifications**: Notification center with bell icon
- **Profile**: User profile management
- **Dashboard**: Main dashboard view
- **Organizations**: Organization management interface

### Organization Management
- **List View**: Table view of all organizations
- **Details View**: Comprehensive organization information
- **Edit Mode**: In-place editing with save/cancel
- **Status Management**: Quick status changes
- **User Management**: Add/edit/remove users per organization

### Support System
- **Ticket Submission**: Create support tickets with priority levels
- **FAQ Section**: Common questions and answers
- **Contact Methods**: Multiple support channels
- **Response Tracking**: Expected response times by priority

## 🔒 Security Features

- **Input Validation**: All user inputs are validated
- **SQL Injection Protection**: Parameterized queries
- **CORS Configuration**: Secure cross-origin requests
- **Environment Variables**: Sensitive data in environment files
- **Type Safety**: TypeScript and Pydantic for type safety

## 🚀 Deployment

### Production Deployment

1. **Backend Deployment**
   ```bash
   cd backend
   pip install gunicorn
   gunicorn -w 4 -k uvicorn.workers.UvicornWorker main:app
   ```

2. **Frontend Deployment**
   ```bash
   cd frontend/pixel-perfect-realized-main
   npm run build
   # Deploy the dist/ folder to your web server
   ```

### Environment Configuration
- **Development**: Local development with hot reload
- **Staging**: Pre-production testing environment
- **Production**: Optimized build for production

## 📝 Development Workflow

### Code Quality
- **ESLint**: Consistent code formatting
- **TypeScript**: Type-safe development
- **Pylint**: Python code quality checks
- **Pre-commit**: Automated code quality gates

### Testing Strategy
- **Unit Tests**: Component and function testing
- **Integration Tests**: API endpoint testing
- **E2E Tests**: End-to-end user workflows
- **Database Tests**: Data integrity validation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙋 Support

For support and questions:
- Create an issue in the GitHub repository
- Use the in-app support system
- Email: support@interviewbuddy.com

---

**Built with ❤️ using modern web technologies**
#   O r a g a n i z a t i o n - U s e r s - M a n a g e m e n t  
 