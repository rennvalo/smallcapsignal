
# MAGA Signal Website

## Overview

MAGA Signal is a comprehensive web platform that provides real-time alerts and market analysis based on political and economic developments. The website features a modern React frontend with a FastAPI backend, designed to deliver timely information to subscribers through multiple channels.

## Features

### Frontend Features
- **Homepage**: Displays the latest 2 alerts with pagination controls (Previous/Next buttons and page indicators)
- **Individual Post Pages**: Detailed view of each alert with full content and analysis
- **Newsletter Subscription**: Simple email subscription form in the footer
- **Contact Form**: Allows users to send messages directly to administrators
- **Static Pages**: Privacy Policy, Terms of Service, Support, Donations, and Opinion sections
- **Responsive Design**: Fully responsive layout optimized for desktop and mobile devices
- **SEO Optimized**: Proper meta tags and structured content for search engines

### Admin Panel Features
- **Protected Access**: Secure admin panel with API key authentication
- **Subscriber Management**: 
  - View all subscribers with subscription dates
  - Delete subscribers individually
  - Real-time subscriber count display
- **Newsletter System**: 
  - Send newsletters to all subscribers
  - Custom subject and message content
  - Success/error reporting with detailed statistics
- **Post Management**: Create, view, and delete blog posts/alerts

### Backend API Features
- **RESTful API**: FastAPI-based backend with automatic documentation
- **Database Management**: Separate databases for posts and subscribers
- **Email Integration**: SMTP email sending for contact forms and newsletters
- **RSS Feed**: Automatically generated RSS feed for blog posts
- **CORS Support**: Configured for cross-origin requests
- **Static File Serving**: Serves the React frontend as a Single Page Application

## Technologies Used

### Frontend Stack
- **React 18.3.1**: Modern React with hooks and functional components
- **TypeScript**: Type-safe development with full TypeScript support
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework for styling
- **shadcn/ui**: High-quality React component library
- **React Router DOM**: Client-side routing for SPA navigation
- **TanStack React Query**: Data fetching and state management
- **React Hook Form**: Form handling with validation
- **Zod**: Runtime type validation
- **Lucide React**: Modern icon library

### Backend Stack
- **FastAPI**: Modern Python web framework with automatic API documentation
- **SQLAlchemy**: SQL toolkit and Object-Relational Mapping
- **SQLite**: Lightweight database for data persistence
- **Pydantic**: Data validation using Python type annotations
- **SMTP Integration**: Email sending capabilities via Gmail SMTP
- **CORS Middleware**: Cross-origin resource sharing support

### Deployment & Infrastructure
- **Docker**: Containerized deployment with multi-stage builds
- **Supervisord**: Process management for production deployment
- **nginx**: Reverse proxy and static file serving (via external setup)
- **Environment Variables**: Secure configuration management

## Backend Architecture Deep Dive

The backend is organized in a modular FastAPI structure that separates concerns and promotes maintainability. This architecture follows industry best practices for scalable web applications, with clear separation between routing, business logic, data access, and utility functions.

