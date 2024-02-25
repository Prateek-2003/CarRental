const express = require('express');
const app = express();
const port = process.env.PORT || 5000
const dbConnection = require('./db')
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json())

app.use("https://carrental-2-mk1u.onrender.com/cars/" , require("./routes/carsRoute"))
app.use("https://carrental-2-mk1u.onrender.com/users/" , require("./routes/usersRoute"))
app.use("https://carrental-2-mk1u.onrender.com/bookings/" , require("./routes/bookingsRoute"))



app.get("/", (req, res) => { 
  res.send('Hello World!');
});


    app.listen(port, () => {
      console.log(`Node JS server started in Port ${port}`);
    });