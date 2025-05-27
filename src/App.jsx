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
import OperatorsPage from './pages/OperatorsPage';
import JobEntryPage from './pages/JobEntryPage';
import SignUpPage from './pages/SignUpPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './components/context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import TestSubscribersPage from './pages/TestSubscribersPage';

function App() {
  return (
    <Router>
      <div>
        {/* <AuthProvider> */}
          <Routes>
            <Route path="/" element={<Layout>
              <HomePage />
            </Layout>} />
            {/* <Route path="/test" element={<ProtectedRoute><Layout><Test /></Layout></ProtectedRoute>} /> */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/contents" element={<Layout><ContentPage /></Layout>} />
            <Route path="/categories" element={<Layout><CategoryPage /></Layout>} />
            <Route path="/operators" element={<Layout><OperatorsPage /></Layout>} />
            <Route path="/subscribers" element={<Layout><SubscribersPage /></Layout>} />
            <Route path="/subscriptionPlans" element={<Layout><SubscriptionPlanPage /></Layout>} />
            <Route path="/messages" element={<Layout><MessagesPage /></Layout>} />
            <Route path="/reports" element={<Layout><ReportsPage /></Layout>} />
            {/* <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/contents" element={<ProtectedRoute><Layout><ContentPage /></Layout></ProtectedRoute>} />
            <Route path="/categories" element={<ProtectedRoute><Layout><CategoryPage /></Layout></ProtectedRoute>} />
            <Route path="/operators" element={<ProtectedRoute><Layout><OperatorsPage /></Layout></ProtectedRoute>} />
            <Route path="/subscribers" element={<ProtectedRoute><Layout><SubscribersPage /></Layout></ProtectedRoute>} />
            <Route path="/subscriptionPlans" element={<ProtectedRoute><Layout><SubscriptionPlanPage /></Layout></ProtectedRoute>} />
            <Route path="/messages" element={<ProtectedRoute><Layout><MessagesPage /></Layout></ProtectedRoute>} />
            <Route path="/reports" element={<ProtectedRoute><Layout><ReportsPage /></Layout></ProtectedRoute>} /> */}
            <Route path="/subscribertester" element={<Layout><TestSubscribersPage /></Layout>} />
            <Route path="/test" element={<Layout><TesterPage /></Layout>} />
            <Route path="/joblisttester" element={<Layout><JobEntryPage /></Layout>} />
            {/* <Route path="/subscriber_tester" element={<Layout><TestSubscribersPage /></Layout>} /> */}
          </Routes>
        {/* </AuthProvider> */}
      </div>
    </Router>

  );
}


export default App;