### Backend Flow Diagram
```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   Client App    │────▶│   server.py     │────▶│   app/main.py   │
│   (Frontend)    │     │   (Entry Point) │     │  (FastAPI App)  │
└─────────────────┘     └─────────────────┘     └─────────────────┘
                                                          │
                        ┌─────────────────────────────────┼─────────────────────────────────┐
                        │                                 ▼                                 │
                        │                    ┌─────────────────┐                           │
                        │                    │  app/config.py  │                           │
                        │                    │ (Configuration) │                           │
                        │                    └─────────────────┘                           │
                        │                             │                                     │
                        │                             ▼                                     │
                        │         ┌─────────────────────────────────────┐                  │
                        │         │        Route Handlers               │                  │
                        │         │                                     │                  │
                        │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐               │
                        │  │app/routes/  │  │app/routes/  │  │app/routes/  │               │
                        │  │posts.py     │  │subscribers  │  │contact.py   │               │
                        │  │             │  │.py          │  │             │               │
                        │  └─────────────┘  └─────────────┘  └─────────────┘               │
                        │         │                 │                 │                    │
                        │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐               │
                        │  │app/routes/  │  │app/routes/  │  │             │               │
                        │  │auth.py      │  │newsletter   │  │             │               │
                        │  │             │  │.py          │  │             │               │
                        │  └─────────────┘  └─────────────┘  └─────────────┘               │
                        │         │                 │                 │                    │
                        │         └─────────────────┼─────────────────┘                    │
                        │                           ▼                                      │
                        │              ┌─────────────────────┐                             │
                        │              │   Utility Layer     │                             │
                        │              │                     │                             │
                        │       ┌─────────────┐  ┌─────────────┐  ┌─────────────┐          │
                        │       │app/utils/   │  │app/utils/   │  │app/utils/   │          │
                        │       │auth.py      │  │email.py     │  │newsletter   │          │
                        │       │             │  │             │  │_email.py    │          │
                        │       └─────────────┘  └─────────────┘  └─────────────┘          │
                        │              │                 │                 │               │
                        │              └─────────────────┼─────────────────┘               │
                        │                                ▼                                 │
                        │              ┌─────────────────────┐                             │
                        │              │   Data Layer        │                             │
                        │              │                     │                             │
                        │       ┌─────────────┐  ┌─────────────┐  ┌─────────────┐          │
                        │       │app/models/  │  │app/models/  │  │app/schemas/ │          │
                        │       │post.py      │  │subscriber   │  │(All .py)    │          │
                        │       │             │  │.py          │  │             │          │
                        │       └─────────────┘  └─────────────┘  └─────────────┘          │
                        │              │                 │                 │               │
                        │              └─────────────────┼─────────────────┘               │
                        │                                ▼                                 │
                        │              ┌─────────────────────┐                             │
                        │              │app/database/base.py │                             │
                        │              │  (DB Connections)   │                             │
                        │              └─────────────────────┘                             │
                        │                        │                                         │
                        │                        ▼                                         │
                        │              ┌─────────────────────┐                             │
                        │              │   SQLite Databases  │                             │
                        │              │                     │                             │
                        │              │  posts.db          │                             │
                        │              │  subscribers.db    │                             │
                        │              └─────────────────────┐                             │
                        └──────────────────────────────────────────────────────────────────┘
```

### Core Components Explained

#### 1. Entry Point & Application Setup

**`server.py`** - The Bootstrap Layer
- **Purpose**: The main entry point that initializes and launches the FastAPI application
- **Responsibilities**:
  - Imports the FastAPI app instance from `app/main.py`
  - Configures uvicorn server settings (host, port, reload options)
  - Starts the ASGI server that handles HTTP requests
- **Key Features**:
  - Development vs production configuration
  - Hot reloading for development
  - Graceful shutdown handling
- **Example Flow**: When you run `python server.py`, it immediately calls uvicorn to start serving the FastAPI app

**`app/main.py`** - The Application Factory
- **Purpose**: Creates and configures the FastAPI application instance with all necessary middleware and routing
- **Responsibilities**:
  - Instantiates the FastAPI application with metadata (title, description, API documentation settings)
  - Configures CORS middleware for cross-origin requests from the frontend
  - Includes all route modules (posts, subscribers, contact, auth, newsletter)
  - Sets up static file serving for the React frontend
  - Implements SPA (Single Page Application) fallback routing
  - Initializes database tables on startup
- **Key Features**:
  - Automatic API documentation generation (disabled in production for security)
  - MIME type configuration for proper static file serving
  - Fallback routing that serves `index.html` for any unmatched routes (essential for React Router)
- **Integration Points**: This is where all the modular pieces come together into a cohesive application

#### 2. Configuration Management

