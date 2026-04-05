# Student Records API 🎓

A RESTful API built with **Express.js** to manage student records with full CRUD operations (Create, Read, Update, Delete).

---

## 📋 Project Overview

This API provides endpoints to:
- **Create** new student records (single or bulk)
- **Read** all student records
- **Update** student records (complete or partial updates)
- **Delete** student records

The API uses **in-memory storage**, making it suitable for development and testing. For production use, integrate a database like MongoDB or PostgreSQL.

---

## 🛠️ Technology Stack

- **Runtime**: Node.js
- **Framework**: Express.js v5.2.1
- **Package Manager**: npm
- **Environment Management**: dotenv
- **Development Tool**: Nodemon (for hot reloading)
- **ID Generation**: Node.js crypto module

---

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- npm (comes with Node.js)

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/JohnstoneGogo/Students-Records-API-GRP-2B.git
   cd Students-Records-API-GRP-2B
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create a `.env` file** (optional - sets custom port)
   ```bash
   PORT=3000
   ```

4. **Start the server**

   **Production mode:**
   ```bash
   npm start
   ```

   **Development mode** (with auto-reload):
   ```bash
   npm run dev
   ```

5. **Server will start on**
   ```
   http://localhost:3000
   ```

---

## 📡 API Endpoints

### Base URL
```
http://localhost:3000
```

### 1. GET /students
**Description**: Retrieve all student records

**Request**:
```http
GET /students
```

**Response** (200 OK):
```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "John Doe",
    "email": "john@example.com",
    "matricNumber": "MAT001",
    "courses": ["Mathematics", "Physics"]
  }
]
```

---

### 2. POST /students
**Description**: Create a new student record

**Request**:
```http
POST /students
Content-Type: application/json

{
  "name": "Alice Smith",
  "email": "alice@example.com",
  "matricNumber": "MAT002",
  "courses": ["Chemistry", "Biology"]
}
```

**Response** (201 Created):
```json
{
  "message": "New student added successfully",
  "student": {
    "id": "550e8400-e29b-41d4-a716-446655440001",
    "name": "Alice Smith",
    "email": "alice@example.com",
    "matricNumber": "MAT002",
    "courses": ["Chemistry", "Biology"]
  }
}
```

**Validations**:
- All fields are required
- Email must be unique
- Email must be in valid format

**Error Response** (400 Bad Request):
```json
{
  "error": "All fields are required"
}
```

---

### 3. POST /students/bulk
**Description**: Create multiple student records at once

**Request**:
```http
POST /students/bulk
Content-Type: application/json

[
  {
    "name": "Bob Johnson",
    "email": "bob@example.com",
    "matricNumber": "MAT003",
    "courses": ["English", "Literature"]
  },
  {
    "name": "Carol White",
    "email": "carol@example.com",
    "matricNumber": "MAT004",
    "courses": ["History", "Geography"]
  }
]
```

**Response** (201 Created):
```json
{
  "message": "Bulk inserted successfully",
  "Students": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440002",
      "name": "Bob Johnson",
      "email": "bob@example.com",
      "matricNumber": "MAT003",
      "courses": ["English", "Literature"]
    },
    {
      "id": "550e8400-e29b-41d4-a716-446655440003",
      "name": "Carol White",
      "email": "carol@example.com",
      "matricNumber": "MAT004",
      "courses": ["History", "Geography"]
    }
  ]
}
```

---

### 4. PUT /students/:id
**Description**: Replace an entire student record (all fields required)

**Request**:
```http
PUT /students/550e8400-e29b-41d4-a716-446655440000
Content-Type: application/json

{
  "name": "John Updated",
  "email": "john.updated@example.com",
  "matricNumber": "MAT001-NEW",
  "courses": ["Physics", "Chemistry", "Mathematics"]
}
```

**Response** (200 OK):
```json
{
  "message": "Student Info Fully updated",
  "student": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "John Updated",
    "email": "john.updated@example.com",
    "matricNumber": "MAT001-NEW",
    "courses": ["Physics", "Chemistry", "Mathematics"]
  }
}
```

**Note**: PUT requires ALL fields. Missing fields will cause an error.

---

### 5. PATCH /students/:id
**Description**: Partially update a student record (only provided fields are updated)

**Request**:
```http
PATCH /students/550e8400-e29b-41d4-a716-446655440000
Content-Type: application/json

{
  "email": "newemail@example.com",
  "courses": ["Advanced Physics"]
}
```

**Response** (200 OK):
```json
{
  "message": "Student updated",
  "student": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "John Doe",
    "email": "newemail@example.com",
    "matricNumber": "MAT001",
    "courses": ["Advanced Physics"]
  }
}
```

**Note**: PATCH allows partial updates. Only include fields you want to change.

---

### 6. DELETE /students/:id
**Description**: Delete a student record

**Request**:
```http
DELETE /students/550e8400-e29b-41d4-a716-446655440000
```

