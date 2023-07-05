const express = require("express");
const route = express.Router();
const noteController = require("../controllers/note.controller");

// controller

route.get("/", noteController.getAllNote);

route.get("/:id", noteController.getNoteById);

// // route.patch("/:id", userController.editUser);
route.post("/", noteController.postNote);
route.delete("/:id", noteController.deleteNote);

module.exports = route;
