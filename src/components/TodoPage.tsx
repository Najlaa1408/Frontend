import { Check, Delete, Edit } from '@mui/icons-material';
import { Box, Button, Container, IconButton, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch.ts';
import { Task } from '../index';

const TodoPage = () => {
  const api = useFetch();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskName, setNewTaskName] = useState('');
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [editedTaskName, setEditedTaskName] = useState(''); 

  const handleFetchTasks = async () => setTasks(await api.get('/tasks'));

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/tasks/${id}`);
      handleFetchTasks();
    } catch (err) {
      console.error('Erreur lors de la suppression de la tâche :', err);
    }
  };

  const handleSave = async () => {
    try {
      if (editingTaskId) {
        await api.patch(`/tasks/${editingTaskId}`, { name: editedTaskName });
        setEditingTaskId(null);
        setEditedTaskName('');
      } else {
        await api.post('/tasks', { name: newTaskName });
        setNewTaskName('');
      }
      handleFetchTasks();
    } catch (err) {
      console.error('Erreur lors de la création ou modification de tâche :', err);
    }
  };

  const handleEdit = (taskId: number, taskName: string) => {
    setEditingTaskId(taskId);
    setEditedTaskName(taskName); 
  };

  useEffect(() => {
    (async () => {
      handleFetchTasks();
    })();
  }, []);

  return (
    <Container>
      <Box display="flex" justifyContent="center" mt={5}>
        <Typography variant="h2">HDM Todo List</Typography>
      </Box>

      <Box justifyContent="center" mt={5} flexDirection="column">
        {tasks.map((task) => (
          <Box display="flex" justifyContent="center" alignItems="center" mt={2} gap={1} width="100%" key={task.id}>
            {editingTaskId === task.id ? (
              <TextField
                size="small"
                value={editedTaskName}
                onChange={(e) => setEditedTaskName(e.target.value)}
                fullWidth
                sx={{ maxWidth: 350 }}
              />
            ) : (
              <TextField
                size="small"
                value={task.name}
                fullWidth
                sx={{ maxWidth: 350 }}
                disabled
              />
            )}

            <Box>
              {editingTaskId === task.id ? (
                <IconButton color="success" onClick={handleSave} disabled={!editedTaskName.trim()}>
                  <Check />
                </IconButton>
              ) : (
                <IconButton color="primary" onClick={() => handleEdit(task.id, task.name)}>
                  <Edit />
                </IconButton>
              )}
              <IconButton color="error" onClick={() => handleDelete(task.id)}>
                <Delete />
              </IconButton>
            </Box>
          </Box>
        ))}

        {}
        <Box display="flex" justifyContent="center" alignItems="center" mt={4} gap={1}>
          <TextField
            size="small"
            value={newTaskName}
            onChange={(e) => setNewTaskName(e.target.value)}
            placeholder="Nouvelle tâche"
            sx={{ maxWidth: 300 }}
            disabled={editingTaskId !== null} 
          />
          <Button variant="outlined" onClick={handleSave} disabled={!newTaskName.trim() || editingTaskId !== null}>
            Ajouter une tâche
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default TodoPage;
