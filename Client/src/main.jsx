import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Home.jsx';
import Projects from './Components/Projects.jsx';
import Form from './Components/Form.jsx';
import SignForm from './Components/SignForm.jsx';
import Dashboard from './Components/Dashboard.jsx';

createRoot(document.getElementById('root')).render(
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/login" element={<Form />} />
      <Route path="/Sign" element={<SignForm />} />
    </Routes>
  </Router>
);