**`app/config.py`** - The Central Configuration Hub
- **Purpose**: Centralizes all application configuration and environment variable management
- **Responsibilities**:
  - Loads environment variables from `.env` file using python-dotenv
  - Validates required configuration (API key presence and format)
  - Sets up email configuration (Gmail SMTP credentials)
  - Configures database paths and connection strings
  - Creates necessary directories automatically
- **Key Features**:
  - Environment variable validation with descriptive error messages
  - Automatic directory creation for data storage
  - Separate database configuration for posts and subscribers
  - Debug logging for configuration values (useful for troubleshooting)
- **Security Considerations**:
  - Never logs sensitive values like passwords
  - Validates API key length and format
  - Fails fast if required configuration is missing
- **Example Configuration Variables**:
  ```python
  API_KEY=your_40_character_api_key_here
  EMAIL_ADDRESS=your_gmail_address@gmail.com
  EMAIL_PASSWORD=your_gmail_app_password
  DOMAIN_SENDER=noreply@smallcapsignal.com
  ```

#### 3. Route Handlers (API Endpoints)

Each route file handles specific business functionality and follows RESTful principles:

**`app/routes/posts.py`** - Content Management System
- **Purpose**: Manages all blog posts and alerts with full CRUD operations
- **Key Endpoints**:
  - `GET /posts` - Retrieve all posts with reverse chronological ordering
  - `POST /posts` - Create new post (protected with API key authentication)
  - `DELETE /posts/{id}` - Delete specific post (protected)
  - `GET /rss` - Generate RSS feed with latest 20 posts
  - `GET /config` - Server configuration information for frontend
- **Business Logic**:
  - Automatic UUID generation for new posts
  - Timestamp management with UTC standardization
  - RSS feed generation with proper XML formatting and media content
  - Error handling for missing posts
- **Security Features**:
  - API key validation for write operations
  - Input validation via Pydantic schemas
  - SQL injection prevention through ORM usage
- **RSS Feed Details**:
  - XML 2.0 compliant RSS format
  - Includes post metadata, descriptions, and media content
  - Automatic escaping of HTML content
  - Proper MIME type handling

**`app/routes/subscribers.py`** - Newsletter Management
- **Purpose**: Handles email subscription lifecycle and subscriber data management
- **Key Endpoints**:
  - `POST /subscribe` - Add new email subscriber with duplicate prevention
  - `GET /subscribers` - List all subscribers with subscription timestamps
  - `DELETE /subscribers/{email}` - Remove specific subscriber (protected)
- **Business Logic**:
  - Duplicate email prevention with graceful messaging
  - Automatic timestamp generation for subscription tracking
  - Subscriber count management
- **Data Validation**:
  - Email format validation
  - Subscription timestamp tracking
  - Graceful handling of duplicate subscriptions
- **Admin Features**:
  - Bulk subscriber management
  - Subscription analytics data

**`app/routes/contact.py`** - Communication Gateway
- **Purpose**: Processes contact form submissions and routes them via email
- **Key Endpoints**:
  - `POST /api/contact` - Process contact form and send email notification
- **Business Logic**:
  - Form data validation and sanitization
  - Email formatting with sender information
  - Error handling for email delivery failures
- **Integration Points**:
  - Connects to `app/utils/email.py` for email sending
  - Uses Gmail SMTP for reliable delivery
  - Provides detailed error reporting for troubleshooting

**`app/routes/auth.py`** - Authentication Services
- **Purpose**: Provides authentication utilities and configuration validation
- **Key Endpoints**:
  - `POST /verify-key` - Validate API key for admin access
  - `GET /config` - Configuration status and debugging information
- **Security Features**:
  - API key validation with detailed debugging
  - Configuration status reporting (without exposing sensitive data)
  - Comprehensive error messages for troubleshooting
- **Debugging Support**:
  - API key length validation
  - Configuration availability checks
  - Detailed logging for authentication issues

