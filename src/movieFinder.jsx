import { useState } from "react";
import image from "./components/glasses.png";

export const MovieFinder = () => {
    const urlBase = import.meta.env.VITE_BASE_URL;
    const API_KEY = import.meta.env.VITE_API_KEY;

    const [search, setSearch] = useState("");
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [totalResults, setTotalResults] = useState(0);

    const handleInputChange = (e) => {
        setSearch(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setPage(1);
        fetchMovies(1);
    };

    const handleNextPage = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        fetchMovies(nextPage);
    };

    const handlePrevPage = () => {
        const prevPage = page - 1;
        setPage(prevPage);
        fetchMovies(prevPage);
    };

    const fetchMovies = async (currentPage) => {
        try {
            setIsLoading(true);
            setError(null);

            const response = await fetch(
                `${urlBase}?query=${search}&api_key=${API_KEY}&page=${currentPage}`
            );
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setMovies(data.results || []);
            setTotalPages(data.total_pages || 0);
            setTotalResults(data.total_results || 0);
        } catch (error) {
            setError(error.message);
            setMovies([]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container">
            <h1 className="title">
                <img src={image} />
                Simple Movie Finder
            </h1>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Write a movie name"
                    value={search}
                    onChange={handleInputChange}
                    required
                />

                <button
                    type="submit"
                    className="search-button"
                    disabled={isLoading}
                >
                    {isLoading ? "Searching..." : "Search"}
                </button>
            </form>

            {isLoading && <div className="loading">Loading...</div>}

            {error && <div className="error-message">Error: {error}</div>}

            {totalResults > 0 && (
                <div className="pagination-info">
                    <p>Total Results: {totalResults}</p>
                    <p>
                        Page {page} of {totalPages}
                    </p>
                    <div className="pagination-buttons">
                        <button
                            onClick={handlePrevPage}
                            disabled={page <= 1 || isLoading}
                        >
                            Previous Page
                        </button>
                        <button
                            onClick={handleNextPage}
                            disabled={page >= totalPages || isLoading}
                        >
                            Next Page
                        </button>
                    </div>
                </div>
            )}

            <div className="movie-list">
                {movies.map((movie) => (
                    <div key={movie.id} className="movie-card">
                        <img
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={movie.title}
                        />
                        <h2>{movie.title}</h2>
                        <h4>{movie.release_date}</h4>
                        <p>{movie.overview}</p>
                    </div>
                ))}
            </div>
            <div className="pagination-info bottom-pagination">
                <p>Total Results: {totalResults}</p>
                <p>
                    Page {page} of {totalPages}
                </p>
                <div className="pagination-buttons">
                    <button
                        onClick={handlePrevPage}
                        disabled={page <= 1 || isLoading}
                    >
                        Previous Page
                    </button>
                    <button
                        onClick={handleNextPage}
                        disabled={page >= totalPages || isLoading}
                    >
                        Next Page
                    </button>
                </div>
            </div>
        </div>
    );
};
