interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

interface WatchlistProps {
  watchlist: Movie[];
  setWatchList: React.Dispatch<React.SetStateAction<Movie[]>>;
}

export default function Watchlist({ watchlist, setWatchList }: WatchlistProps) {
  const RemoveFromWatchList = (movieId: number) => {
    setWatchList((previosWatchList) =>
      previosWatchList.filter((movie) => movie.id !== movieId)
    );
  };

  return (
    <div className="mt-8 mx-4 mb-8">
      <h2 className="text-center font-bold text-2xl mb-8">My Watchlist</h2>
      {watchlist.length === 0 ? (
        <p className="px-4">No movies in your watchlist.</p>
      ) : (
        <div className="grid grid-cols-5 gap-4 ">
          {watchlist.map((movie) => (
            <div
              key={movie.id}
              className="p-4 border border-blue-700 rounded-lg transform transition-transform duration-300 hover:scale-105"
            >
              <p className="text-center">{movie.title}</p>
              <img
                className="w-[250px] rounded-md shadow-lg"
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
              <button
                onClick={() => RemoveFromWatchList(movie.id)}
                className="mt-2 text-red-500 border border-red-500 px-4 py-2 rounded transform transition-transform duration-300 hover:scale-110 hover:backdrop-brightness-200 hover:text-gray-300"
              >
                Remove from watchlist
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