**`app/routes/newsletter.py`** - Mass Communication System
- **Purpose**: Handles mass email distribution to all subscribers
- **Key Endpoints**:
  - `POST /newsletter/send` - Send newsletter to all subscribers (protected)
- **Business Logic**:
  - Retrieves all active subscribers from database
  - Sends individual emails to each subscriber
  - Tracks success/failure statistics
  - Provides detailed reporting on delivery status
- **Error Handling**:
  - Individual email failure tracking
  - Comprehensive success/error reporting
  - Graceful degradation if some emails fail
- **Performance Considerations**:
  - Sequential email sending to avoid SMTP rate limits
  - Individual error tracking without stopping the entire process
  - Detailed statistics for delivery monitoring

#### 4. Utility Layer

The utilities provide shared functionality across routes and implement cross-cutting concerns:

**`app/utils/auth.py`** - Authentication Middleware
- **Purpose**: Provides API key validation for protected endpoints
- **Key Features**:
  - Header parsing with flexible format support (Bearer token or direct key)
  - Comprehensive debugging with detailed logging
  - Environment variable validation
  - Security-focused error messages
- **Implementation Details**:
  - Extracts API keys from Authorization headers
  - Supports both "Bearer {key}" and direct key formats
  - Extensive logging for troubleshooting authentication issues
  - Environment variable cross-validation
- **Security Considerations**:
  - Constant-time comparison to prevent timing attacks
  - No API key exposure in error messages
  - Detailed logging for debugging without compromising security
- **Usage Pattern**: Used as a FastAPI dependency for protected routes

**`app/utils/email.py`** - Contact Form Email Service
- **Purpose**: Handles contact form email sending with Gmail SMTP integration
- **Key Features**:
  - Gmail SMTP configuration with TLS encryption
  - Detailed error logging and debugging
  - Email formatting with sender information
  - Comprehensive error handling
- **Implementation Details**:
  - SMTP connection management with explicit TLS
  - Debug logging for connection troubleshooting
  - Email composition with proper headers and formatting
  - Graceful error handling with user-friendly messages
- **Email Format**:
  - Professional email formatting with clear sender identification
  - Contact information preservation
  - Message content formatting
- **Error Handling**:
  - SMTP connection error detection
  - Authentication failure reporting
  - Network connectivity issue handling

**`app/utils/newsletter_email.py`** - Mass Email Distribution Service
- **Purpose**: Sends individual newsletter emails to subscribers using Gmail SMTP
- **Key Features**:
  - Individual email delivery with personalization
  - SMTP connection management for each email
  - Detailed success/failure tracking
  - Professional email formatting
- **Implementation Details**:
  - Per-email SMTP connection for reliability
  - Domain sender configuration for professional appearance
  - Comprehensive error logging for troubleshooting
  - TLS encryption for security
- **Performance Considerations**:
  - Individual connection management to avoid rate limiting
  - Detailed logging for delivery monitoring
  - Error isolation to prevent cascade failures
- **Email Personalization**:
  - Subscriber-specific addressing
  - Professional sender configuration
  - Custom subject and content support

#### 5. Data Models & Schemas

The data layer defines how information is structured, stored, and validated:

**`app/models/post.py`** - Blog Post Data Model
- **Purpose**: SQLAlchemy ORM model defining the database structure for blog posts
- **Key Fields**:
  - `id`: Unique identifier (UUID string, primary key)
  - `title`: Post title (required string)
  - `content`: Post content (long text, required)
  - `author`: Post author (optional string)
  - `createdAt`: Creation timestamp (datetime, auto-generated)
  - `imageUrl`: Featured image URL (optional string)
- **Database Features**:
  - Automatic timestamp generation
  - UUID primary keys for scalability
  - Nullable fields for optional content
  - Proper indexing for performance
- **Relationships**: Standalone table with no foreign key relationships for simplicity

