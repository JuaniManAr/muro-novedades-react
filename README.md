# 01 - Muro de Novedades 🗞️

Aplicación React de una sola página (SPA) que implementa un muro de publicaciones interactivo.

## Conceptos aplicados

| Concepto | Dónde se ve |
|---|---|
| `useState` | Contador de likes en `Publicacion.jsx`; campos del formulario en `FormularioNuevaPublicacion.jsx` |
| `useEffect` | Simulación de carga asíncrona (fetch a API) en `App.jsx` con cleanup |
| Props | `App` → `Publicacion` (autor, titulo, contenido, fecha) |
| Lifting State Up | `FormularioNuevaPublicacion` llama `onNuevaPublicacion` → `App` actualiza la lista |
| Inputs controlados | `value` + `onChange` en cada campo del formulario |
| Renderizado condicional | Cargando / Error / Sin publicaciones / Lista |

## Estructura

```
src/
├── App.jsx                             ← estado global + lifting state up
├── App.css
├── main.jsx
└── components/
    ├── Publicacion.jsx                 ← likes locales con useState
    └── FormularioNuevaPublicacion.jsx  ← form controlado, comunica al padre
```

## Cómo correr

```bash
npm install
npm run dev
```

Abre http://localhost:5173