// src/App.jsx
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider, AuthContext } from './store/AuthContext';
import { lazy, Suspense, useContext } from 'react'; // 
import PrivateRoute from './router/PrivateRoute';

// Importaciones normales
import Home from './pages/Home';
import Login from './pages/Login';
import Usuarios from './pages/Usuarios';

// Lazy loading para Dashboard [cite: 108]
const Dashboard = lazy(() => import('./pages/Dashboard'));

function AppContent() {
  const { user } = useContext(AuthContext) || {};
  const displayName = user?.name || 'Invitado';
  const initial = displayName.charAt(0).toUpperCase() || '?';

  return (
    <BrowserRouter>
      {/* El menú queda fuera del contenedor para ocupar todo el ancho */}
      <nav>
        <div className="nav-left">
          <Link to="/">Home</Link>
          <Link to="/usuarios">Usuarios</Link>
          <Link to="/login">Login</Link>
          <Link to="/dashboard">Dashboard</Link>
        </div>
        <div className="nav-right">
          <div className="avatar-circle">{initial}</div>
          <span className="nav-username">{displayName}</span>
        </div>
      </nav>

      {/* Aquí aplicamos el estilo de contenedor centrado */}
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/usuarios" element={<Usuarios />} />
          <Route 
            path="/dashboard" 
            element={
              <PrivateRoute>
                <Suspense fallback={<p>Cargando...</p>}>
                  <Dashboard />
                </Suspense>
              </PrivateRoute>
            } 
          />
        </Routes>
      </div>
      
    </BrowserRouter>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}