// src/pages/Usuarios.jsx
import { useEffect, useState } from 'react';
import { getUsers } from '../services/api';

export default function Usuarios() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers()
      .then(data => setUsers(data))
      .catch(error => console.error("Error cargando usuarios:", error));
  }, []);

  return (
    <div className="card">
      <h2>Lista de Usuarios</h2>
      
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Website</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td style={{ fontWeight: '500', color: '#0f172a' }}>{user.name}</td>
              <td>{user.email}</td>
              <td style={{ color: '#4f46e5' }}>{user.website}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {users.length === 0 && (
        <p style={{ textAlign: 'center', marginTop: '20px' }}>Cargando usuarios...</p>
      )}
    </div>
  );
}