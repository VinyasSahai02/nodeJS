const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require("fs");
const app = express();
const port = 3000;

//you can view headers associated with a req/res in thunderclient
app.get("/api/users", (req, res) => {
    res.setHeader('MyName', 'Vinyas'); //we can set our custom headers also
    //best practise-> add X to custom header --> X-MyName
    console.log(req.headers)
  return res.status(200).json(users);
});
