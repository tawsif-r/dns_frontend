
import HomePage from './pages/HomePage';
import SubscribersPage from './pages/SubscribersPage'
import ContentPage from './pages/ContentPage';
import CategoryPage from './pages/CategoryPage';
import MessagesPage from './pages/MessagesPage';
import SubscriptionPlanPage from './pages/SubscriptionPlanPage'
import QuickFilterReportsPage from './pages/QuickFilterReportsPage';
import Layout from './components/ui/Layout';
import OperatorsPage from './pages/OperatorsPage';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import JobEntryPage from './pages/JobEntryPage';
import TestSubscribersPage from './pages/TestSubscribersPage';
import RegisterPage from './pages/RegisterPage';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import ActiveReportsPage from './pages/ActiveReportsPage';
import SalesReportsPage from './pages/SalesReportsPage';
import FootballMessagePage from './pages/FootballMessagePage';
import CricketLiveDashboard from './pages/CricketLiveDashboard';
import MatchMakeCricketPage from './pages/MatchMakeCricketPage';
import MatchMakeFootballPage from './pages/MatchMakeFootballPage';

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
            <Route path="/activereports" element={<ProtectedRoute><Layout><ActiveReportsPage /></Layout></ProtectedRoute>} />
            <Route path="/salesreports" element={<ProtectedRoute><Layout><SalesReportsPage /></Layout></ProtectedRoute>} />
            <Route path='/football' element={<ProtectedRoute><Layout><FootballMessagePage /></Layout></ProtectedRoute>} />
            <Route path='/cricket' element={<ProtectedRoute><Layout><CricketLiveDashboard /></Layout></ProtectedRoute>} />
            <Route path='/cricket-matches' element={<ProtectedRoute><Layout><MatchMakeCricketPage /></Layout></ProtectedRoute>} />
            <Route path='/football-matches' element={<ProtectedRoute><Layout><MatchMakeFootballPage /></Layout></ProtectedRoute>} />
            {/* New routes */}
            <Route path="/quickreports" element={<ProtectedRoute><Layout><QuickFilterReportsPage /></Layout></ProtectedRoute>} />
            <Route path="/subscribertester" element={<Layout><TestSubscribersPage /></Layout>} />
            <Route path="/jobEntry" element={<Layout><JobEntryPage /></Layout>} />
            <Route path='*' element={<NotFound />} />
          </Routes>
      </div>
    </Router>

  );
}


export default App;