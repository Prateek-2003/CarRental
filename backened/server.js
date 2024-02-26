const express = require('express');
const app = express();
const port = process.env.PORT || 5000
const dbConnection = require('./db')
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use(express.json())

app.use("/api/cars/" , require("./routes/carsRoute"))
app.use("/api/users/" , require("./routes/usersRoute"))
app.use("/api/bookings/" , require("./routes/bookingsRoute"))



app.get("https://carrental-x7uq.onrender.com", (req, res) => { 
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
 // res.send('Hello World!');
});


    app.listen(port, () => {
      console.log(`Node JS server started in Port ${port}`);
    });