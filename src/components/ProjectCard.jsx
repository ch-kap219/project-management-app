import React from 'react';
import { Box, Typography, Button, Paper, Stack } from '@mui/material';

const ProjectCard = ({ project, onDelete, onEdit, onEnter }) => {
    return (
        <Paper elevation={1} sx={{
            p: 2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            border: '1px solid #e0e0e0',
            borderRadius: 2,
            mb: 1,
            width: '100%'
        }}>
            
            <Box sx={{
                display: 'flex',
                flex: 1,
                alignItems: 'center',
                minWidth: 0,
                overflow: 'hidden',
                flexDirection: 'row-reverse', // שומר על כיווניות מימין לשמאל
                mr: 12 // מרחיק את כל גוש הטקסט מהכפתורים בצד שמאל
            }}>

             
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: 'bold',
                        whiteSpace: 'nowrap',
                        flexShrink: 0,
                        textAlign: 'right',
                        ml: 10 // יוצר מרווח גדול בין השם לתיאור שאחריו
                    }}
                >
                    {project.name}
                </Typography>

              
                <Typography
                    variant="body2"
                    color="text.secondary"
                    noWrap
                    sx={{
                        flex: 1, // תופס את שאר השטח הפנוי
                        textAlign: 'right',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                    }}
                >
                    {project.desc}
                </Typography>

            
                <Typography variant="caption" color="text.disabled" sx={{ whiteSpace: 'nowrap', textAlign: 'right', minWidth: '80px' }}>
                    {project.createdAt}
                </Typography>
            </Box>

       
            <Stack direction="row" spacing={1} sx={{ flexShrink: 0 }}>
                <Button variant="outlined" size="small" onClick={() => onEdit(project)}>ערוך</Button>
                <Button variant="outlined" color="error" size="small" onClick={() => onDelete(project.id)}>מחק</Button>
                <Button variant="contained" size="small" onClick={onEnter}>היכנס</Button>
            </Stack>
        </Paper>
    );
};

export default ProjectCard;


