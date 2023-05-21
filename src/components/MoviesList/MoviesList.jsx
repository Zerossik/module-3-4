export function MoviesList({ movies }) {
  return (
    <ul>
      {movies.map(({ title, id }) => (
        <li key={id}>
          <h2>{title}</h2>
        </li>
      ))}
    </ul>
  );
}
