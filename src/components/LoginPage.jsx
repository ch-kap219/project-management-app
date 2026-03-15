import React, { useState } from 'react';
import { Box, Paper, TextField, Button, ButtonGroup, Popper, Grow, Paper as MenuPaper, ClickAwayListener, MenuList, MenuItem } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {

    // יוצרים את הזיכרון של הכפתור
    // buttonText זה השם של המשתנה, התחלה הוא יהיה "התחבר"
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
                display: 'flex',          // הופך את הקופסה למערכת סידור מודרנית
                justifyContent: 'center', // מרכז הכל לצדדים (ימין-שמאל)
                alignItems: 'center',     // מרכז הכל למעלה-למטה
                minHeight: '100vh',       // מכריח את הקופסה להיות בגובה כל המסך
                width: '100vw',           // מכריח את הקופסה להיות ברוחב כל המסך
                bgcolor: '#f5f5f5',       // צבע רקע לכל המסך
                flexDirection: 'column'   // מסדר הכל בטור אחד
            }}>

                <Paper elevation={3} sx={{ padding: 4, width: '300px', textAlign: 'center' }}>
                    <h3>התחברות</h3>
                    <TextField
                        label="שם משתמש"
                        variant="standard"
                        fullWidth
                        margin="normal"
                        value={username} // זה חסר לך!
                        onChange={(e) => setUsername(e.target.value)} // זה חסר לך!
                    />

                    <TextField
                        label="סיסמה"
                        type="password"
                        variant="standard"
                        fullWidth
                        margin="normal"
                        value={password} // זה חסר לך!
                        onChange={(e) => setPassword(e.target.value)} // זה חסר לך!
                    />

                    {/* הכפתור המפוצל */}
                    <ButtonGroup variant="contained" ref={anchorRef} fullWidth sx={{ mt: 3 }}>

                        {/* כפתור הפעולה הראשי */}
                        <Button onClick={handleLogin}>
                            {buttonText}
                        </Button>

                        {/* כפתור החץ לפתיחת התפריט */}
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