# ⚛️ Proyecto React SPA
### Gestión de Usuarios y Dashboard con Lazy Loading



Este proyecto es una **Single Page Application (SPA)** desarrollada como parte de la Situación de Aprendizaje. Implementa navegación segura, consumo de APIs y optimización de carga.

---

## 🚀 1. Cómo ejecutarlo

Sigue estos dos pasos sencillos para iniciar el entorno de desarrollo:

### 📥 Paso 1: Instalación
Descarga las librerías necesarias (React Router, Recharts, etc.) ejecutando:

```bash
npm install
```
### ▶️ Paso 2: EjecuciónArranca el servidor local con Vite:Bashnpm run dev
Nota: Abre tu navegador en la URL que aparece en la terminal (normalmente http://localhost:5173).

📂 2. Estructura y FuncionalidadEl proyecto sigue una arquitectura escalable organizada por responsabilidades:

🗺️ Vistas Principales (src/pages/)ArchivoFunciónLogin.jsxGestiona el formulario de entrada, validaciones y guarda el estado del usuario.Dashboard.jsxZona Privada.

Se carga mediante Lazy Loading y visualiza los datos transformados de la API.Usuarios.jsxConsume la API externa (JSONPlaceholder) y renderiza el listado en una tabla.

* **`Home.jsx`**: Página de aterrizaje pública con navegación básica.

<br>

### ⚙️ Lógica y Componentes Clave

#### 🔐 Estado Global
* **`src/store/AuthContext.jsx`**
  Implementación de la **Context API**. Permite que toda la aplicación sepa si el usuario está logueado, persistiendo la sesión entre navegaciones.

#### 🛡️ Seguridad
* **`src/router/PrivateRoute.jsx`**
  Componente "Guardián". Protege las rutas sensibles (como Dashboard). Si no detecta un usuario en el contexto, **redirige automáticamente al Login**.

#### 🌐 Datos Externos
* **`src/services/api.js`**
  Capa de servicio que aísla la lógica de `fetch`. Se encarga de la comunicación limpia con la API externa.

#### ⚡ Configuración (Core)
* **`App.jsx`**
  Configura el enrutador principal (`BrowserRouter`) y define la carga perezosa (`Suspense` + `lazy`) para optimizar el rendimiento de la aplicación.
