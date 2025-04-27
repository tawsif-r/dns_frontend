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
import SignUpPage from './pages/SignUpPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './components/context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <div>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Layout>
              <HomePage />
            </Layout>} />
            <Route path="/test" element={<ProtectedRoute><Layout><Test /></Layout></ProtectedRoute>} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/contents" element={<ProtectedRoute><Layout><ContentPage /></Layout></ProtectedRoute>} />
            <Route path="/categories" element={<ProtectedRoute><Layout><CategoryPage /></Layout></ProtectedRoute>} />
            <Route path="/operators" element={<ProtectedRoute><Layout><OperatorsPage /></Layout></ProtectedRoute>} />
            <Route path="/subscribers" element={<ProtectedRoute><Layout><SubscribersPage /></Layout></ProtectedRoute>} />
            <Route path="/subscriptionPlans" element={<ProtectedRoute><Layout><SubscriptionPlanPage /></Layout></ProtectedRoute>} />
            <Route path="/messages" element={<ProtectedRoute><Layout><MessagesPage /></Layout></ProtectedRoute>} />
            <Route path="/reports" element={<ProtectedRoute><Layout><ReportsPage /></Layout></ProtectedRoute>} />
            <Route path="/tester" element={<TesterPage />} />
          </Routes>
        </AuthProvider>
      </div>
    </Router>

  );
}


export default App;