import React, { useState, useEffect } from 'react';
import { Paper, Typography, IconButton, Box, Container, Grid } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddTask from './AddTask';
import TaskColumn from './TaskColumn';
import TaskDetails from './TaskDetails';
import { useParams } from 'react-router-dom';

const HomePage = () => {
    const [selectedTask, setSelectedTask] = useState(null);
    const [sections, setSections] = useState([

        { id: 1, title: 'משימות שלא בוצעו עדיין', tasks: [{ title: 'משימה דוגמה', desc: 'תיאור המשימה' }] },
        { id: 2, title: 'משימות בביצוע ע"י המפתח', tasks: [] },
        { id: 3, title: 'משימות שמוכנות לבדיקות', tasks: [] },
        { id: 4, title: 'משימות שכבר נבדקו', tasks: [] }
    ]);

    const totalTasks = sections.reduce((acc, s) => acc + s.tasks.length, 0);
    const [showAddTask, setShowAddTask] = useState(false);
    const [taskToDelete, setTaskToDelete] = useState(null);
    const { projectId } = useParams();
    // ניצור מפתח ייחודי לכל פרויקט
    const storageKey = `tasks_project_${projectId}`;


    const handleSaveTask = (taskData) => {
        //  הסרת המשימה מכל מקום שהיא הייתה בו קודם
        let sectionsWithoutTask = sections.map(section => ({
            ...section,
            tasks: section.tasks.filter(t => t.id !== taskData.id)
        }));

        //  הוספת המשימה לעמודה החדשה לפי ה-status שלה
        const updatedSections = sectionsWithoutTask.map(section => {
            if (section.id === parseInt(taskData.status)) {
                return {
                    ...section,
                    tasks: [...section.tasks, taskData]
                };
            }
            return section;
        });

        setSections(updatedSections);
        localStorage.setItem(storageKey, JSON.stringify(updatedSections));
        // איפוס 
        setShowAddTask(false);
        setEditingTask(null);
        setSelectedTask(null);
    };

    // פונקציה שנקראת מהכפתור "מחק" בדיאלוג הראשי
    const confirmDelete = (task) => {
        setTaskToDelete(task);
    };

    // פונקציה שבאמת מוחקת מהמערך
    const executeDelete = () => {
        const updatedSections = sections.map(section => ({
            ...section,
            tasks: section.tasks.filter(t => t.id !== taskToDelete.id)
        }));

        setSections(updatedSections);
        localStorage.setItem(storageKey, JSON.stringify(updatedSections));
        setTaskToDelete(null); // איפוס
        setSelectedTask(null);
    };
    // useEffect(() => {
    //     const saved = localStorage.getItem('myTasks');
    //     if (saved && saved !== "undefined") { //  בדיקה שהערך לא undefined
    //         try {
    //             setSections(JSON.parse(saved));
    //         } catch (e) {
    //             console.error("שגיאה בפענוח הנתונים", e);
    //         }
    //     }
    // }, []);


    useEffect(() => {
        const saved = localStorage.getItem(storageKey); // שימוש במפתח הייחודי
        if (saved && saved !== "undefined") {
            try {
                setSections(JSON.parse(saved));
            } catch (e) {
                console.error("שגיאה בפענוח הנתונים", e);
            }
        } else {
            // אם אין נתונים לפרויקט הזה, נחזור לברירת המחדל הריקה
            setSections([
                { id: 1, title: 'משימות שלא בוצעו עדיין', tasks: [] },
                { id: 2, title: 'משימות בביצוע ע"י המפתח', tasks: [] },
                { id: 3, title: 'משימות שמוכנות לבדיקות', tasks: [] },
                { id: 4, title: 'משימות שכבר נבדקו', tasks: [] }
            ]);
        }
    }, [storageKey]); // ה-Effect ירוץ מחדש כשעוברים פרויקט



    const handleStatusChange = (task, newStatus) => {
        // יוצרים עותק חדש של המערך ומעדכנים את הסטטוס
        const updatedSections = sections.map(section => ({
            ...section,
            tasks: section.tasks.filter(t => t.id !== task.id) // מסירים מהעמודה הישנה
        })).map(section => {
            if (section.id === parseInt(newStatus)) { // מוסיפים לעמודה החדשה
                return {
                    ...section,
                    tasks: [...section.tasks, { ...task, status: newStatus }]
                };
            }
            return section;
        });

        setSections(updatedSections);
        localStorage.setItem(storageKey, JSON.stringify(updatedSections));
    };

    const [editingTask, setEditingTask] = useState(null);


    return (
        <div>
            <Box sx={{
                width: '100vw', minHeight: '100vh', bgcolor: '#f4f6f8', margin: 0, padding: 0
            }}>
                {/* 3. אזור הכותרת: מלבן עליון צבעוני ורחב */}
                <Paper elevation={3} sx={{
                    width: '100%', py: 3, px: 5, mb: 4,
                    bgcolor: '#ffffff', borderBottom: '4px solid #3f51b5',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <AccountCircleIcon sx={{ fontSize: 45, color: '#3f51b5' }} />
                        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>שלום, ברוך הבא!</Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, bgcolor: '#f5f7fa', p: 1.5, borderRadius: 2 }}>
                        <Typography variant="h6">סה"כ משימות בכללי: {totalTasks}</Typography>
                        <IconButton
                            color="primary"
                            onClick={(e) => {
                                e.stopPropagation();
                                setShowAddTask(true);
                            }}
                            sx={{
                                position: 'relative',
                                zIndex: 9999,
                                pointerEvents: 'auto'
                            }}>

                            <AddCircleOutlineIcon sx={{ fontSize: 40 }} />

                        </IconButton>

                    </Box>
                </Paper>

                {/* 4. אזור התוכן: Container רחב במיוחד שפורס את הריבועים על כל הדף */}
                <Container maxWidth="xl">

                    <Grid container spacing={4} justifyContent="center" alignItems="stretch">
                        {sections.map((section) => (
                            <TaskColumn
                                key={section.id}
                                section={section}
                                onTaskClick={setSelectedTask}
                            />
                        ))}
                    </Grid>
                </Container>

                <TaskDetails
                    selectedTask={selectedTask}
                    onClose={() => setSelectedTask(null)}
                    onEdit={() => { setEditingTask(selectedTask); setShowAddTask(true); }}
                    onDelete={() => confirmDelete(selectedTask)}
                    taskToDelete={taskToDelete}
                    setTaskToDelete={setTaskToDelete}
                    executeDelete={executeDelete}
                    onStatusChange={handleStatusChange}
                />

                {showAddTask && (
                    <AddTask
                        taskToEdit={editingTask} // מעבירים את המשימה אם קיימת
                        onSave={handleSaveTask}  // משתמשים בפונקציה החדשה
                        onCancel={() => {
                            setShowAddTask(false);
                            setEditingTask(null);
                        }}
                    />
                )}
            </Box>
        </div >
    );

};

export default HomePage;