import React, { useState } from 'react';
import {
    Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Box, Stepper, Step, StepLabel
} from '@mui/material';
import { LocalizationProvider, StaticDatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import dayjs from 'dayjs';


const AddTask = ({ onSave, onCancel, taskToEdit }) => {

    // const AddTask = ({ onSave, onCancel }) => {
    const [activeStep, setActiveStep] = useState(0);

    const [task, setTask] = useState(taskToEdit ? {
        ...taskToEdit,
        // אם יש תאריך, נמיר אותו ל-dayjs, אם לא, נשאיר null
        date: taskToEdit.date ? dayjs(taskToEdit.date) : null
    } : {
        title: '',
        desc: '',
        date: null, 
        status: 1,
        priority: 'לא דחוף'
    });

    // ... בתוך ה-DatePicker עצמו
    <StaticDatePicker
        orientation="landscape"
        value={task.date} 
        onChange={(newDate) => setTask({ ...task, date: newDate })}
    />

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTask(prev => ({ ...prev, [name]: value }));
    };

    const handleNext = () => setActiveStep(prev => prev + 1);
    const handleBack = () => setActiveStep(prev => prev - 1);

    ;
    const handleSave = () => {
       
        const finalTask = taskToEdit
            ? { ...task }
            : { ...task, id: Date.now() };

        onSave(finalTask);
        onCancel();
    };


    return (
        <Dialog open={true} onClose={onCancel} fullWidth maxWidth="sm">
            <DialogTitle>הוספת משימה חדשה</DialogTitle>

            <Stepper activeStep={activeStep} sx={{ p: 2 }}>
                <Step><StepLabel>פרטים</StepLabel></Step>
                <Step><StepLabel>תאריך</StepLabel></Step>
                <Step><StepLabel>סטטוס</StepLabel></Step>
            </Stepper>

            <DialogContent>
                {activeStep === 0 && (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
                        <TextField name="title" label="כותרת" fullWidth value={task.title} onChange={handleChange} />
                        <TextField name="desc" label="פרטי משימה" multiline rows={3} fullWidth value={task.desc} onChange={handleChange} />
                    </Box>
                )}

                {activeStep === 1 && (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <StaticDatePicker
                            orientation="landscape"
                            value={task.date}
                            onChange={(newDate) => setTask({ ...task, date: newDate })}
                        />
                    </LocalizationProvider>
                )}

                {activeStep === 2 && (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
                        <FormControl fullWidth>
                            <InputLabel>סטטוס</InputLabel>
                            <Select name="status" value={task.status} onChange={handleChange}>
                                <MenuItem value={1}>טרם התחיל</MenuItem>
                                <MenuItem value={2}>בביצוע</MenuItem>
                                <MenuItem value={3}>מוכן לבדיקות</MenuItem>
                                <MenuItem value={4}>נבדק</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl fullWidth>
                            <InputLabel>דחיפות</InputLabel>
                            <Select name="priority" value={task.priority} onChange={handleChange}>
                                <MenuItem value="לא דחוף">לא דחוף</MenuItem>
                                <MenuItem value="דחוף">דחוף</MenuItem>
                                <MenuItem value="דחוף מאוד">דחוף מאוד</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                )}
            </DialogContent>
            

            <DialogActions>
             
                <Button type="button" onClick={onCancel}>ביטול</Button>

                {activeStep > 0 && (
                    <Button type="button" onClick={handleBack}>חזור</Button>
                )}

                {activeStep < 2 ? (
                    <Button type="button" variant="contained" onClick={handleNext}>הבא</Button>
                ) : (
                    <Button type="button" variant="contained" color="primary" onClick={handleSave}>
                        שמור משימה
                    </Button>
                )}
            </DialogActions>
        </Dialog>
    );
};

export default AddTask;