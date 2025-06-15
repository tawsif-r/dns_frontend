
import HomePage from './pages/HomePage';
import SubscribersPage from './pages/SubscribersPage'
import ContentPage from './pages/ContentPage';
import CategoryPage from './pages/CategoryPage';
import MessagesPage from './pages/MessagesPage';
import SubscriptionPlanPage from './pages/SubscriptionPlanPage'
import ReportsPage from './pages/ReportsPage';
import Layout from './components/ui/Layout';
import OperatorsPage from './pages/OperatorsPage';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import JobEntryPage from './pages/JobEntryPage';
import TestSubscribersPage from './pages/TestSubscribersPage';
import RegisterPage from './pages/RegisterPage';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import TestReportsPage from './pages/TestReportsPage';


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
       
          <Routes>
            <Route path="/" element={<ProtectedRoute><Layout>
              <HomePage />
            </Layout></ProtectedRoute>} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/register" element={<RegisterAndLogout />} />
            <Route path="/contents" element={<ProtectedRoute><Layout><ContentPage /></Layout></ProtectedRoute>} />
            <Route path="/categories" element={<ProtectedRoute><Layout><CategoryPage /></Layout></ProtectedRoute>} />
            <Route path="/operators" element={<ProtectedRoute><Layout><OperatorsPage /></Layout></ProtectedRoute>} />
            <Route path="/subscribers" element={<ProtectedRoute><Layout><SubscribersPage /></Layout></ProtectedRoute>} />
            <Route path="/subscriptionPlans" element={<ProtectedRoute><Layout><SubscriptionPlanPage /></Layout></ProtectedRoute>} />
            <Route path="/messages" element={<ProtectedRoute><Layout><MessagesPage /></Layout></ProtectedRoute>} />
            {/* Test routes */}
            <Route path="/testreports" element={<ProtectedRoute><Layout><TestReportsPage /></Layout></ProtectedRoute>} />
            {/* New routes */}
            <Route path="/reports" element={<ProtectedRoute><Layout><ReportsPage /></Layout></ProtectedRoute>} />
            <Route path="/subscribertester" element={<Layout><TestSubscribersPage /></Layout>} />
            <Route path="/jobEntry" element={<Layout><JobEntryPage /></Layout>} />
            <Route path='*' element={<NotFound />} />
          </Routes>
      </div>
    </Router>

  );
}


export default App;