**`app/models/subscriber.py`** - Email Subscriber Data Model
- **Purpose**: SQLAlchemy ORM model for newsletter subscription management
- **Key Fields**:
  - `email`: Subscriber email address (primary key, unique)
  - `subscribed_at`: Subscription timestamp (datetime, auto-generated)
- **Database Features**:
  - Email as primary key for natural uniqueness
  - Automatic subscription timestamp
  - Simple structure for performance
- **Business Logic**: Email uniqueness enforced at database level

**`app/schemas/`** - Request/Response Validation
- **Purpose**: Pydantic models for API request and response validation
- **Key Schema Files**:
  - `post.py`: Validates post creation requests and API responses
  - `subscriber.py`: Validates subscription requests and responses
  - `contact.py`: Validates contact form submissions
- **Validation Features**:
  - Type checking and conversion
  - Required field validation
  - Format validation (email, URLs, etc.)
  - Custom validation rules
- **Integration**: Used by FastAPI for automatic request/response validation and OpenAPI documentation generation

#### 6. Database Management

**`app/database/base.py`** - Database Connection and Session Management
- **Purpose**: Manages database connections, sessions, and table creation
- **Key Features**:
  - Dual database configuration (posts and subscribers)
  - SQLAlchemy session factory pattern
  - Automatic table creation
  - Connection pooling and lifecycle management
- **Implementation Details**:
  - Separate SQLite databases for different data types
  - Dependency injection pattern for FastAPI
  - Automatic schema migration and table creation
  - Session cleanup and connection management
- **Database Architecture**:
  - `posts.db`: Stores all blog posts and alerts
  - `subscribers.db`: Stores email subscription data
- **Performance Features**:
  - Connection pooling for efficiency
  - Automatic session cleanup
  - Optimized query patterns

### Request Flow Examples

#### Creating a New Post (Complete Lifecycle)
1. **Frontend Request**: Admin panel sends POST request to `/posts` with JSON payload
2. **Authentication Layer**: `app/routes/posts.py` receives request, calls auth dependency
3. **API Key Validation**: `app/utils/auth.py` extracts and validates API key from headers
4. **Configuration Check**: Auth utility compares against `app/config.py` loaded API key
5. **Data Validation**: Request body validated against `app/schemas/post.py` Pydantic model
6. **Database Operations**: 
   - New `app/models/post.py` SQLAlchemy instance created
   - UUID generated for unique post identification
   - Timestamp automatically set to current UTC time
7. **Database Persistence**: Post saved via `app/database/base.py` session management
8. **Response Generation**: Successful response with created post data returned to frontend
9. **Error Handling**: Any failures result in appropriate HTTP status codes and error messages

#### Sending Newsletter (Mass Email Workflow)
1. **Admin Request**: Admin panel sends POST to `/newsletter/send` with subject and message
2. **Authentication**: `app/routes/newsletter.py` validates API key via auth dependency
3. **Subscriber Retrieval**: All active subscribers fetched from `app/models/subscriber.py`
4. **Validation Check**: Ensures subscribers exist before proceeding
5. **Mass Email Process**:
   - Iterates through each subscriber sequentially
   - `app/utils/newsletter_email.py` sends individual email to each subscriber
   - SMTP connection established for each email for reliability
   - Success/failure tracked for each individual email
6. **Statistics Compilation**: Final report generated with delivery statistics
7. **Response**: Comprehensive report returned with success/failure counts
8. **Error Resilience**: Individual email failures don't stop the entire process

#### Contact Form Submission (User Communication)
1. **User Submission**: Frontend sends POST to `/api/contact` with form data
2. **Data Validation**: `app/routes/contact.py` validates data against `app/schemas/contact.py`
3. **Email Composition**: Contact information formatted into professional email
4. **SMTP Delivery**: `app/utils/email.py` sends email via Gmail SMTP with TLS encryption
5. **Delivery Confirmation**: Success/failure response sent back to frontend
6. **User Feedback**: Frontend displays appropriate success or error message
7. **Admin Notification**: Email delivered to configured admin email address

