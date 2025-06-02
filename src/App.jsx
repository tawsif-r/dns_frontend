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
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// import { AuthProvider } from './components/context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import JobEntryTestPage from './pages/JobEntryPageTest';
import TestSubscribersPage from './pages/TestSubscribersPage';
import RegisterPage from './pages/RegisterPage';
import NotFound from './pages/NotFound';
import Login from './pages/Login';

function Logout() {
  localStorage.clear()
  return <Navigate to="/login" />
}
function RegisterAndLogout() {
  localStorage.clear()
  return <RegisterPage />
}

function App() {
  return (
    <Router>
      <div>
        {/* <AuthProvider> */}
          <Routes>
            <Route path="/" element={<ProtectedRoute><Layout>
              <HomePage />
            </Layout></ProtectedRoute>} />
            {/* <Route path="/test" element={<ProtectedRoute><Layout><Test /></Layout></ProtectedRoute>} /> */}
            
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/register" element={<RegisterAndLogout />} />
            {/* <Route path="/signup" element={<SignUpPage />} /> */}
            {/* <Route path="/contents" element={<Layout><ContentPage /></Layout>} />
            <Route path="/categories" element={<Layout><CategoryPage /></Layout>} />
            <Route path="/operators" element={<Layout><OperatorsPage /></Layout>} />
            <Route path="/subscribers" element={<Layout><SubscribersPage /></Layout>} />
            <Route path="/subscriptionPlans" element={<Layout><SubscriptionPlanPage /></Layout>} />
            <Route path="/messages" element={<Layout><MessagesPage /></Layout>} />
            <Route path="/reports" element={<Layout><ReportsPage /></Layout>} /> */}
            {/* <Route path="/login" element={<LoginPage />} /> */}
            <Route path="/contents" element={<ProtectedRoute><Layout><ContentPage /></Layout></ProtectedRoute>} />
            <Route path="/categories" element={<ProtectedRoute><Layout><CategoryPage /></Layout></ProtectedRoute>} />
            <Route path="/operators" element={<ProtectedRoute><Layout><OperatorsPage /></Layout></ProtectedRoute>} />
            <Route path="/subscribers" element={<ProtectedRoute><Layout><SubscribersPage /></Layout></ProtectedRoute>} />
            <Route path="/subscriptionPlans" element={<ProtectedRoute><Layout><SubscriptionPlanPage /></Layout></ProtectedRoute>} />
            <Route path="/messages" element={<ProtectedRoute><Layout><MessagesPage /></Layout></ProtectedRoute>} />
            <Route path="/reports" element={<ProtectedRoute><Layout><ReportsPage /></Layout></ProtectedRoute>} />
            <Route path="/subscribertester" element={<Layout><TestSubscribersPage /></Layout>} />
            {/* <Route path="/joblisttester" element={<Layout><JobEntryPage /></Layout>} /> */}
            <Route path="/jobtester" element={<Layout><JobEntryTestPage /></Layout>} />
            <Route path='*' element={<NotFound />} />
            {/* <Route path="/subscriber_tester" element={<Layout><TestSubscribersPage /></Layout>} /> */}
          </Routes>
        {/* </AuthProvider> */}
      </div>
    </Router>

  );
}


export default App;