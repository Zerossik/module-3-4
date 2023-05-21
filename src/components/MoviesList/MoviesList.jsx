export function MoviesList({ movies, onDeleteMovie, openModal }) {
  return (
    <ul>
      {movies.map(({ title, id, poster_path }) => (
        <li key={id}>
          <h2>{title}</h2>
          <button type="button" onClick={() => onDeleteMovie(id)}>
            Delete
          </button>

          <button
            type="button"
            onClick={() =>
              openModal({
                src: poster_path,
                alt: title,
              })
            }
          >
            Show poster
          </button>
        </li>
      ))}
    </ul>
  );
}