### Database Architecture Details

The application uses a dual-database approach for logical separation and performance optimization:

**Posts Database (`posts.db`)**
- **Purpose**: Stores all blog content and alerts
- **Tables**: Single `posts` table with comprehensive post data
- **Optimization**: Indexed by creation date for fast retrieval
- **Backup Strategy**: Critical for content preservation
- **Size Considerations**: Grows with content volume, requires monitoring

**Subscribers Database (`subscribers.db`)**
- **Purpose**: Manages newsletter subscription data
- **Tables**: Single `subscribers` table with email and timestamp data
- **Optimization**: Email field indexed as primary key for fast lookups
- **Privacy Considerations**: Contains personal data, requires careful handling
- **GDPR Compliance**: Supports easy subscriber deletion for privacy compliance

**Database Separation Benefits**:
- **Independent Scaling**: Each database can be optimized separately
- **Backup Strategies**: Different backup schedules for different data types
- **Security Isolation**: Subscriber data isolated from content data
- **Maintenance**: Independent maintenance windows possible
- **Performance**: Reduced lock contention and improved query performance

### Security & Authentication Details

**API Key Authentication System**:
- **Key Format**: 40-character alphanumeric string for high entropy
- **Storage**: Environment variable only, never in code or logs
- **Validation**: Constant-time comparison to prevent timing attacks
- **Scope**: Protects all administrative functions (create/delete posts, manage subscribers, send newsletters)
- **Debugging**: Extensive logging for troubleshooting without exposing sensitive data

**Email Security**:
- **Authentication**: Gmail app passwords (not account passwords) for enhanced security
- **Encryption**: All SMTP connections use TLS encryption
- **Rate Limiting**: Natural rate limiting through sequential email sending
- **Privacy**: No email content logged, only delivery success/failure

**Input Validation**:
- **Pydantic Models**: All API inputs validated against defined schemas
- **SQL Injection Prevention**: SQLAlchemy ORM prevents direct SQL injection
- **XSS Prevention**: Input sanitization and proper output encoding
- **CORS Configuration**: Restricted to specific domains for security

**Environment Security**:
- **Secret Management**: All sensitive configuration in environment variables
- **File Permissions**: Database files have restricted filesystem access
- **Container Security**: Non-root user execution in Docker containers
- **Network Security**: Internal communication between services

### Performance & Scalability Considerations

**Database Performance**:
- **SQLite Optimization**: Appropriate for moderate traffic loads
- **Connection Pooling**: Efficient database connection management
- **Query Optimization**: Indexed queries for fast data retrieval
- **Transaction Management**: Proper commit/rollback handling

**Email Performance**:
- **Sequential Delivery**: Prevents SMTP server overload
- **Error Isolation**: Individual email failures don't affect others
- **Connection Management**: Fresh connections for reliability
- **Monitoring**: Detailed success/failure tracking

**Caching Strategies**:
- **Static Files**: Proper cache headers for frontend assets
- **API Responses**: Cacheable where appropriate
- **Database Queries**: Optimized query patterns

**Monitoring & Observability**:
- **Application Logs**: Comprehensive logging throughout the application
- **Error Tracking**: Detailed error messages and stack traces
- **Performance Metrics**: Response time and throughput monitoring
- **Health Checks**: API endpoints for monitoring system health

## Architecture

### Frontend Architecture
- **Component-Based**: Modular React components with clear separation of concerns
- **Context API**: BlogContext for global state management
- **Protected Routes**: Admin routes with authentication guards
- **Responsive Layout**: Mobile-first design with Tailwind CSS
- **Error Handling**: Toast notifications for user feedback

