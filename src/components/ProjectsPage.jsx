import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Box, Paper, Typography, IconButton, Container, Stack } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; // הוספתי את זה
import AddProjectDialog from './AddProjectDialog';
import ProjectCard from './ProjectCard';

function ProjectsPage() {


    const [projects, setProjects] = useState([]);
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [editingProject, setEditingProject] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem('myProjects')) || [];
        setProjects(stored);
    }, []);

    const saveProject = (projectData) => {
        if (editingProject) {
            
            const updated = projects.map(p =>
                p.id === editingProject.id
                    ? { ...projectData, id: p.id, createdAt: editingProject.createdAt }
                    : p
            );
            setProjects(updated);
            localStorage.setItem('myProjects', JSON.stringify(updated));
        } else {
            const newProject = {
                ...projectData,
                id: Date.now().toString(),
                createdAt: new Date().toLocaleDateString('he-IL')
            };
            const updated = [...projects, newProject];
            setProjects(updated);
            localStorage.setItem('myProjects', JSON.stringify(updated));
        }

        setEditingProject(null);
        setDialogOpen(false);
    };





    const handleEditProject = (project) => {
        setEditingProject(project); // שומרים איזה פרויקט בחרנו לערוך
        setDialogOpen(true);        // פותחים את הדיאלוג
    };

    const handleEnterProject = (projectId) => {
        navigate(`/projectspage/${projectId}`);
    };

    const handleDeleteProject = (id) => {
        const updated = projects.filter(p => p.id !== id);
        setProjects(updated);
        localStorage.setItem('myProjects', JSON.stringify(updated));
    };

    return (

        
        <Box sx={{ width: '100vw', minHeight: '100vh', bgcolor: '#f4f6f8', pb: 4 }}>
            {/* פס כחול עליון כמו במשימות */}
            <Paper elevation={0} sx={{
                width: '100%', py: 3, px: 5, mb: 4,
                bgcolor: '#ffffff', borderBottom: '4px solid #3f51b5',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center'
            }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <AccountCircleIcon sx={{ fontSize: 40, color: '#3f51b5' }} />
                    <Typography variant="h5" sx={{ fontWeight: 'bold' }}>שלום, ברוך הבא!</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Typography variant="h6">סה"כ פרויקטים: {projects.length}</Typography>
                    <IconButton color="primary" onClick={() => { setEditingProject(null); setDialogOpen(true); }}>
                        <AddCircleOutlineIcon sx={{ fontSize: 40 }} />
                    </IconButton>
                </Box>
            </Paper>

            <Container maxWidth="md">
                <Stack spacing={2}>
                    {projects.map((proj) => (
                        <ProjectCard
                            key={proj.id}
                            project={proj}
                            onDelete={handleDeleteProject}
                            onEdit={handleEditProject}
                            onEnter={() => handleEnterProject(proj.id)}
                        />
                    ))}
                </Stack>
            </Container>

            <AddProjectDialog
                open={isDialogOpen}
                onClose={() => { setDialogOpen(false); setEditingProject(null); }}
                onSave={saveProject}
                projectToEdit={editingProject}
            />
        </Box>
    );
}

export default ProjectsPage;