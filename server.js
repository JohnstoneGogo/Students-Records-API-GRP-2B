require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT ;

app.use(express.json());

// Sample route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});