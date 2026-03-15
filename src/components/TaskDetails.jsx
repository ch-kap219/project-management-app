import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Box, Typography, Divider, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const TaskDetails = ({ selectedTask, onClose, onEdit, onDelete, taskToDelete, setTaskToDelete, executeDelete, onStatusChange }) => {
    return (
        <>

            <Dialog open={!!selectedTask} onClose={onClose} maxWidth="sm" fullWidth>
                {selectedTask && (
                    <>
                        <DialogTitle sx={{ bgcolor: '#3f51b5', color: 'white', mb: 1 }}>
                            פרטי משימה: {selectedTask.title}
                        </DialogTitle>
                        <DialogContent dividers>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                <Typography variant="body1">
                                    <strong>תיאור:</strong><br /> {selectedTask.desc}
                                </Typography>
                                <Divider />
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <strong>תאריך:</strong> {selectedTask.date ? selectedTask.date.toString() : 'לא צוין'}
                                    <Typography variant="body2" color="text.secondary">
                                        <strong>סטטוס:</strong> {selectedTask.statusName || selectedTask.status}
                                    </Typography>
                                </Box>
                            </Box>
                        </DialogContent>
                        <DialogActions sx={{ p: 2, justifyContent: 'space-between' }}>
                            <Box sx={{ display: 'flex', gap: 1 }}>
                                <Button variant="outlined" startIcon={<EditIcon />} onClick={onEdit}>ערוך</Button>
                                <Button variant="outlined" color="error" startIcon={<DeleteIcon />} onClick={() => setTaskToDelete(selectedTask)}>מחק</Button>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={() => {
                                        const nextStatus = parseInt(selectedTask.status) + 1;
                                        onStatusChange(selectedTask, nextStatus);
                                        onClose();
                                    }}
                                >
                                    העבר לשלב הבא
                                </Button>
                            </Box>
                            <Button onClick={onClose} variant="contained" color="primary">סגור</Button>
                        </DialogActions>
                    </>
                )}
            </Dialog>

            <Dialog open={!!taskToDelete} onClose={() => setTaskToDelete(null)}>
                <DialogTitle>האם את/ה בטוח/ה?</DialogTitle>
                <DialogContent>
                    <Typography>האם ברצונך למחוק לצמיתות את המשימה "{taskToDelete?.title}"?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setTaskToDelete(null)}>ביטול</Button>
                    <Button onClick={executeDelete} color="error" variant="contained">מחק</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default TaskDetails;