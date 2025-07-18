# 🧩 Proyecto de Usuarios – React + TypeScript + Vite + Tailwind

Este proyecto es una aplicación web desarrollada con **React**, **TypeScript**, **Vite** y **Tailwind CSS**, enfocada en la visualización, filtrado y gestión de usuarios mediante una arquitectura modular y escalable.

NOTA: el .env se dejó expuesto y se subió a github para fines prácticos

---

## 🚀 ¿Cómo iniciar el proyecto?

### 1. Clonar el repositorio

```bash
git clone https://github.com/another-julian/prueba-tecnica-v2.git
cd prueba-tecnica-v2
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Iniciar el servidor de desarrollo

```bash
npm run dev
```

Esto abrirá la app en [http://localhost:5173](http://localhost:5173)

---

## 🛠️ Scripts disponibles

| Comando           | Descripción                             |
| ----------------- | --------------------------------------- |
| `npm run dev`     | Inicia la app en modo desarrollo        |
| `npm run build`   | Genera los archivos para producción     |
| `npm run preview` | Ejecuta el build como una app local     |
| `npm run lint`    | Ejecuta el linter para detectar errores |

---

## 📁 Estructura del proyecto

```plaintext
📁 public/                          # Archivos públicos accesibles directamente desde el navegador

📁 src/                             # Código fuente de la aplicación
├── 📁 assets/                      # Recursos estáticos (SVG, imágenes, etc.)
│   └── react.svg                   # Ejemplo de ícono o imagen utilizada

├── 📁 components/                  # Componentes UI organizados por funcionalidad
│   ├── 📁 Users/                   # Componentes relacionados con usuarios
│   │   ├── 📁 UsersList/           # Vista en forma de tarjeta
│   │   │   ├── UserCard.tsx         # Componente visual de cada usuario
│   │   │   ├── UserSkeletonCard.tsx # Placeholder de carga tipo tarjeta
│   │   │   └── index.tsx           # Exportador central de UsersList
│   │   ├── 📁 UsersTable/          # Vista en forma de tabla
│   │   │   ├── UserRow.tsx         # Fila individual de usuario
│   │   │   ├── UserSkeletonRow.tsx # Placeholder de carga tipo fila
│   │   │   └── index.tsx           # Exportador central de UsersTable
│   │   └── 📁 UserToolbar/         # Barra de herramientas para filtros
│   │       ├── FilterFieldSelector.tsx # Selector del campo a filtrar
│   │       ├── FilterValueSelector.tsx # Selector del valor de filtro
│   │       ├── index.tsx           # Integrador del toolbar
|   |       └── UserFilter.tsx      # Aplica la lógica y visualización del filtro
│   ├── Button.tsx                  # Componente de botón reutilizable
│   └── Header.tsx                  # Encabezado de la aplicación

├── 📁 hooks/                       # Hooks personalizados reutilizables
│   ├── useInfiniteScroll.ts        # Scroll infinito para paginación
│   └── useUsers.ts                 # Hook para obtener y filtrar usuarios

├── 📁 lib/                       # Configuraciones, tipos y utilidades generales
│   ├── api.ts                    # Configuración base de Axios
│   ├── config.ts                 # Configuraciones del entorno y constantes
│   ├── definitions.ts            # Tipos TypeScript globales (interfaces/models)
│   └── utils.ts                  # Funciones auxiliares reutilizables

├── 📁 services/                 # Capa de acceso a datos/API
│   └── userService.ts           # Operaciones sobre el endpoint de usuarios

├── App.tsx                      # Componente raíz de la aplicación
├── index.tsx                    # Punto de entrada principal (renderiza React)
├── index.css                    # Estilos globales y configuración Tailwind
├── vite-env.d.ts                # Tipos de Vite para TypeScript

.env                             # Variables de entorno (e.g. URLs, claves API)
.gitignore                       # Archivos y carpetas ignoradas por Git
```

---

## 📦 Tecnologías usadas

- ⚛️ React
- 🟦 TypeScript
- ⚡ Vite
- 🎨 Tailwind CSS
- 📦 Axios
- 🧪 ESLint + Prettier

---

## 🧪 Linter

Para asegurar calidad de código, puedes correr:

```bash
npm run lint
```

---

## 📄 Licencia

Este proyecto es de uso académico

## 🚧 Errores comunes usando Tailwindcss (Windows)

❌ Error:

```bash
 Error: Cannot find module '../lightningcss.win32-x64-msvc.node'
```

✅ Solución:
Instala el Microsoft Visual C++ Redistributable:
🔗 https://learn.microsoft.com/en-us/cpp/windows/latest-supported-vc-redist?view=msvc-170

---

## ✨ Autor

Desarrollado por [Julian Álvarez](https://github.com/another-julian) 🚀
