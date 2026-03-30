require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const crypto = require('crypto');

//in-memory data store for students
const studentCollection = [];

// Sample routes
app.use(express.json());
app.use(express.static('public'));

const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};
app.get('/students', (req, res) => {
  res.json(studentCollection);
});

//FOR CREATING A USER
app.post("/students", (req, res) => {
  const { name, email, matricNumber, courses } = req.body;
  const existingStudent = studentCollection.find(s => s.email === email);

  if (!name || !email || !matricNumber || !courses) {
    return res.status(400).json({ error: "All fields are required" });
  }
  if (existingStudent) {
    return res.status(400).json({ error: "Email already exists" });
  }
  if (!isValidEmail(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  const newStudent = { id: crypto.randomUUID(), name, email, matricNumber, courses };
  studentCollection.push(newStudent);

  res.status(201).json({ message: "New student added successfully", student: newStudent });
  console.log(`New student created: ${newStudent.name}`);
  console.log("Student record created:", newStudent);
});

//FOR CREATING MULTIPLE USERS
app.post("/students/bulk", (req, res) => {
  const newlyadded = [];
  const student = req.body;
  if (Array.isArray(student) === false) return res.status(400).json({ Error: "Inputs should be more than 1 student" });
  for (let i = 0; i < student.length; i++) {
    const { name, email, matricNumber, courses } = student[i];
    if (!name || !email || !matricNumber || !courses) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const newStudent = { id: crypto.randomUUID(), name, email, matricNumber, courses };
    newlyadded.push(newStudent);
    studentRecords.push(newStudent);
  }
  res.status(201).json({ message: "Bulk inserted successfully", Students: newlyadded });
});

//FOR CREATING UPDATING USER DETAILS COMPLETELY
app.put("/students/:id", (req, res) => {
  const { id } = req.params;
  const { name, email, matricNumber, courses } = req.body;
  const studentIndex = studentCollection.findIndex(s => s.id === id);
  const duplicateEmail = studentCollection.find(s => s.email === email && s.id !== id);

  if (studentIndex === -1) {
    return res.status(404).json({ error: "Student not found" });
  }
  if (!name || !email || !matricNumber || !courses) {
    return res.status(400).json({ error: "All fields are required for PUT" });
  }
  if (duplicateEmail) {
    return res.status(400).json({ error: "Email already exists" });
  }
  if (!isValidEmail(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }
  const updatedStudent = { id, name, email, matricNumber, courses };
  studentCollection[studentIndex] = updatedStudent;
  res.json({ message: "Student Info Fully updated", student: updatedStudent });
});

//FOR UPDATING A USER PARTIALLY
app.patch("/students/:id", (req, res) => {
  const student = studentCollection.find(s => s.id === req.params.id);

  if (!student) {
    return res.status(404).json({ error: "Student not found" });
  }
  const { name, email, matricNumber, courses } = req.body;

  // Validate email only if it's being updated
  if (email) {
    if (!isValidEmail(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }
    const exists = studentCollection.find(s => s.email === email && s.id !== student.id
    );
    if (exists) {
      return res.status(400).json({ error: "Email already exists" });
    }
  }
  Object.assign(student, { name, email, matricNumber, courses });

  res.json({ message: "Student updated", student });
});

//FOR DELETING A USER
app.delete("/students/:id", (req, res) => {
  const { id } = req.params;
  const studentIndex = studentCollection.findIndex(s => s.id === id);

  if (studentIndex === -1) {
    return res.status(404).json({ error: "Student not found" });
  }
  const deletedStudent = studentCollection.splice(studentIndex, 1);
  res.json({ message: "Student deleted successfully", student: deletedStudent[0] });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});