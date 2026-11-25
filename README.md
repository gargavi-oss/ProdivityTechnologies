# 🚀 Prodivity Technologies

A full-stack developer agency platform built with the MERN stack, featuring a dynamic portfolio website, RESTful backend APIs, MongoDB data management, and a protected admin CMS for managing website content without modifying the source code.

## 🌐 Live Demo

**Website:** https://prodivity-technologies.vercel.app

**Repository:** https://github.com/gargavi-oss/ProdivityTechnologies

---

## 📌 Overview

**Prodivity Technologies** is a MERN-stack agency platform designed to help development teams showcase their services, technical expertise, projects, team members, and client testimonials.

The project includes a complete **Admin Content Management System (CMS)** connected to a REST API backend. Administrators can securely log in and manage projects, team members, testimonials, website statistics, contact enquiries, and uploaded media dynamically.

The frontend communicates with the backend through RESTful APIs, while MongoDB and Mongoose are used for persistent data storage.

---

## ✨ Key Features

### 👨‍💻 Team Management

- View active team members on the public website
- Add new team members
- Update developer profiles
- Manage roles, bios, skills, and profile images
- Add GitHub and LinkedIn profiles
- Control member visibility and display order

### 💼 Services & Website Content

- Dynamic website content
- Manage homepage statistics
- Update agency information
- Configure website metrics such as:
  - Projects delivered
  - Happy clients
  - Client satisfaction
  - Support availability

### 📂 Project Portfolio

- Display projects dynamically
- Filter projects by status
- Filter featured projects
- View individual project details
- Add new projects through the admin dashboard
- Edit project information
- Delete projects
- Manage technology tags, images, live links, featured status, and project status

### ⭐ Testimonials

- Display client testimonials
- Filter featured testimonials
- Add new testimonials
- Edit existing testimonials
- Delete testimonials
- Manage ratings, company information, roles, and testimonial content

### 📞 Contact & Lead Management

The website includes a public contact form through which visitors can submit project enquiries.

Administrators can:

- View submitted contacts
- Filter contacts by status
- View individual enquiries
- Update contact status
- Delete enquiries
- View recent leads through the dashboard

Contact submissions also trigger an email notification without blocking the API response if the email service fails.

### 🔐 Authentication & Admin CMS

- Admin login system
- Protected admin routes
- Authentication middleware
- Secure access to management APIs
- Centralized dashboard
- Dynamic content management
- Dashboard statistics and recent activity

### 📊 Admin Dashboard

The dashboard provides aggregated information including:

- Total contacts
- New contacts
- Responded contacts
- Total projects
- Active projects
- Completed projects
- Featured projects
- Recent contact enquiries
- Recent projects
- Monthly lead statistics for the previous six months

### ☁️ Media Uploads

- Admin-only image upload endpoint
- Cloudinary integration
- Supports JPG, JPEG, PNG, and WebP
- Maximum upload size of 5 MB
- Automatic image resizing and quality optimization
- Images stored inside the `prodivity` Cloudinary folder

### 📱 Responsive Design

- Mobile-friendly interface
- Tablet optimization
- Desktop responsiveness
- Responsive admin dashboard
- Modern UI/UX
- Cross-device compatibility

---

# 🏗️ System Architecture

```text
┌──────────────────────────────┐
│       React Frontend         │
│      Tailwind CSS UI         │
└──────────────┬───────────────┘
               │
               │ REST API
               ▼
┌──────────────────────────────┐
│      Node.js + Express       │
│        REST API Server       │
└───────┬──────────┬───────────┘
        │          │
        │          ├──────────────► Cloudinary
        │          │                 Media Storage
        │
        ▼
┌──────────────────────────────┐
│       MongoDB + Mongoose     │
│       Persistent Storage     │
└──────────────────────────────┘

               │
               ▼
       ┌─────────────────┐
       │  Admin Dashboard│
       │ Auth Protected  │
       └─────────────────┘
```

---

# 🔌 REST API

The backend follows a RESTful API architecture.

Public endpoints are accessible without authentication, while management endpoints require the authentication middleware.

## 🔑 Authentication

### Login

