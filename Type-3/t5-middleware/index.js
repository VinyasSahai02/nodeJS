const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require("fs");
const app = express();
const port = 3000;

//middleware run sequentially
app.use(express.urlencoded({ extended: false }));
app.use(express.json()); 

app.use((req, res, next) => {
    console.log("Middleware 1");
    next();
})
app.use((req, res, next) => {
    console.log("Middleware 2");
    // return res.end("Hello")
    next(); //routes run after this
})
//when we go to /users
//middleware 1
//middleware 2
//Hello - receieved from server as a simple text
//then we get the users

//middlewares can also make changes to the req and res objects
app.use((req, res, next) => {
    console.log("Middleware 1");
    req.name= "Vinyas"
  next();
});
app.use((req, res, next) => {
  console.log("Middleware 2", req.name);
  next()
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
