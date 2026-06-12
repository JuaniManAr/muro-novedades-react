import React, { useState } from 'react';

/**
 * FormularioNuevaPublicacion
 * Formulario controlado para crear publicaciones.
 * Patrón "lifting state up": recibe onNuevaPublicacion del padre (App)
 * y le envía los datos cuando el usuario publica.
 */
function FormularioNuevaPublicacion({ onNuevaPublicacion }) {
  const [autor, setAutor]       = useState('');
  const [titulo, setTitulo]     = useState('');
  const [contenido, setContenido] = useState('');
  const [error, setError]       = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    setError('');

    // Validación básica
    if (!autor.trim() || !titulo.trim() || !contenido.trim()) {
      setError('Todos los campos son obligatorios.');
      return;
    }
    if (contenido.trim().length < 10) {
      setError('El contenido debe tener al menos 10 caracteres.');
      return;
    }

    // Lifting state up: enviamos los datos al padre
    onNuevaPublicacion({
      autor:    autor.trim(),
      titulo:   titulo.trim(),
      contenido: contenido.trim(),
      fecha:    new Date().toISOString(),
    });

    // Limpiar el formulario tras publicar
    setAutor('');
    setTitulo('');
    setContenido('');
  };

  return (
    <section className="formulario-container">
      <h2>✍️ Nueva Publicación</h2>

      <form onSubmit={handleSubmit} noValidate>
        {error && <p className="form-error" role="alert">{error}</p>}

        <div className="form-group">
          <label htmlFor="autor">Autor</label>
          <input
            id="autor"
            type="text"
            placeholder="Tu nombre..."
            value={autor}
            onChange={(e) => setAutor(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="titulo">Título</label>
          <input
            id="titulo"
            type="text"
            placeholder="Título de la publicación..."
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="contenido">Contenido</label>
          <textarea
            id="contenido"
            placeholder="¿Qué querés compartir?"
            value={contenido}
            onChange={(e) => setContenido(e.target.value)}
            rows={4}
          />
        </div>

        <button type="submit" className="btn-publicar">
          Publicar 🚀
        </button>
      </form>
    </section>
  );
}

export default FormularioNuevaPublicacion;