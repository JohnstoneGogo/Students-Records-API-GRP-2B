require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const crypto = require('crypto');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

  const studentSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  matricNumber: String,
  courses: [String]
});

const Student = mongoose.model("Student", studentSchema);

// Sample routes
app.use(express.json());
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ error: "Invalid JSON format" });
  }
  next();
});

const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};
app.get('/students', (req, res) => {
  res.json(studentCollection);
});

//FOR CREATING A USER
app.post("/students", async (req, res) => {
  let { name, email, matricNumber, courses } = req.body;
  name = name?.trim();
  email = email?.trim();
  matricNumber = matricNumber?.trim();
  const existingStudent = await Student.findOne({ email });

  if (!name || !email || !matricNumber || !courses) {
    return res.status(400).json({ error: "All fields are required" });
  }
  if (existingStudent) {
    return res.status(400).json({ error: "Email already exists" });
  }
  if (!isValidEmail(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  const newStudent = new Student({ name, email, matricNumber, courses });
  await newStudent.save();
  res.status(201).json({ message: "New student added successfully", student: newStudent });
  console.log(`New student created: ${newStudent.name}`);
  console.log("Student record created:", newStudent);
});

//FOR GETTING A USER
app.get("/students/:id", async (req, res) => {
  const student = await Student.findById(req.params.id);

  if (!student) {
    return res.status(404).json({ error: "Student not found" });
  }
  res.json(student);
});

//FOR UPDATING A USER
app.put("/students/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email, matricNumber, courses } = req.body;
  const student = await Student.findById(id);

  if (!student) {
    return res.status(404).json({ error: "Student not found" });
  }

  if (name !== undefined) {
    const trimmedName = name.trim();
    if (!trimmedName) {
      return res.status(400).json({ error: "Name cannot be empty" });
    }
    student.name = trimmedName;
  }
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
app.patch("/students/:id", async (req, res) => {
  const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });

  if (!student) {
    return res.status(404).json({ error: "Student not found" });
  }
  const { name, email, matricNumber, courses } = req.body;
  if (name !== undefined) {
    const trimmedName = name.trim();
    if (!trimmedName) {
      return res.status(400).json({ error: "Name cannot be empty" });
    }
    student.name = trimmedName;
  }

  // Validate email only if it's being updated
  if (email !== undefined) {
    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      return res.status(400).json({ error: "Email cannot be empty" });
    }
    if (!isValidEmail(trimmedEmail)) {
      return res.status(400).json({ error: "Invalid email format" });
    }
    student.email = trimmedEmail;
  }

  if (email) {
    if (!isValidEmail(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }
    const exists = studentCollection.find(s => s.email === email && s.id !== student.id
    );
    if (exists) {
      return res.status(400).json({ error: "Email already exists" });
    }
    student.email = email;
  }
  // Only update fields that were sent
  if (name !== undefined) student.name = name;
  if (matricNumber !== undefined) student.matricNumber = matricNumber;
  if (courses !== undefined) student.courses = courses;

  res.json({ message: "Student updated successfully", student });
});

//FOR DELETING A USER
app.delete("/students/:id", async (req, res) => {
  const { id } = req.params;
  const student = await Student.findByIdAndDelete(id);

  if (!student) {
    return res.status(404).json({ error: "Student not found" });
  }
  res.json({ message: "Student deleted successfully", student });
  });

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});