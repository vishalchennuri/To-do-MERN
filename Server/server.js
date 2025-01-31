const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const TodoModel = require("./models/todo"); // Ensure the correct path is used
const app = express();
require("dotenv").config();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"], // Allow PUT and DELETE
    credentials: true,
  })
);
app.use(express.json());

const DBURL = process.env.DB_URL;
// Connection to MongoDB
mongoose
  .connect(DBURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Could not connect to MongoDB", err);
  });

app.get("/get", (req, res) => {
  TodoModel.find()
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

app.post("/add", (req, res) => {
  const task = req.body.task;
  if (!task) {
    return res.status(400).json({ error: "Task is required" });
  }
  TodoModel.create({ task: task })
    .then((result) => res.json(result))
    .catch((err) => res.status(500).json({ error: err.message }));
});

app.put("/update/:id", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  console.log(`Updating todo with id: ${id}, new status: ${status}`); // Log the request

  TodoModel.findByIdAndUpdate(id, { status }, { new: true })
    .then((updatedTodo) => {
      if (!updatedTodo) {
        return res.status(404).json({ error: "Todo not found" });
      }
      res.json({ message: "Todo item status updated successfully", todo: updatedTodo });
    })
    .catch((err) => res.status(500).json({ error: err.message }));
});

app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  console.log(`Deleting todo with id: ${id}`); // Log the request

  TodoModel.findByIdAndDelete(id)
    .then((deletedTodo) => {
      if (!deletedTodo) {
        return res.status(404).json({ error: "Todo not found" });
      }
      res.json({ message: "Todo item deleted successfully", todo: deletedTodo });
    })
    .catch((err) => res.status(500).json({ error: err.message }));
});

app.listen(4000, () => {
  console.log("THE SERVER AT PORT 4000 HAS STARTED");
});