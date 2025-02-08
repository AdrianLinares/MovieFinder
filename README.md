# Movie Finder App

A React-based movie search application that allows users to discover movies using The Movie Database (TMDB) API. The app features a clean, responsive interface with a modern green theme and smooth animations.

## Features

-   🔍 Real-time movie search
-   📱 Responsive design for all devices
-   📄 Pagination support
-   🎬 Detailed movie information
-   ⚡ Fast and efficient API integration
-   🎨 Modern UI with smooth animations
-   ❌ Error handling and loading states

## Tech Stack

-   React 18+
-   Vite
-   CSS3 with modern features
-   TMDB API

## Getting Started

### Prerequisites

-   Node.js (v14 or higher)
-   npm or yarn
-   TMDB API key

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/movie-finder-app.git
cd movie-finder-app
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory:

```env
VITE_API_KEY=your_tmdb_api_key_here
VITE_BASE_URL=https://api.themoviedb.org/3/search/movie
```

4. Start the development server:

```bash
npm run dev
```

## Component Features

### MovieFinder Component

-   **Search Functionality**: Real-time search with debouncing
-   **Pagination**: Navigate through search results
-   **Loading States**: Visual feedback during API calls
-   **Error Handling**: User-friendly error messages
-   **Responsive Design**: Adapts to different screen sizes

## API Integration

The app uses the TMDB API to fetch movie data:

-   Search movies by title
-   Fetch movie details including:
    -   Title
    -   Release date
    -   Overview
    -   Poster image

## Styling

The application uses a custom CSS file with:

-   Flexbox and Grid layouts
-   CSS transitions and animations
-   Responsive design patterns
-   Modern color scheme with green theme
-   Loading and error state styles

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/NewFeature`
3. Commit your changes: `git commit -m 'Add NewFeature'`
4. Push to the branch: `git push origin feature/NewFeature`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

-   [TMDB API](https://www.themoviedb.org/documentation/api) for providing movie data