### Backend Architecture
- **Router-Based**: Modular FastAPI routers for different functionalities
- **Database Layer**: SQLAlchemy models with separate databases
- **Authentication**: API key-based authentication for admin functions
- **Email Service**: Utility modules for contact and newsletter emails
- **Static Serving**: SPA fallback for React frontend

## Setup and Installation

### Prerequisites
- Node.js 20+ and npm
- Python 3.11+
- Docker and Docker Compose

### Environment Configuration
Create a `.env` file in the project root with the following variables:

```env
# API Authentication
API_KEY=your_40_character_api_key_here

# Email Configuration
EMAIL_ADDRESS=your_gmail_address@gmail.com
EMAIL_PASSWORD=your_gmail_app_password
DOMAIN_SENDER=noreply@smallcapsignal.com

# Database (auto-configured, no changes needed)
# Databases are created automatically in /backend/data/
```

### Local Development Setup

1. **Clone the repository:**
   ```bash
   git clone <repository_url>
   cd smallcapsignal
   ```

2. **Install frontend dependencies:**
   ```bash
   npm install
   ```

3. **Install backend dependencies:**
   ```bash
   cd backend
   pip install -r requirements.txt
   cd ..
   ```

4. **Start development servers:**
   ```bash
   # Frontend (runs on localhost:5173)
   npm run dev
   
   # Backend (runs on localhost:8000)
   cd backend
   python server.py
   ```

### Docker Deployment

1. **Build and run with Docker Compose:**
   ```bash
   docker-compose up --build
   ```

2. **Access the application:**
   - Website: `http://localhost:8000`
   - Admin Panel: `http://localhost:8000/admin`
   - API Documentation: Not exposed in production

## Support and Maintenance

### Logging and Monitoring

#### Frontend Logging
- **Browser Console**: Use browser developer tools (F12) to view client-side logs
- **Error Boundaries**: React error boundaries catch and log component errors
- **Network Tab**: Monitor API requests and responses in browser dev tools
- **Console Methods**: Application uses `console.log`, `console.error`, and `console.warn`

#### Backend Logging
- **Application Logs**: FastAPI outputs detailed logs to stdout/stderr
- **Docker Logs**: View container logs using Docker commands
  ```bash
  # View live logs
  docker logs -f <container_name>
  
  # View recent logs
  docker logs --tail 100 <container_name>
  
  # Find container name
  docker ps
  ```
- **Log Levels**: Debug, info, warning, and error levels available
- **Request Logging**: All API requests are logged with timestamps and details

#### Supervisord Logging
- **Process Management**: Supervisord manages the FastAPI process
- **Log Files**: Located at `/var/log/supervisor/` inside the container
  ```bash
  # Access container shell
  docker exec -it <container_name> /bin/bash
  
  # View supervisor logs
  tail -f /var/log/supervisor/backend.out.log
  tail -f /var/log/supervisor/backend.err.log
  ```

### Error Handling and Troubleshooting

#### Common Issues and Solutions

**API Key Authentication Errors**
- **Symptom**: "Invalid API key" or "API key length mismatch" errors
- **Diagnosis**: Check backend logs for API key comparison details
- **Solution**: 
  1. Verify `.env` file contains correct API_KEY (40 characters)
  2. Restart Docker containers to reload environment variables
  3. Check logs for "Config loaded API_KEY" messages

**Email Sending Failures**
- **Symptom**: Newsletter or contact form emails not sending
- **Diagnosis**: Check backend logs for SMTP connection errors
- **Solution**:
  1. Verify Gmail app password in EMAIL_PASSWORD
  2. Ensure EMAIL_ADDRESS is correct Gmail address
  3. Check Gmail account has 2FA enabled and app password generated

**Database Connection Issues**
- **Symptom**: "Database locked" or connection errors
- **Diagnosis**: Check file permissions and database file existence
- **Solution**:
  1. Verify `/backend/data/` directory exists and is writable
  2. Check SQLite database files are not corrupted
  3. Restart containers to reset database connections

