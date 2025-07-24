const User = require('../models/user');

//controllers are basically func that we atttach to our routes

async function handleGetAllUsers(req, res) {
    const users = await User.find({});
    return res.json(users);
}

async function handleGetUserById(req, res) {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json(user);
}

async function handleUpdateUserById(req, res) {
    await User.findByIdAndUpdate(req.params.id, { lastName: "changed" });
    return res.json({ status: "success" });
}

async function handleDeleteUserById(req, res) {
    await User.findByIdAndDelete(req.params.id);
    return res.json({ status: "success" });
}

async function handleCreateNewUser(req, res) {
    const body = req.body;
    if (
      !body ||
      !body.firstName ||
      !body.lastName ||
      !body.email ||
      !body.job_title ||
      !body.gender
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const result = await User.create({
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      jobTitle: body.job_title,
      gender: body.gender,
    });
    return res.status(201).json({ message: "User created successfully", id: result.id });
}

module.exports = {
    handleGetAllUsers,
    handleGetUserById,
    handleUpdateUserById,
    handleDeleteUserById,
    handleCreateNewUser,
}