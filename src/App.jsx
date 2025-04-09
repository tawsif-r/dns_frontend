import React from 'react';
import HomePage from './pages/HomePage';
import Test from './components/Test';
import SubscribersPage from './pages/SubscribersPage'
import ContentPage from './pages/ContentPage';
import CategoryPage from './pages/CategoryPage';
import MessagesPage from './pages/MessagesPage';
import SubscriptionPlanPage from './pages/SubscriptionPlanPage'
import TesterPage from './pages/TesterPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/test" element={<Test />} />
          <Route path="/contents" element={<ContentPage />} />
          <Route path="/categories" element={<CategoryPage />} />
          <Route path="/subscribers" element={<SubscribersPage />} />
          <Route path="/subscriptionPlans" element={<SubscriptionPlanPage />} />
          <Route path="/messages" element={<MessagesPage />} />
          <Route path="/tester" element={<TesterPage />} />
        </Routes>
      </div>
    </Router>

  );
}


export default App;