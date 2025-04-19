import React from 'react';
import HomePage from './pages/HomePage';
import Test from './components/Test';
import SubscribersPage from './pages/SubscribersPage'
import ContentPage from './pages/ContentPage';
import CategoryPage from './pages/CategoryPage';
import MessagesPage from './pages/MessagesPage';
import SubscriptionPlanPage from './pages/SubscriptionPlanPage'
import TesterPage from './pages/TesterPage';
import ReportsPage from './pages/ReportPage';
import Layout from './components/ui/Layout';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Layout>
            <HomePage />
            </Layout>} />
          <Route path="/test" element={<Layout><Test /></Layout>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/signup" element={<SignUpPage/>} />
          <Route path="/contents" element={<Layout><ContentPage /></Layout>} />
          <Route path="/categories" element={<Layout><CategoryPage /></Layout>} />
          <Route path="/subscribers" element={<Layout><SubscribersPage /></Layout>} />
          <Route path="/subscriptionPlans" element={<Layout><SubscriptionPlanPage /></Layout>} />
          <Route path="/messages" element={<Layout><MessagesPage /></Layout>} />
          <Route path="/reports" element={<Layout><ReportsPage/></Layout>} />
          <Route path="/tester" element={<TesterPage />} />
        </Routes>
      </div>
    </Router>

  );
}


export default App;