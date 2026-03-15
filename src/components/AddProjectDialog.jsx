import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';

function AddProjectDialog({ open, onClose, onSave }) {
    const [project, setProject] = useState({ name: '', desc: '' });

    const handleSave = () => {
        onSave(project); // מעביר את הנתונים ל-ProjectsPage
        setProject({ name: '', desc: '' });
        onClose();
    };

    return (
        <div>
            <Dialog open={open} onClose={onClose}>
                <DialogTitle>הוספת פרויקט חדש</DialogTitle>
                <DialogContent>
                    <TextField fullWidth label="שם הפרויקט" margin="dense"
                        onChange={(e) => setProject({ ...project, name: e.target.value })} />
                    <TextField fullWidth label="תיאור" margin="dense"
                        onChange={(e) => setProject({ ...project, desc: e.target.value })} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>ביטול</Button>
                    <Button onClick={handleSave} variant="contained">שמור</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default AddProjectDialog;