import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import SignUp from './components/signup';
import Main from './components/main';
import Login from './components/login';
import { AuthProvider, useAuth } from './context/AuthContext';
import { useEffect } from 'react';

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

function AppContent() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    // Redirect to main page if authenticated when app starts
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  return (
    <Routes>
      <Route 
        path="/" 
        element={
          <ProtectedRoute>
            <AuthProvider>
              <Main />
            </AuthProvider>
          </ProtectedRoute>
        } 
      />
      <Route path="/signup" element={<SignUp />} />
      <Route 
        path="/login" 
        element={
          isAuthenticated 
            ? <Navigate to="/" replace /> // Redirect to home if already authenticated
            : <Login />
        } 
      />
    </Routes>
  );
}

export default App;