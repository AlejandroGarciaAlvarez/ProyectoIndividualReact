// src/pages/Login.jsx
import { useState, useContext } from 'react';
import { AuthContext } from '../store/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [username, setUsername] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = () => {
    // AQUÍ ESTABA EL ERROR: Asegúrate de que solo estén estas dos líneas
    login(username);
    navigate('/dashboard'); 
  };

  return (
    <div className="card" style={{ maxWidth: '400px', margin: '0 auto' }}>
      
      <h1 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Iniciar Sesión</h1>
      
      <div style={{ 
        backgroundColor: '#fff7ed', 
        color: '#9a3412', 
        padding: '12px', 
        borderRadius: '8px', 
        marginBottom: '20px',
        border: '1px solid #ffedd5',
        fontSize: '0.9rem'
      }}>
        <p style={{ margin: 0 }}>
          <strong>🔒 Zona Restringida:</strong> Para ver el <em>Dashboard</em>, 
          primero debes iniciar sesión.
        </p>
      </div>

      <label style={{ fontSize: '0.9rem', fontWeight: 600, color: '#64748b' }}>
        Nombre de usuario
      </label>
      <input 
        type="text" 
        placeholder="Ej: admin" 
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      
      <button onClick={handleLogin}>Entrar</button>
      
      <div style={{ textAlign: 'center', marginTop: '15px' }}>
        <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
          (Pista: El usuario correcto es <strong>admin</strong>)
        </p>
      </div>
    </div>
  );
}