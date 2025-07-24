const express = require("express");
const router = express.Router();

const {
  handleGetAllUsers,
  handleGetUserById,
  handleUpdateUserById,
  handleDeleteUserById,
  handleCreateNewUser,
} = require("../controllers/user");

//as all the routes have /user
// we can remove /users from all the routes

//Statement - app.use("/api/users", userRouter);
// router.get("/", handleGetAllUsers); //basically means /api/users because of Statement

router
  .route("/:id") // basically means /api/users/:id
  .get(handleGetUserById)
  .patch(handleUpdateUserById)
  .delete(handleDeleteUserById);

// router.post("/", handleCreateNewUser);

//post and get had the same "/" route
//so we can combine them
router
  .route("/")
  .get(handleGetAllUsers)
  .post(handleCreateNewUser);

module.exports = router;
