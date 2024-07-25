import { useState } from "react";
import movieData from "../assets/movies.json";
import MovieCard from "./MovieCard";

function MovieList() {
  const [movies, setMovies] = useState(movieData);

  return (
    <div className="m-8">
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {movies.map(movie => (
          <MovieCard
            key={movie._id}
            movie={movie}
          />
        ))}
      </div>
    </div>
  );
}

export default MovieList;
