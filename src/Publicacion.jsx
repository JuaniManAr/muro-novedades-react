import React, { useState } from 'react';

/**
 * Componente Publicacion
 * Muestra una publicación individual con contador de "Me Gusta".
 * El estado de likes es LOCAL a cada instancia (no se comparte con el padre).
 */
function Publicacion({ autor, titulo, contenido, fecha }) {
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    if (liked) {
      setLikes(prev => prev - 1);
      setLiked(false);
    } else {
      setLikes(prev => prev + 1);
      setLiked(true);
    }
  };

  const fechaFormateada = fecha
    ? new Date(fecha).toLocaleDateString('es-AR', {
        day: '2-digit', month: 'short', year: 'numeric'
      })
    : null;

  return (
    <article className="publicacion">
      <div className="publicacion-header">
        <div className="publicacion-avatar">
          {autor.charAt(0).toUpperCase()}
        </div>
        <div className="publicacion-meta">
          <strong className="publicacion-autor">{autor}</strong>
          {fechaFormateada && (
            <time className="publicacion-fecha">{fechaFormateada}</time>
          )}
        </div>
      </div>

      <h3 className="publicacion-titulo">{titulo}</h3>
      <p className="publicacion-contenido">{contenido}</p>

      <footer className="publicacion-footer">
        <button
          className={`btn-like ${liked ? 'liked' : ''}`}
          onClick={handleLike}
          aria-label={liked ? 'Quitar me gusta' : 'Me gusta'}
        >
          {liked ? '👍' : '👍'} {likes} {likes === 1 ? 'like' : 'likes'}
        </button>
      </footer>
    </article>
  );
}

export default Publicacion;