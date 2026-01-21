// src/pages/Dashboard.jsx
import { useEffect, useState, useContext, useMemo } from 'react';
import { AuthContext } from '../store/AuthContext';
import { useNavigate } from 'react-router-dom';
import { getUsers } from '../services/api'; 
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function Dashboard() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [chartData, setChartData] = useState([]);
  // ESTADO NUEVO: Controla si mostramos el gráfico o no
  const [showChart, setShowChart] = useState(false);
  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    // 1. Cargar datos
    getUsers().then(users => {
      const formattedData = users.map(u => ({
        nombre: u.username,
        actividad: u.id * 10 + Math.floor(Math.random() * 50),
        proyectos: Math.floor(Math.random() * 20)
      }));
      const topUsers = formattedData.slice(0, 7);
      setChartData(topUsers);

      // Actividad reciente sintética con datos de usuarios
      const timeline = users.slice(0, 5).map((u, idx) => ({
        id: u.id,
        title: `Nuevo comentario de ${u.username}`,
        time: `${2 * (idx + 1)} min ago`,
        status: idx % 2 === 0 ? 'Completado' : 'En progreso'
      }));
      setRecentActivity(timeline);
    });

    // 2. TRUCO FINAL: Esperar un instante antes de pintar el gráfico
    // Esto da tiempo al navegador para calcular el ancho del <div> padre.
    const timer = setTimeout(() => {
      setShowChart(true);
    }, 100); // 100ms de retraso es imperceptible para el ojo humano

    // Limpiamos el timer si el usuario sale de la página
    return () => clearTimeout(timer);
  }, []);

  const handleLogout = () => {
    if (logout) logout();
    navigate('/login');
  };

  const kpis = useMemo(() => {
    if (!chartData.length) return [];

    const totalUsuarios = chartData.length;
    const actividadTotal = chartData.reduce((acc, u) => acc + u.actividad, 0);
    const proyectosTotales = chartData.reduce((acc, u) => acc + u.proyectos, 0);
    const maxActividad = Math.max(...chartData.map(u => u.actividad));

    return [
      {
        label: 'Usuarios activos',
        value: totalUsuarios,
        helper: '+3 vs ayer',
        color: '#4f46e5'
      },
      {
        label: 'Actividad total',
        value: actividadTotal,
        helper: 'Sesiones acumuladas',
        color: '#16a34a'
      },
      {
        label: 'Proyectos abiertos',
        value: proyectosTotales,
        helper: 'Objetivo semanal 120',
        color: '#f59e0b'
      },
      {
        label: 'Pico de actividad',
        value: maxActividad,
        helper: 'Top usuario del día',
        color: '#0ea5e9'
      }
    ];
  }, [chartData]);

  return (
    <div>
      <div className="dashboard-header">
        <div>
          <p className="eyebrow">Panel de Control</p>
          <h1>Hola, {user?.name ?? 'invitado'}</h1>
          <p className="muted">Resumen ejecutivo con actividad, engagement y métricas de uso.</p>
        </div>
        <div className="header-actions">
          <button onClick={handleLogout} style={{ width: 'auto', backgroundColor: '#dc3545' }}>
            Cerrar Sesión
          </button>
        </div>
      </div>

      {!user && <p>Verificando acceso...</p>}

      {user && (
        <div className="dashboard-grid">
          <section className="card kpi-grid">
            {kpis.map(kpi => (
              <div key={kpi.label} className="kpi-card">
                <div className="kpi-dot" style={{ backgroundColor: kpi.color }} />
                <p className="kpi-label">{kpi.label}</p>
                <h3 className="kpi-value">{kpi.value}</h3>
                <p className="kpi-helper">{kpi.helper}</p>
              </div>
            ))}
          </section>

          <section className="card chart-card">
            <div className="section-header">
              <div>
                <p className="eyebrow">Actividad</p>
                <h2>Rendimiento por usuario</h2>
              </div>
            </div>

            <div className="chart-wrapper">
              {showChart && chartData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={chartData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="nombre" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="actividad" fill="#4f46e5" name="Actividad" radius={[6, 6, 0, 0]} />
                    <Bar dataKey="proyectos" fill="#22c55e" name="Proyectos" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="chart-empty">Cargando gráfico...</div>
              )}
            </div>
          </section>

          <section className="card" style={{ minHeight: '320px' }}>
            <div className="section-header">
              <div>
                <p className="eyebrow">Actividad reciente</p>
                <h2>Timeline</h2>
              </div>
            </div>
            <div className="timeline">
              {recentActivity.map(item => (
                <div key={item.id} className="timeline-row">
                  <div className="timeline-dot" />
                  <div className="timeline-body">
                    <p className="timeline-title">{item.title}</p>
                    <p className="timeline-meta">{item.time} · {item.status}</p>
                  </div>
                </div>
              ))}
              {!recentActivity.length && <p className="muted">Sin eventos recientes</p>}
            </div>
          </section>

          <section className="card ranking-card" style={{ minHeight: '320px' }}>
            <div className="section-header">
              <div>
                <p className="eyebrow">Ranking</p>
                <h2>Top colaboradores</h2>
              </div>
            </div>
            <div className="mini-table">
              <div className="mini-table-head">
                <span>Usuario</span>
                <span>Actividad</span>
                <span>Proyectos</span>
              </div>
              {chartData.map(userRow => (
                <div key={userRow.nombre} className="mini-table-row">
                  <span className="bold">{userRow.nombre}</span>
                  <span>{userRow.actividad}</span>
                  <span>{userRow.proyectos}</span>
                </div>
              ))}
              {!chartData.length && <p className="muted">Sin datos</p>}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}