```http
POST /api/auth/login
```

Authenticates an administrator and returns the authentication credentials used to access protected routes.

### Current Admin

```http
GET /api/auth/me
```

**Authentication:** Required

Returns the currently authenticated administrator.

---

# 📂 Projects API

### Get Projects

```http
GET /api/projects
```

**Authentication:** Public

Returns a paginated list of projects.

### Query Parameters

```text
status
featured
page
limit
```

Example:

```http
GET /api/projects?featured=true
```

### Get Project

```http
GET /api/projects/:id
```

**Authentication:** Public

Returns details of a specific project.

### Create Project

```http
POST /api/projects
```

**Authentication:** Admin only

Creates a new portfolio project.

### Update Project

```http
PUT /api/projects/:id
```

**Authentication:** Admin only

Updates an existing project.

### Delete Project

```http
DELETE /api/projects/:id
```

**Authentication:** Admin only

Deletes a project from the portfolio.

---

# 👥 Team API

### Get Team Members

```http
GET /api/team
```

**Authentication:** Public

Returns active team members ordered by their configured display order.

### Create Team Member

```http
POST /api/team
```

**Authentication:** Admin only

Creates a new team member.

### Update Team Member

```http
PUT /api/team/:id
```

**Authentication:** Admin only

Updates an existing team member.

### Delete Team Member

```http
DELETE /api/team/:id
```

**Authentication:** Admin only

Removes a team member.

---

# ⭐ Testimonials API

### Get Testimonials

```http
GET /api/testimonials
```

**Authentication:** Public

Supports filtering using:

```text
featured=true
```

Example:

```http
GET /api/testimonials?featured=true
```

### Create Testimonial

```http
POST /api/testimonials
```

**Authentication:** Admin only

### Update Testimonial

```http
PUT /api/testimonials/:id
```

**Authentication:** Admin only

### Delete Testimonial

```http
DELETE /api/testimonials/:id
```

**Authentication:** Admin only

---

# 📞 Contact API

### Submit Contact Form

```http
POST /api/contacts
```

**Authentication:** Public

Used by visitors to submit project enquiries.

