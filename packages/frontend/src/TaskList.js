import React, { useState, useEffect } from 'react';
import {
  List, ListItem, ListItemText, IconButton, Checkbox, Typography, Box, CircularProgress, Paper, Chip, ButtonBase
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import EventIcon from '@mui/icons-material/Event';

function TaskList({ onEdit }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const formatDueDate = (dateString) => {
    if (!dateString) return null;
    // Parse as local date to avoid timezone offset issues
    const [year, month, day] = dateString.split('-');
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/tasks');
      if (!response.ok) throw new Error('Failed to fetch tasks');
      const data = await response.json();
      setTasks(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleComplete = async (task) => {
    try {
      await fetch(`/api/tasks/${task.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !task.completed })
      });
      fetchTasks();
    } catch (err) {
      setError('Failed to update task');
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/tasks/${id}`, { method: 'DELETE' });
      fetchTasks();
    } catch (err) {
      setError('Failed to delete task');
    }
  };

  if (loading) return (
    <Box className="task-list-loading">
      <CircularProgress className="task-list-loading__spinner" />
    </Box>
  );
  if (error) return <Typography color="error" className="task-list-error">{error}</Typography>;

  return (
    <Paper elevation={0} className="task-list-paper">
      <Typography variant="subtitle1" className="task-list-heading">
        Tasks
      </Typography>
      <List className="task-list">
        {tasks.length === 0 && (
          <Box className="task-list-empty">
            <Typography variant="body2">No tasks found.</Typography>
          </Box>
        )}
        {tasks.map((task, index) => (
          <ListItem
            key={task.id}
            className={`task-item${task.completed ? ' task-item--completed' : ''}`}
          >
            <Checkbox
              edge="start"
              checked={!!task.completed}
              onChange={() => handleToggleComplete(task)}
              inputProps={{ 'aria-label': 'Mark task complete' }}
              size="small"
              className="task-checkbox"
            />
            <ListItemText
              primary={
                <Typography
                  variant="body2"
                  className={`task-title${task.completed ? ' task-title--completed' : ''}`}
                >
                  {task.title}
                </Typography>
              }
              secondary={
                task.description && (
                  <Typography
                    variant="body2"
                    className={`task-description${task.completed ? ' task-description--completed' : ''}`}
                  >
                    {task.description}
                  </Typography>
                )
              }
            />
            <Box className="task-actions">
              {task.due_date && (
                <Chip
                  icon={<EventIcon />}
                  label={formatDueDate(task.due_date)}
                  size="small"
                  className="task-due-date-chip"
                />
              )}
              <Box className="task-priority-buttons">
                {['P1', 'P2', 'P3'].map(p => (
                  <ButtonBase
                    key={p}
                    aria-label={`Set priority ${p}`}
                    onClick={async () => {
                      await fetch(`/api/tasks/${task.id}`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ ...task, priority: p })
                      });
                      fetchTasks();
                    }}
                    className={`task-priority-btn${(task.priority || 'P3') === p ? ' task-priority-btn--selected' : ''}`}
                  >
                    {p}
                  </ButtonBase>
                ))}
              </Box>
              <Box className="task-edit-delete-buttons">
                <IconButton
                  aria-label="edit"
                  onClick={() => onEdit(task)}
                  size="small"
                  className="task-edit-btn"
                >
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton
                  aria-label="delete"
                  onClick={() => handleDelete(task.id)}
                  size="small"
                  className="task-delete-btn"
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}

export default TaskList;
