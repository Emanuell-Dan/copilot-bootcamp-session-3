import React, { useState, useEffect } from 'react';
import { TextField, Button, Paper, Typography, Box, ButtonBase } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';

const PRIORITIES = ['P1', 'P2', 'P3'];

function TaskForm({ onSave, initialTask }) {
  const [title, setTitle] = useState(initialTask?.title || '');
  const [description, setDescription] = useState(initialTask?.description || '');
  const [dueDate, setDueDate] = useState(initialTask?.due_date || '');
  const [priority, setPriority] = useState(initialTask?.priority || 'P3');
  const [error, setError] = useState(null);

  // Helper to normalize date string to YYYY-MM-DD format
  const normalizeDateString = (dateString) => {
    if (!dateString) return '';
    // If already in YYYY-MM-DD format, return as is
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
      return dateString;
    }
    // Otherwise, parse and format
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Update form fields when initialTask changes (editing mode)
  useEffect(() => {
    if (initialTask) {
      setTitle(initialTask.title || '');
      setDescription(initialTask.description || '');
      setDueDate(normalizeDateString(initialTask.due_date));
      setPriority(initialTask.priority || 'P3');
    } else {
      setTitle('');
      setDescription('');
      setDueDate('');
      setPriority('P3');
    }
  }, [initialTask]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Title is required');
      return;
    }
    setError(null);
    await onSave({ title, description, due_date: dueDate, priority });
    setTitle('');
    setDescription('');
    setDueDate('');
    setPriority('P3');
  };

  return (
    <Paper elevation={0} className="task-form-paper">
      <Typography variant="subtitle1" className="task-form-heading">
        {initialTask ? 'Edit Task' : 'Add Task'}
      </Typography>
      <Box component="form" onSubmit={handleSubmit} className="task-form-fields">
        <TextField
          id="task-title"
          label="Task Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
          variant="outlined"
          fullWidth
          size="small"
          inputProps={{ 'data-testid': 'title-input' }}
          className="task-input"
        />
        <TextField
          id="task-description"
          label="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          multiline
          minRows={2}
          variant="outlined"
          fullWidth
          size="small"
          inputProps={{ 'data-testid': 'description-input' }}
          className="task-input"
        />
        <TextField
          id="task-due-date"
          label="Due Date"
          type="date"
          value={dueDate}
          onChange={e => setDueDate(e.target.value)}
          variant="outlined"
          fullWidth
          size="small"
          InputLabelProps={{ shrink: true }}
          inputProps={{ 'data-testid': 'due-date-input' }}
          className="task-input"
        />
        <Box>
          <Typography variant="caption" className="task-priority-label">
            Priority
          </Typography>
          <Box className="task-form-priority-buttons">
            {PRIORITIES.map(p => (
              <ButtonBase
                key={p}
                type="button"
                data-testid={`priority-${p}`}
                onClick={() => setPriority(p)}
                className={`task-form-priority-btn${priority === p ? ' task-form-priority-btn--selected' : ''}`}
              >
                {p}
              </ButtonBase>
            ))}
          </Box>
        </Box>
        {error && <Typography color="error" className="task-form-error">{error}</Typography>}
        <Box className="task-form-submit">
          <Button 
            type="submit" 
            variant="contained" 
            color="primary"
            fullWidth
            data-testid="submit-task"
            startIcon={initialTask ? <SaveIcon /> : <AddIcon />}
            className="task-submit-btn"
          >
            {initialTask ? 'Save Changes' : 'Add Task'}
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}

export default TaskForm;
