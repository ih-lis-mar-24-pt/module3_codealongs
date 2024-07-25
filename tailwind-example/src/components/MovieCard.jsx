function MovieCard({ movie }) {
  /* 
  div:hover {
  }
  */
  // bg-[#00ff00] square brackets are for custom values
  return (
    <div className="bg-gray-100 p-4 rounded-md flex items-center shadow-md hover:shadow-lg hover:transition-shadow duration-300">
      <img
        src="https://i.pinimg.com/originals/67/42/c8/6742c8271d7f88414f895ba8379f33df.jpg"
        alt="movie poster"
        className="max-w-[100px] rounded-full mr-4"
      />
      <div>
        <h2 className="text-xl text-bold">{movie.title}</h2>
        <p className="text-gray-500">{movie.director}</p>
        <p className={movie.hasOscars ? "text-green-600" : "text-red-600"}>
          {movie.hasOscars
            ? "Great movie, won an oscar"
            : "Bad movie, no oscars"}
        </p>
      </div>
    </div>
  );
}

export default MovieCard;
