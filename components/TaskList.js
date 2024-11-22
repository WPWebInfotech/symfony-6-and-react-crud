import React, { useState, useEffect } from "react";
import { getTasks, deleteTask, updateTask } from "../services/api";
import './TaskList.css';

function TaskList({ refreshKey, refreshTasks }) {
  const [tasks, setTasks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [currentTaskId, setCurrentTaskId] = useState(null);

  useEffect(() => {
    getTasks()
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
      });
  }, [refreshKey]);

  const handleDelete = (id) => {
    deleteTask(id)
      .then(() => {
        setTasks(tasks.filter((task) => task.id !== id));
        refreshTasks();
      })
      .catch((error) => {
        console.error("Error deleting task:", error);
      });
  };

  const handleEdit = (task) => {
    setIsEditing(true);
    setEditedTitle(task.title);
    setCurrentTaskId(task.id);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (editedTitle.trim()) {
      updateTask(currentTaskId, { title: editedTitle })
        .then(() => {
          setIsEditing(false);
          setEditedTitle("");
          setCurrentTaskId(null);
          refreshTasks();
        })
        .catch((error) => {
          console.error("Error updating task:", error);
        });
    }
  };

  return (
    <div>
      <h2>Task List</h2>
      <div className="task-list-container">
        <ul>
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <li key={task.id} className="task-item">
                {isEditing && currentTaskId === task.id ? (
                  <form onSubmit={handleUpdate} className="edit-form">
                    <input
                      type="text"
                      value={editedTitle}
                      onChange={(e) => setEditedTitle(e.target.value)}
                      className="edit-input"
                    />
                    <button type="submit" className="save-btn">Save</button>
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="cancel-btn"
                    >
                      Cancel
                    </button>
                  </form>
                ) : (
                  <>
                    <span className="task-title">{task.title}</span>
                    <div className="task-actions">
                      <button
                        onClick={() => handleEdit(task)}
                        className="edit-btn"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(task.id)}
                        className="delete-btn"
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))
          ) : (
            <p className="no-task-message">No tasks available</p>
          )}
        </ul>
      </div>
    </div>
  );
}

export default TaskList;
