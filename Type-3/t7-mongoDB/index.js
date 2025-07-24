const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 3000;

mongoose
    .connect("mongodb://localhost:27017/myapp") //.connect return a promise
    .then(()=>{console.log("Connected to MongoDB")})
    .catch((err)=>{console.log("Error connecting to MongoDB", err)});

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    jobTitle: {
        type: String,
    },
    gender: {
        type: String,
    },
}, {timeStamp: true})

const User = mongoose.model("user", userSchema); //because of "user" here, automatically a collection is made of the name of "users"

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/users", async (req, res) => {
    const users = await User.find({});
  const html = `
    <ul>
        ${users.map((user) => `<li>${user.firstName} - ${user.email}</li>`).join("")}
    </ul>
    `;
  res.send(html);
});

app.get("/api/users", async (req, res) => {
    const users = await User.find({});
  return res.json(users);
});

app
  .route("/api/users/:id")
  .get(async (req, res) => {
      const user = await User.findById(req.params.id);
      if(!user){
          return res.status(404).json({message: "User not found"})
      }
    return res.json(user);
  })
  .patch(async (req, res) => {
      await User.findByIdAndUpdate(req.params.id, { lastName: "changed" }) //2nd para is what we want to update
      return res.json({status:"success"})
  })
  .delete(async(req, res) => {
      await User.findByIdAndDelete(req.params.id)
      return res.json({ status: "success" });
  });

app.post("/api/users", async (req, res) => {
    const body = req.body
    if(!body || !body.firstName || !body.lastName || !body.email || !body.job_title || !body.gender){
        return res.status(400).json({message: "All fields are required"})
    }
    // const result = await User.create(body);
    const result = await User.create({
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        jobTitle: body.job_title,
        gender: body.gender,
    })
    return res.status(201).json({message: "User created successfully"})
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
