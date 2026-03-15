import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage'; // זה יהיה דף המשימות של פרויקט ספציפי
import ProjectsPage from './components/ProjectsPage'; // נוסיף את זה

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/projectspage" element={<ProjectsPage />} />
        <Route path="/projectspage/:projectId" element={<HomePage />} /> 
      </Routes>
    </Router>
  );
}

export default App;