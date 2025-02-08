// Importamos React y el hook useState para manejar el estado de los componentes
import { useState } from "react";
// Importamos la imagen del logo
import image from "./components/glasses.png";

// Definimos el componente principal MovieFinder
export const MovieFinder = () => {
    // Variables de entorno para la URL base y la API key
    const urlBase = import.meta.env.VITE_BASE_URL;
    const API_KEY = import.meta.env.VITE_API_KEY;

    // Estados del componente usando useState
    // Estado para el texto de búsqueda
    const [search, setSearch] = useState("");
    // Estado para almacenar la lista de películas
    const [movies, setMovies] = useState([]);
    // Estado para manejar errores
    const [error, setError] = useState(null);
    // Estado para mostrar/ocultar el indicador de carga
    const [isLoading, setIsLoading] = useState(false);
    // Estados para la paginación
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [totalResults, setTotalResults] = useState(0);

    // Manejador para actualizar el estado de búsqueda cuando el usuario escribe
    const handleInputChange = (e) => {
        setSearch(e.target.value);
    };

    // Manejador para el envío del formulario de búsqueda
    const handleSubmit = (e) => {
        e.preventDefault(); // Previene el comportamiento por defecto del formulario
        setPage(1); // Reinicia la página a 1
        fetchMovies(1); // Busca películas con la página 1
    };

    // Manejador para ir a la siguiente página
    const handleNextPage = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        fetchMovies(nextPage);
    };

    // Manejador para ir a la página anterior
    const handlePrevPage = () => {
        const prevPage = page - 1;
        setPage(prevPage);
        fetchMovies(prevPage);
    };

    // Función asíncrona para obtener las películas de la API
    const fetchMovies = async (currentPage) => {
        try {
            setIsLoading(true); // Muestra el indicador de carga
            setError(null); // Limpia cualquier error previo

            // Realiza la petición a la API
            const response = await fetch(
                `${urlBase}?query=${search}&api_key=${API_KEY}&page=${currentPage}`
            );
            // Verifica si la respuesta es exitosa
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            // Convierte la respuesta a JSON
            const data = await response.json();
            // Actualiza los estados con los datos recibidos
            setMovies(data.results || []); // Lista de películas
            setTotalPages(data.total_pages || 0); // Total de páginas
            setTotalResults(data.total_results || 0); // Total de resultados
        } catch (error) {
            // Manejo de errores
            setError(error.message);
            setMovies([]);
        } finally {
            // Se ejecuta siempre al finalizar, éxito o error
            setIsLoading(false); // Oculta el indicador de carga
        }
    };

    // Renderizado del componente
    return (
        <div className="container">
            {/* Encabezado con logo y título */}
            <h1 className="title">
                <img src={image} alt="Movie Finder Logo" />
                Simple Movie Finder
            </h1>

            {/* Formulario de búsqueda */}
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

            {/* Indicador de carga */}
            {isLoading && <div className="loading">Loading...</div>}

            {/* Mensaje de error si existe */}
            {error && <div className="error-message">Error: {error}</div>}

            {/* Información de paginación superior (solo se muestra si hay resultados) */}
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

            {/* Lista de películas */}
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

            {/* Información de paginación inferior (solo se muestra si hay resultados) */}
            {totalResults > 0 && (
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
            )}
        </div>
    );
};
