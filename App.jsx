import React, { useState, useEffect } from 'react';
import Publicacion from './components/Publicacion';
import FormularioNuevaPublicacion from './components/FormularioNuevaPublicacion';

// Datos que simulan una respuesta de API
const DATOS_SIMULADOS = [
  { id: 1, autor: 'Ana Coder', titulo: 'Mi primer día con React', fecha: '2025-03-10T09:00:00Z',
    contenido: '¡Hoy empecé a aprender React y estoy emocionada! Los componentes funcionales son muy intuitivos una vez que entendés el flujo de datos.' },
  { id: 2, autor: 'Luis Dev', titulo: 'useEffect al rescate', fecha: '2025-03-12T14:30:00Z',
    contenido: 'Descubrí cómo useEffect maneja efectos secundarios. La clave está en el array de dependencias: vacío [] para ejecutarlo solo al montar, o con variables para reaccionar a cambios.' },
  { id: 3, autor: 'Carla Sistemas', titulo: 'Props vs Estado', fecha: '2025-03-15T11:00:00Z',
    contenido: 'Entender la diferencia entre props (datos que recibís del padre, read-only) y estado (datos propios del componente, mutables con setState) fue mi momento "¡ahá!" de la semana.' },
];

function App() {
  // Estado principal: lista de publicaciones (empieza vacía, se "carga" con useEffect)
  const [publicaciones, setPublicaciones] = useState([]);
  // Estado para simular carga asíncrona
  const [isLoading, setIsLoading] = useState(true);
  // Estado para error (buena práctica en producción)
  const [error, setError] = useState(null);

  // Simula fetch a API al montar el componente
  // [] → se ejecuta UNA sola vez (equivalente a componentDidMount)
  useEffect(() => {
    setIsLoading(true);
    setError(null);

    const timer = setTimeout(() => {
      try {
        setPublicaciones(DATOS_SIMULADOS);
        setIsLoading(false);
      } catch (e) {
        setError('No se pudieron cargar las publicaciones.');
        setIsLoading(false);
      }
    }, 1500);

    // Cleanup: cancela el timer si el componente se desmonta antes
    return () => clearTimeout(timer);
  }, []);

  // Lifting state up: esta función vive en App y la pasa al hijo FormularioNuevaPublicacion
  // El hijo llama a esta función → el padre actualiza SU estado → toda la UI se re-renderiza
  const handleNuevaPublicacion = (datos) => {
    const nueva = {
      ...datos,
      id: Date.now(), // ID único basado en timestamp
    };
    // Spread: nuevo array con la publicación nueva al inicio
    setPublicaciones(prev => [nueva, ...prev]);
  };

  // Renderizado condicional: decidimos qué mostrar según el estado
  const renderContenido = () => {
    if (isLoading) {
      return <p className="status-msg loading">⏳ Cargando publicaciones...</p>;
    }
    if (error) {
      return <p className="status-msg error">❌ {error}</p>;
    }
    if (publicaciones.length === 0) {
      return <p className="status-msg empty">📭 No hay publicaciones aún. ¡Sé el primero en publicar!</p>;
    }
    return publicaciones.map(pub => (
      <Publicacion
        key={pub.id}
        autor={pub.autor}
        titulo={pub.titulo}
        contenido={pub.contenido}
        fecha={pub.fecha}
      />
    ));
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>🗞️ Muro de Novedades</h1>
        <p className="app-subtitle">Compartí tus novedades con la comunidad</p>
      </header>

      <main className="app-main">
        {/* El formulario recibe la función del padre como prop (lifting state up) */}
        <FormularioNuevaPublicacion onNuevaPublicacion={handleNuevaPublicacion} />

        <section className="publicaciones-section">
          <h2>Publicaciones Recientes
            {!isLoading && (
              <span className="contador"> ({publicaciones.length})</span>
            )}
          </h2>
          {renderContenido()}
        </section>
      </main>
    </div>
  );
}

export default App;