**Response** (200 OK):
```json
{
  "message": "Student deleted successfully",
  "student": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "John Doe",
    "email": "john@example.com",
    "matricNumber": "MAT001",
    "courses": ["Mathematics", "Physics"]
  }
}
```

**Error Response** (404 Not Found):
```json
{
  "error": "Student not found"
}
```

---

## 🧪 Testing with Postman

### Import Collection
1. Open Postman
2. Click **Import** → **File** or **Link**
3. Select the Postman collection file from the repository
4. All endpoints will be pre-configured

### Manual Testing Example

**Create a student**:
```bash
curl -X POST http://localhost:3000/students \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","matricNumber":"MAT999","courses":["Test"]}'
```

**Get all students**:
```bash
curl http://localhost:3000/students
```

---

## 📁 Project Structure

```
Students-Records-API-GRP-2B/
├── server.js              # Main Express application
├── package.json           # Project dependencies and metadata
├── .env                   # Environment variables (create this)
├── .gitignore             # Git ignore rules
├── README.md              # Project documentation
├── public/
│   └── index.html         # Static frontend (optional)
└── node_modules/          # Installed dependencies
```

---

## 🚀 Running the Server

### Start Server
```bash
npm start
```

### With Auto-Reload (Development)
```bash
npm run dev
```

### Output
```
✅ Server is running on http://localhost:3000
📚 View all students: GET http://localhost:3000/students

Ready to handle student records requests!
```

---

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
PORT=3000
```

If `.env` is not present, the server defaults to port **3000**.

---

## ✨ Key Features

✅ **CRUD Operations** - Full support for Create, Read, Update, Delete  
✅ **Bulk Operations** - Create multiple students at once  
✅ **Data Validation** - Email format and uniqueness validation  
✅ **Unique IDs** - UUID generation using crypto module  
✅ **Error Handling** - Comprehensive error messages  
✅ **RESTful Design** - Standard HTTP methods and status codes  
✅ **In-Memory Storage** - Fast development and testing  
✅ **Well-Commented Code** - Easy to understand and maintain  

---

## 📊 Response Status Codes

| Status | Meaning | When Used |
|--------|---------|-----------|
| **200** | OK | Successful GET, PUT, PATCH, DELETE |
| **201** | Created | Successful POST (student created) |
| **400** | Bad Request | Invalid input or missing fields |
| **404** | Not Found | Student ID doesn't exist |

---

## 🛡️ Validation Rules

### Student Fields
- **name**: Required, string
- **email**: Required, unique, valid email format
- **matricNumber**: Required, string
- **courses**: Required, array of strings

### PUT Request
- All fields must be provided

### PATCH Request
- Only provided fields are updated
- Email validation still applies if provided

---

## 👥 Team Collaboration

### GitHub Workflow
1. Each team member creates a feature branch
2. Make commits with meaningful messages
3. Submit pull requests for review
4. Merge after approval

### Branch Naming Convention
```
feature/endpoint-name
bugfix/issue-name
docs/documentation-update
```

### Commit Message Format
```
feat: add DELETE endpoint
fix: validate email format
docs: update README
```

---

## 📝 Sample Student Data

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "John Doe",
  "email": "john.doe@university.edu",
  "matricNumber": "CSC/2023/001",
  "courses": ["Data Structures", "Web Development", "Database Design"]
}
```

---

## ⚠️ Important Notes

- **In-Memory Storage**: All data is lost when the server restarts. Use a database for persistence.
- **No Authentication**: This API has no authentication. For production, add JWT or OAuth.
- **CORS**: Not configured by default. Enable if frontend is on different domain.
- **Rate Limiting**: Not implemented. Add for production environments.

---

## 🔄 Future Enhancements

- [ ] Database integration (MongoDB/PostgreSQL)
- [ ] User authentication and authorization
- [ ] File upload for student photos
- [ ] Student grades and academic records
- [ ] Pagination for large datasets
- [ ] Search and filter functionality
- [ ] API rate limiting
- [ ] Comprehensive error logging
- [ ] Unit and integration tests

---

## 📧 Support & Issues

For issues or questions:
1. Check existing GitHub issues
2. Create a new issue with detailed description
3. Include error messages and steps to reproduce

---

## 📄 License

ISC License - Feel free to use and modify this project.

---

## 👨‍💻 Contributors

- Group 2B Members

---

## 📚 Resources

- [Express.js Documentation](https://expressjs.com/)
- [Node.js Documentation](https://nodejs.org/docs/)
- [HTTP Status Codes](https://httpwg.org/specs/rfc7231.html#status.codes)
- [RESTful API Design](https://restfulapi.net/)
- [Postman Collection Tutorial](https://learning.postman.com/docs/getting-started/creating-the-first-collection/)

---

**Last Updated**: March 30, 2026  
**Version**: 1.0.0