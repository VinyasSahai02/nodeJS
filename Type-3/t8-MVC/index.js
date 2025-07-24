const express = require("express");
const app = express();
const port = 3000;
const userRouter = require("./routes/user");
const {connectMongoDb} = require("./routes/connection");

//Connection
connectMongoDb("mongodb://localhost:27017/myapp").then(() => {console.log("Connected to MongoDB")});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Routes
app.use("/api/users", userRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
