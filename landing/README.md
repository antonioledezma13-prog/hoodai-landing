# HoodAI Landing Page

Landing page oficial de HoodAI. React/Vite en Vercel + Node.js/Express en Render + MongoDB Atlas.

---

## Estructura

```
hoodai-landing/
├── frontend/          → React/Vite → Vercel
└── backend/           → Node.js/Express → Render
```

---

## PASO A PASO COMPLETO

---

### PASO 1 — Crear el repositorio en GitHub

1. Ve a **github.com** → botón verde **New**
2. Nombre del repo: `hoodai-landing`
3. Visibilidad: **Private** (o Public si prefieres)
4. **NO** inicialices con README ni .gitignore (ya los tienes en el ZIP)
5. Clic en **Create repository**
6. Copia la URL del repo: `https://github.com/TU_USUARIO/hoodai-landing.git`

---

### PASO 2 — Subir el código a GitHub

Descomprime el ZIP en tu máquina. Abre la terminal en la carpeta raíz `hoodai-landing/`:

```bash
git init
git add .
git commit -m "feat: hoodai landing page — initial commit"
git branch -M master
git remote add origin https://github.com/TU_USUARIO/hoodai-landing.git
git push -u origin master
```

Verifica en GitHub que la carpeta `frontend/` y `backend/` aparecen en el repo.

---

### PASO 3 — MongoDB Atlas (base de datos)

Usa tu cuenta existente `antonioledezma13@gmail.com`.

1. Entra a **cloud.mongodb.com**
2. En tu cluster existente → clic en **Browse Collections**
3. Clic en **Create Database**
   - Database name: `hoodai-landing`
   - Collection name: `leads`
4. Clic en **Create**
5. En el menú izquierdo → **Database Access** → verifica que tu usuario tiene acceso
6. En **Network Access** → verifica que `0.0.0.0/0` está en la whitelist (o agrega Render cuando lo tengas)
7. Clic en **Connect** → **Drivers** → copia el **Connection String**:
   ```
   mongodb+srv://USUARIO:PASSWORD@cluster.mongodb.net/hoodai-landing?retryWrites=true&w=majority
   ```
   Guarda este string — lo necesitas en Render.

---

### PASO 4 — Deploy del Backend en Render

1. Ve a **render.com** → **New +** → **Web Service**
2. Conecta tu cuenta de GitHub si no lo has hecho
3. Selecciona el repo `hoodai-landing`
4. Configura el servicio:
   - **Name:** `hoodai-landing-api`
   - **Root Directory:** `backend`
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
   - **Plan:** Free
5. En **Environment Variables** → agrega estas dos:
   ```
   MONGODB_URI   = mongodb+srv://USUARIO:PASSWORD@cluster.../hoodai-landing?retryWrites=true&w=majority
   FRONTEND_URL  = https://hoodai-landing.vercel.app
   ```
   (Usa la URL de Vercel que crearás en el siguiente paso. Si no la sabes aún, ponla después.)
6. Clic en **Create Web Service**
7. Espera ~2 minutos que Render haga el build
8. Anota la URL de tu servicio:
   ```
   https://hoodai-landing-api.onrender.com
   ```
9. Verifica que funciona abriendo en el navegador:
   ```
   https://hoodai-landing-api.onrender.com/health
   ```
   Debe responder: `{"status":"ok","ts":"..."}`

---

### PASO 5 — Deploy del Frontend en Vercel

1. Ve a **vercel.com** → **Add New Project**
2. Selecciona el repo `hoodai-landing` de GitHub
3. En **Configure Project**:
   - **Framework Preset:** Vite
   - **Root Directory:** `frontend`  ← **MUY IMPORTANTE**
   - **Build Command:** `vite build`
   - **Output Directory:** `dist`
4. En **Environment Variables** → agrega:
   ```
   VITE_API_URL = https://hoodai-landing-api.onrender.com
   ```
5. Clic en **Deploy**
6. Espera ~1 minuto
7. Vercel te da la URL:
   ```
   https://hoodai-landing.vercel.app
   ```
   (o un nombre generado — puedes cambiarlo en Settings → Domains)

---

### PASO 6 — Actualizar FRONTEND_URL en Render

Ahora que tienes la URL real de Vercel:

1. Ve a Render → tu servicio `hoodai-landing-api`
2. Clic en **Environment**
3. Edita `FRONTEND_URL` → pon la URL exacta de Vercel:
   ```
   FRONTEND_URL = https://hoodai-landing.vercel.app
   ```
4. Clic en **Save Changes** → Render reinicia automáticamente

---

### PASO 7 — Verificar que todo funciona

1. Abre `https://hoodai-landing.vercel.app`
2. Deberías ver la landing con el canvas animado de la ciudad
3. Ve al formulario de email al final → escribe tu email → clic en **Inscribirme**
4. Debe responder: "¡Registro exitoso! Te contactaremos pronto."
5. Verifica en MongoDB Atlas → Collections → `hoodai-landing.leads` → debe aparecer el documento

---

### PASO 8 — Deploy de actualizaciones (flujo continuo)

**Para cualquier cambio futuro:**

```bash
# Desde la raíz del proyecto
git add .
git commit -m "fix: descripción del cambio"
git push master
```

- **Vercel** redeploya el frontend automáticamente al detectar el push.
- **Render** redeploya el backend automáticamente al detectar el push.

No necesitas hacer nada más.

---

## Variables de entorno — resumen

### Backend (Render)
| Variable       | Valor                                                        |
|----------------|--------------------------------------------------------------|
| `MONGODB_URI`  | `mongodb+srv://user:pass@cluster.../hoodai-landing?...`      |
| `FRONTEND_URL` | `https://hoodai-landing.vercel.app`                          |

### Frontend (Vercel)
| Variable        | Valor                                          |
|-----------------|------------------------------------------------|
| `VITE_API_URL`  | `https://hoodai-landing-api.onrender.com`      |

---

## Desarrollo local

```bash
# Terminal 1 — backend
cd backend
cp .env.example .env
# Edita .env con tu MONGODB_URI real
npm install
npm run dev
# Corre en http://localhost:3001

# Terminal 2 — frontend
cd frontend
cp .env.example .env.local
# .env.local ya tiene VITE_API_URL=http://localhost:3001 (proxy de vite)
npm install
npm run dev
# Abre http://localhost:5173
```

---

## Endpoint del backend

| Método | Ruta              | Descripción                     |
|--------|-------------------|---------------------------------|
| GET    | `/health`         | Health check del servicio       |
| POST   | `/api/leads`      | Registrar email de acceso anticipado |
| GET    | `/api/leads/count`| Número total de leads registrados|

### Ejemplo POST /api/leads
```json
// Request
{ "email": "usuario@gmail.com", "plan": "free" }

// Response exitosa
{ "ok": true, "message": "¡Registro exitoso! Te contactaremos pronto." }

// Response email duplicado
{ "error": "Este email ya está registrado. ¡Te avisaremos pronto!" }
```

---

## Créditos

Desarrollado por **Impulso Hub Web Inc.**  
Diseño Web que Certifica tu Marca  
[impulsohubweb.vercel.app](https://impulsohubweb.vercel.app)
