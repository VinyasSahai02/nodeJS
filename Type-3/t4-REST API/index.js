const express = require('express');
const users = require('./MOCK_DATA.json');
const fs = require('fs');
const app = express();
const port = 3000;

//middleware
app.use(express.urlencoded({ extended: false }));
//jab bhi form data aayega usko ye parse karke body ma daal dega
app.use(express.json()); // Add JSON parsing for request bodies


//html render page
app.get("/users", (req, res) => {
  const html = `
    <ul>
        ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
    </ul>
    `;
  res.send(html);
});

//rest api routes
app.get("/api/users", (req,res) => {
    return res.json(users);
})

// app.get('/api/users/:id', (req, res) => {
//     const id = req.params.id;
//     const user = users.find((user) => user.id === id);
//     return res.json(user);
// })
//since route "/api/user/id" is common in patch and delete also, we can combine our logic

app.route('/api/users/:id')
    .get((req, res) => {
        const id = Number(req.params.id);
        const user = users.find((user) => user.id === id);
        return res.json(user);
    })
    .patch((req, res) => {
      const id = Number(req.params.id);
      const user = users.find((user) => user.id === id);
      const index = users.indexOf(user); // Get the index of the user in the array
      const newUser = req.body; // The updated data sent by the client
      users[index] = { ...user, ...newUser }; // Merge the existing user data with new data
      fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
        return res.json({ Status: "pending" });
      });
    })
    .delete((req, res) => {
      const id = Number(req.params.id); //req.params.id is string
        const user = users.find((user) => user.id === id);
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
      const index = users.indexOf(user);
        users.splice(index, 1)[0]; // Remove the user from the array
        //  we need to get the object and not array as returned by splice method, so '[0]' satisfies this requirement
      fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
        return res.json({ Status: "pending" });
      });
    })


//browers by default use get req, so for post,patch,delete we use thunderclient/postman
app.post("/api/users", (req, res) => {
    const newUser = req.body;
    console.log(newUser); //undefined because express doesnt know what type of data it is and how to handle it
    //so we use middleware
    users.push({...newUser, id: users.length+1});
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
      if (err) {
        return res.status(500).json({ Status: "Error writing file" });
      }
      return res.json({ Status: "Success", newUser });
    });
})


// const users = [{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }];
// console.log(JSON.stringify(users));
// [{"id":1,"name":"Alice"},{"id":2,"name":"Bob"}]

app.listen(port, () => { console.log(`Server is running on port ${port}`) })