**Frontend Build Errors**
- **Symptom**: White screen or build failures
- **Diagnosis**: Check browser console and Docker build logs
- **Solution**:
  1. Clear browser cache and hard refresh
  2. Rebuild Docker containers with `--no-cache` flag
  3. Check for TypeScript compilation errors

#### Debugging Steps

1. **Check Container Status**:
   ```bash
   docker ps  # View running containers
   docker-compose ps  # View compose services
   ```

2. **View Application Logs**:
   ```bash
   docker-compose logs -f  # All services
   docker-compose logs backend  # Backend only
   ```

3. **Access Container Shell**:
   ```bash
   docker exec -it <container_name> /bin/bash
   ```

4. **Check Environment Variables**:
   ```bash
   docker exec <container_name> env | grep API_KEY
   ```

5. **Test API Endpoints**:
   ```bash
   curl http://localhost:8000/posts
   curl http://localhost:8000/config
   ```

### Deployment Management

#### Production Deployment
- **Docker Compose**: Use `docker-compose.yml` for production deployment
- **Environment Variables**: Set production values in `.env` file
- **Port Configuration**: Application runs on port 8000
- **Network Setup**: Configured for external frontend network (nginx proxy)

#### Updates and Maintenance
1. **Code Updates**:
   ```bash
   git pull origin main
   docker-compose down
   docker-compose up --build -d
   ```

2. **Database Backup**:
   ```bash
   docker cp <container_name>:/app/backend/data/ ./backup/
   ```

3. **Log Rotation**: Supervisor handles log rotation automatically

4. **Health Checks**: Monitor `/posts` endpoint for application health

#### Performance Monitoring
- **Resource Usage**: Monitor Docker container resource consumption
- **Response Times**: Check API response times in browser network tab
- **Database Performance**: Monitor SQLite query performance in logs
- **Email Delivery**: Check SMTP connection success rates in logs

### Security Considerations

#### API Security
- **Authentication**: All admin endpoints require valid API key
- **CORS**: Configured for specific domains only
- **Input Validation**: Pydantic models validate all input data
- **SQL Injection**: SQLAlchemy ORM prevents SQL injection attacks

#### Email Security
- **App Passwords**: Uses Gmail app passwords, not account passwords
- **TLS Encryption**: All SMTP connections use TLS encryption
- **Rate Limiting**: Consider implementing rate limiting for email endpoints

#### Environment Security
- **Secret Management**: All sensitive data in environment variables
- **File Permissions**: Database files have restricted access
- **Container Security**: Non-root user execution in containers

### Backup and Recovery

#### Database Backup
```bash
# Create backup
docker cp <container_name>:/app/backend/data/ ./backup-$(date +%Y%m%d)/

# Restore backup
docker cp ./backup-YYYYMMDD/data/ <container_name>:/app/backend/
```

#### Configuration Backup
- Backup `.env` file securely
- Document any custom configuration changes
- Keep Docker Compose file version controlled

### Contact and Support

For technical support and maintenance issues:
- Check this README first for common solutions
- Review application logs for specific error messages
- Document error symptoms and steps to reproduce
- Maintain regular backups of data and configuration

## API Endpoints

### Public Endpoints
- `GET /posts` - Retrieve all blog posts
- `POST /subscribe` - Subscribe to newsletter
- `GET /subscribers` - Get subscriber list
- `POST /api/contact` - Send contact message
- `GET /config` - Get configuration info
- `GET /rss` - RSS feed

### Protected Endpoints (Require API Key)
- `POST /posts` - Create new post
- `DELETE /posts/{id}` - Delete post
- `DELETE /subscribers/{email}` - Delete subscriber
- `POST /newsletter/send` - Send newsletter

## Contributing

When making changes to the codebase:
1. Follow existing code style and patterns
2. Test changes locally before deployment
3. Update documentation for any new features
4. Monitor logs after deployment for any issues