Required fields:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "category": "Web Development",
  "projectBase": "Startup Website",
  "message": "I would like to discuss a project."
}
```

The API creates the contact record and triggers an email notification.

### Get Contacts

```http
GET /api/contacts
```

**Authentication:** Admin only

Supports:

```text
status
page
limit
```

Example:

```http
GET /api/contacts?status=new&page=1&limit=20
```

### Get Contact

```http
GET /api/contacts/:id
```

**Authentication:** Admin only

### Update Contact Status

```http
PATCH /api/contacts/:id
```

**Authentication:** Admin only

Used to update the status of an enquiry.

### Delete Contact

```http
DELETE /api/contacts/:id
```

**Authentication:** Admin only

---

# 📊 Dashboard API

### Get Dashboard Statistics

```http
GET /api/dashboard
```

**Authentication:** Admin only

Returns aggregated statistics including:

```text
Total Contacts
New Contacts
Responded Contacts
Total Projects
Active Projects
Completed Projects
Featured Projects
Recent Contacts
Recent Projects
Monthly Lead Statistics
```

The API also generates monthly contact statistics for the previous six months, which can be used to visualize lead trends in the admin dashboard.

---

# ⚙️ Website Settings API

### Get Settings

```http
GET /api/settings
```

**Authentication:** Public

Returns the dynamic website statistics and settings.

Default statistics include:

```text
Projects Delivered
Happy Clients
Client Satisfaction
Support Available
```

### Update Setting

```http
PUT /api/settings/:key
```

**Authentication:** Admin only

Updates an individual website setting.

### Bulk Update Settings

```http
PUT /api/settings
```

**Authentication:** Admin only

Allows multiple settings to be updated in a single request.

Example:

```json
{
  "settings": [
    {
      "key": "stat_projects",
      "value": "10+"
    },
    {
      "key": "stat_clients",
      "value": "8+"
    }
  ]
}
```

---

# ☁️ Image Upload API

### Upload Image

```http
POST /api/upload
```

**Authentication:** Admin only

Uploads an image to Cloudinary and returns the hosted image URL.

### Supported Formats

```text
JPG
JPEG
PNG
WebP
```

### Maximum File Size

```text
5 MB
```

Uploaded images are automatically processed with:

- Maximum dimensions of 1200 × 1200
- Automatic quality optimization
- Cloudinary hosted storage

---

# 🔒 API Access Control

| Resource | Public GET | Admin Create | Admin Update | Admin Delete |
|---|:---:|:---:|:---:|:---:|
| Projects | ✅ | ✅ | ✅ | ✅ |
| Team | ✅ | ✅ | ✅ | ✅ |
| Testimonials | ✅ | ✅ | ✅ | ✅ |
| Contacts | ❌ | Public Form | ✅ | ✅ |
| Dashboard | ❌ | — | — | — |
| Settings | ✅ | — | ✅ | — |
| Uploads | ❌ | ✅ | — | — |

Protected endpoints use the project's authentication middleware.

---

# 🛠️ Tech Stack

## Frontend

- React.js
- JavaScript
- Tailwind CSS

## Backend

- Node.js
- Express.js
- REST APIs

## Database

- MongoDB
- Mongoose

## Authentication

- Protected routes
- Authentication middleware

## Media & Communication

- Cloudinary
- Multer
- Email notifications

## Deployment

- Vercel

---

# 📁 Project Structure

```text
ProdivityTechnologies/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── ...
│   │
│   └── ...
│
├── server/
│   ├── models/
│   │   ├── Contact.js
│   │   ├── Project.js
│   │   ├── SiteSetting.js
│   │   ├── TeamMember.js
│   │   └── Testimonial.js
│   │
│   ├── routes/
│   │   ├── auth.js
│   │   ├── contacts.js
│   │   ├── dashboard.js
│   │   ├── projects.js
│   │   ├── settings.js
│   │   ├── team.js
│   │   ├── testimonials.js
│   │   └── upload.js
│   │
│   ├── middleware/
│   │   └── auth.js
│   │
│   ├── utils/
│   │   └── email.js
│   │
│   └── ...
│
└── README.md
```

---

# 🚀 Getting Started

## 1. Clone the Repository

```bash
git clone https://github.com/gargavi-oss/ProdivityTechnologies.git
cd ProdivityTechnologies
```

## 2. Install Dependencies

Install dependencies for both the frontend and backend:

```bash
npm install
```

If the project uses separate frontend and backend directories:

```bash
cd client
npm install

cd ../server
npm install
```

## 3. Configure Environment Variables

Create a `.env` file in the backend and configure the required environment variables for:

```text
MongoDB
Authentication
Cloudinary
Email Service
```

## 4. Start the Development Server

Start the backend and frontend according to the project's configured scripts.

---

# 🔄 Application Flow

### Public User Flow

```text
Visitor
   ↓
React Website
   ↓
REST API
   ↓
MongoDB
   ↓
Dynamic Website Content
```

### Contact Flow

```text
Visitor
   ↓
Contact Form
   ↓
POST /api/contacts
   ↓
MongoDB
   ↓
Email Notification
   ↓
Admin Dashboard
```

### Admin Flow

```text
Admin Login
   ↓
Authentication
   ↓
Protected Admin Routes
   ↓
Admin Dashboard
   ↓
CRUD APIs
   ↓
MongoDB
   ↓
Website Content Updated
```

---

# 🎯 What This Project Demonstrates

This project demonstrates practical experience in:

- Full-stack MERN development
- REST API design
- CRUD operations
- MongoDB database modelling
- Authentication and protected routes
- Admin CMS development
- API integration
- Cloudinary media management
- Email notification workflows
- Pagination and filtering
- Dashboard data aggregation
- Responsive frontend development
- Production deployment

---

## 👨‍💻 Author

**Avi Garg**

- GitHub: https://github.com/gargavi-oss
- LinkedIn: https://www.linkedin.com/in/avi-garg-401884321/

---

## 🌐 Project Links

**Live Website:**  
https://prodivity-technologies.vercel.app

**GitHub Repository:**  
https://github.com/gargavi-oss/ProdivityTechnologies
