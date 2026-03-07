import React, { useState } from 'react';
import './App.css';
import { CssBaseline, Container, AppBar, Toolbar, Typography, Box } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import TaskList from './TaskList';
import TaskForm from './TaskForm';

function App() {
  const [editingTask, setEditingTask] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleSave = async (task) => {
    if (editingTask) {
      // Edit existing task
      await fetch(`/api/tasks/${editingTask.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task)
      });
      setEditingTask(null);
    } else {
      // Add new task
      await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task)
      });
    }
    setRefreshKey(k => k + 1);
  };

  return (
    <>
      <CssBaseline />
      <Box className="app-background">
        <AppBar position="static" className="app-bar">
          <Toolbar>
            <CheckCircleOutlineIcon className="app-bar-icon" />
            <Typography variant="h5" className="app-title">
              TODO App
            </Typography>
          </Toolbar>
        </AppBar>
        <Container maxWidth="md" className="app-container">
          <Box className="app-form-wrapper">
            <TaskForm onSave={handleSave} initialTask={editingTask} />
          </Box>
          <Box className="app-list-wrapper">
            <TaskList key={refreshKey} onEdit={setEditingTask} />
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default App;
