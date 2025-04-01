import axios from "axios";
import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import Watchlist from "./WatchList";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

export default function Movie() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [watchList, setWatchList] = useState<Movie[]>([]);

  const my_api_key = import.meta.env.VITE_API_KEY;
  const api_url: string = `https://api.themoviedb.org/3/movie/popular?api_key=${my_api_key}`;

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(api_url);
        setMovies(response.data.results);
        setFilteredMovies(response.data.results);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data", error);
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const SearchByTitle = (searchedMovie: string) => {
    const filtered = movies.filter((movie) =>
      movie.title.toLowerCase().includes(searchedMovie.toLowerCase())
    );
    setFilteredMovies(filtered);
  };

  const AddToWatchList = (movie: Movie) => {
    setWatchList((previousWatchlist) =>
      previousWatchlist.filter((mv) => mv.id === movie.id).length > 0
        ? previousWatchlist
        : [...previousWatchlist, movie]
    );
  };

  return (
    <div
      className="min-h-screen
    mb-16 flex flex-col justify-between"
    >
      <SearchBar onSearch={SearchByTitle} />
      <Watchlist watchlist={watchList} setWatchList={setWatchList} />

      <h1 className="text-center items-center font-bold text-3xl mb-8 mt-4 ">
        Popular Movies
      </h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="ml-4 grid grid-cols-5 gap-4 mb-9">
          {filteredMovies.map((movie) => (
            <div
              key={movie.id}
              className="p-4 border border-gray-300 rounded-lg flex flex-col items-center  transform transition-transform duration-300 hover:scale-105"
            >
              <p className="text-center">{movie.title}</p>
              <img
                className="w-[250px] rounded-md shadow-lg"
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
              <button
                onClick={() => AddToWatchList(movie)}
                className="items-center border border-blue-500 px-4 py-2 rounded mt-2 transform transition-transform duration-300 hover:scale-110 hover:backdrop-brightness-200 hover:text-gray-500"
              >
                Add to watchlist
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
