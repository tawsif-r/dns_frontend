import React from 'react';
import Home from './components/Home';
import Test from './components/Test';
import SubscribersPage from './pages/SubscribersPage'
import JobsPage from './pages/JobsPage';
import SportsPage from './pages/SportsPage';
import MessagesPage from './pages/MessagesPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/test" element={<Test />} />
          <Route path="/jobs" element={<JobsPage />} />
          <Route path="/sports" element={<SportsPage />} />
          <Route path="/subscribers" element={<SubscribersPage />} />
          <Route path="/messages" element={<MessagesPage />} />
        </Routes>
      </div>
    </Router>

  );
}


export default App;