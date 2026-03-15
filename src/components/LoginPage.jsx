import React, { useState } from 'react';
import { Box, Paper, TextField, Button, ButtonGroup, Popper, Grow, Paper as MenuPaper, ClickAwayListener, MenuList, MenuItem } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {

    // יוצרים את הזיכרון של הכפתור
    const [buttonText, setButtonText] = useState('התחבר');
    const [open, setOpen] = useState(false);
    const anchorRef = React.useRef(null);
    const allOptions = ['התחבר', 'משתמש חדש'];
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();


    const handleLogin = () => {

        // 1. בדיקה מה המשתמש הקליד
        console.log("Button Text:", buttonText);
        console.log("Username:", username);

        const savedUser = localStorage.getItem(username);

        // 2. לוגיקה של משתמש חדש
        if (buttonText === 'משתמש חדש') {
            if (savedUser !== null) {
                alert("שם המשתמש תפוס!");
            } else if (username === '' || password === '') {
                alert("נא למלא שם וסיסמה");
            } else {
                const newUser = { username: username, password: password, tasks: [] };
                localStorage.setItem(username, JSON.stringify(newUser));
                alert("נוסף בהצלחה!");
                navigate('/projectspage');
            }
        }
        // 3. לוגיקה של התחברות
        else {
            if (savedUser === null) {
                alert("משתמש לא קיים");
            } else {
                const userData = JSON.parse(savedUser);
                if (userData.password === password) {
                    // בתוך handleLogin, איפה שזיהינו שהסיסמה נכונה:
                    alert("התחברת בהצלחה!");
                    localStorage.setItem('currentUser', username); // הוסף את השורה הזו!
                    navigate('/projectspage');
                } else {
                    alert("סיסמה שגויה");
                }
            }
        }
    };
    return (
        

            <Box sx={{
                display: 'flex',          
                justifyContent: 'center', 
                alignItems: 'center',     
                minHeight: '100vh',       
                width: '100vw',         
                bgcolor: '#f5f5f5',     
                flexDirection: 'column'  
            }}>

                <Paper elevation={3} sx={{ padding: 4, width: '300px', textAlign: 'center' }}>
                    <h3>התחברות</h3>
                    <TextField
                        label="שם משתמש"
                        variant="standard"
                        fullWidth
                        margin="normal"
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                    />

                    <TextField
                        label="סיסמה"
                        type="password"
                        variant="standard"
                        fullWidth
                        margin="normal"
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    {/* הכפתור המפוצל */}
                    <ButtonGroup variant="contained" ref={anchorRef} fullWidth sx={{ mt: 3 }}>

                        {/* כפתור הפעולה הראשי */}
                        <Button onClick={handleLogin}>
                            {buttonText}
                        </Button>

                        {/* כפתור החץ לפתיחת התפריט  */}
                        <Button
                            size="small"
                            onClick={() => setOpen(!open)}
                            sx={{ maxWidth: '40px' }}
                        >
                            <ArrowDropDownIcon />
                        </Button>

                    </ButtonGroup>

                    <Popper open={open} anchorEl={anchorRef.current} transition disablePortal>
                        {({ TransitionProps }) => (
                            <Grow {...TransitionProps}>
                                <MenuPaper>
                                    <ClickAwayListener onClickAway={() => setOpen(false)}>
                                        <MenuList>
                                            {allOptions
                                                .filter((option) => option !== buttonText) // סינון: מציג רק מה שלא בחרנו
                                                .map((option) => (
                                                    <MenuItem key={option} onClick={() => { setButtonText(option); setOpen(false); }}>
                                                        {option}
                                                    </MenuItem>
                                                ))}
                                        </MenuList>
                                    </ClickAwayListener>
                                </MenuPaper>
                            </Grow>
                        )}
                    </Popper>
                </Paper>
            </Box>
        

    );
}