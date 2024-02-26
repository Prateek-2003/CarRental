const express = require('express');
const app = express();
const port = process.env.PORT || 5000
const dbConnection = require('./db')
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json())

app.use("https://carrental-x7uq.onrender.com/api/cars/" , require("./routes/carsRoute"))
app.use("/api/users/" , require("./routes/usersRoute"))
app.use("/api/bookings/" , require("./routes/bookingsRoute"))



app.get("/", (req, res) => { 
  res.send('Hello World!');
});


    app.listen(port, () => {
      console.log(`Node JS server started in Port ${port}`);
    });