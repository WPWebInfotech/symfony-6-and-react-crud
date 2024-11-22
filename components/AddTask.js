import React, { useState } from "react";
import { createTask } from "../services/api";

function AddTask({ onTaskAdded }) {
  const [title, setTitle] = useState("");
  const [error, setError] = useState(""); // Error handling

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      createTask({ title, completed: false })
        .then(() => {
          setTitle("");
          onTaskAdded(); // Refresh tasks after adding
        })
        .catch((err) => {
          setError("Failed to create task. Please try again.");
          console.error(err);
        });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-task-form">
      <h2>Add Task</h2>
      {error && <div className="error-message">{error}</div>} {/* Display error message */}
      <div className="form-row">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title"
          className="task-input"
        />
        <button type="submit" className="add-btn">Add</button>
      </div>
    </form>
  );
}

export default AddTask;
