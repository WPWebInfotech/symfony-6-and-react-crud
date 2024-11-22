// src/services/api.js
import axios from "axios";

// Axios instance for API requests
const API = axios.create({
    baseURL: "/api", // Proxy to Symfony backend
    headers: {
        "Content-Type": "application/json", // Ensure Content-Type is JSON
    },
});

// Get all tasks
export const getTasks = () => API.get("/tasks").catch((error) => {
    console.error("Error fetching tasks:", error);
    throw error;
});

// Create a task
export const createTask = (task) => API.post("/tasks", task).catch((error) => {
    console.error("Error creating task:", error);
    throw error;
});

// Delete a task
export const deleteTask = (id) => API.delete(`/tasks/${id}`).catch((error) => {
    console.error("Error deleting task:", error);
    throw error;
});

// Update a task
export const updateTask = (id, updatedTask) => {
    return API.put(`/tasks/${id}`, updatedTask).catch((error) => {
        console.error("Error updating task:", error);
        throw error;
    });
};

