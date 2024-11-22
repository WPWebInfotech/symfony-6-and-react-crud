import React, { useState } from "react";
import TaskList from "./components/TaskList";
import AddTask from "./components/AddTask";
import "./styles.css"; // Import the CSS file

function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  // Function to trigger a refresh of tasks after adding or deleting
  const refreshTasks = () => setRefreshKey((key) => key + 1);

  return (
    <div className="app-container">
      {/* Branding at the top */}
      <div className="branding">
        <p><strong>WpWeb Infotech</strong> Example built with <strong>React</strong> and <strong>Symfony 6</strong></p>
      </div>

      <div className="form-container">
        <h1>Task Management</h1>
        <AddTask onTaskAdded={refreshTasks} />
      </div>

      <div className="list-container">
        <TaskList refreshTasks={refreshTasks} refreshKey={refreshKey} />
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2024 WpWeb Infotech. All Rights Reserved.</p>
        <p className="footer-icon">🚀</p> {/* Optional icon for extra flair */}
      </footer>
    </div>
  );
}

export default App;
