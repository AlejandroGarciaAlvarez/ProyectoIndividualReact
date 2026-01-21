// src/pages/Home.jsx
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      <section className="card" style={{ padding: '28px', marginBottom: '20px' }}>
        <p className="eyebrow">Bienvenido</p>
        <h1 style={{ margin: '8px 0 12px' }}>Panel de datos seguro y moderno</h1>
        <p className="muted" style={{ maxWidth: '620px' }}>
          Explora usuarios públicos, accede al dashboard protegido con métricas y prueba el flujo de autenticación.
        </p>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '18px' }}>
          <Link to="/dashboard"><button style={{ width: 'auto' }}>Ir al Dashboard</button></Link>
          <Link to="/login"><button style={{ width: 'auto', backgroundColor: '#0f172a' }}>Iniciar Sesión</button></Link>
          <Link to="/usuarios"><button style={{ width: 'auto', backgroundColor: '#e2e8f0', color: '#0f172a' }}>Ver Usuarios</button></Link>
        </div>
      </section>

      <section className="dashboard-grid" style={{ gap: '16px' }}>
        <div className="card" style={{ minHeight: '160px' }}>
          <p className="eyebrow">Seguridad</p>
          <h3 style={{ marginTop: '8px', marginBottom: '6px' }}>Rutas privadas</h3>
          <p className="muted">Protegemos el dashboard con auth sencilla: si no te logueas, vas directo al login.</p>
        </div>

        <div className="card" style={{ minHeight: '160px' }}>
          <p className="eyebrow">Experiencia</p>
          <h3 style={{ marginTop: '8px', marginBottom: '6px' }}>Carga perezosa</h3>
          <p className="muted">Cargamos componentes bajo demanda (lazy) para mejorar rendimiento y sensación pro.</p>
        </div>

        <div className="card" style={{ minHeight: '160px' }}>
          <p className="eyebrow">Datos</p>
          <h3 style={{ marginTop: '8px', marginBottom: '6px' }}>API de usuarios</h3>
          <p className="muted">Lista pública consumida desde un servicio; útil para pruebas rápidas de UI y tablas.</p>
        </div>
      </section>

      <section className="card" style={{ marginTop: '20px' }}>
        <div className="section-header">
          <div>
            <p className="eyebrow">Flujo sugerido</p>
            <h3 style={{ margin: '6px 0' }}>Cómo probar la app</h3>
          </div>
        </div>
        <div className="mini-table" style={{ marginTop: '12px' }}>
          <div className="mini-table-head">
            <span>Paso</span>
            <span>Acción</span>
            <span>Resultado</span>
          </div>
          <div className="mini-table-row">
            <span className="bold">1</span>
            <span>Ir a Login y usar <strong>admin</strong></span>
            <span>Sesión iniciada</span>
          </div>
          <div className="mini-table-row">
            <span className="bold">2</span>
            <span>Entrar al Dashboard</span>
            <span>Ves métricas y ranking</span>
          </div>
          <div className="mini-table-row">
            <span className="bold">3</span>
            <span>Revisar Usuarios</span>
            <span>Tabla con datos públicos</span>
          </div>
        </div>
      </section>
    </div>
  );
}