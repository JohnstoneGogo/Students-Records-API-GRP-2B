require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.port || 3000;
const crypto = require('crypto');

//in-memory data store for students
const studentCollection = [];

app.use(express.json());

// Sample route

app.use(express.static('public'));

app.get('/students', (req, res) => {
  res.json(studentCollection);
});

//FOR CREATING A SINGLE USER
app.post("/students", (req, res) => {
  const { name, email, matricNumber, courses } = req.body;

  if (!name || !email || !matricNumber || !courses) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const newStudent = { id: crypto.randomUUID(), name, email, matricNumber, courses };
  studentCollection.push(newStudent);

  res.status(201).json({ message: "New student added successfully", Student: newStudent });
  console.log(`Message: new student alert`);
  console.log("Student record created:", newStudent);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});