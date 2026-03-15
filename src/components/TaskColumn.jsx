import React from 'react';
import { Grid, Paper, Typography, List, ListItem, ListItemText, Box, Divider } from '@mui/material';

const TaskColumn = ({ section, onTaskClick }) => {
    return (
        <Grid item xs={12} sm={6} md={3}>
            <Paper elevation={4} sx={{ p: 3, height: '450px', borderTop: '6px solid #3f51b5', borderRadius: 2 }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>{section.title}</Typography>
                <List>
                    {section.tasks.map((task, index) => (
                        <ListItem key={task.id || index} sx={{ cursor: 'pointer' }} onClick={() => onTaskClick(task)}>
                            <ListItemText primary={task.title} secondary={task.desc} />
                        </ListItem>
                    ))}
                </List>
                <Box>
                    <Divider sx={{ mb: 2 }} />
                    <Typography variant="subtitle1">משימות בחלק זה: {section.tasks.length}</Typography>
                </Box>
            </Paper>
        </Grid>
    );
};

export default TaskColumn;