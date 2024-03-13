document.addEventListener('DOMContentLoaded', function() {
    fetchMovies();

    const addMovieForm = document.getElementById('addMovieForm');
    addMovieForm.onsubmit = async function(e) {
        e.preventDefault();
        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        const seen = document.getElementById('seen').checked;

        const response = await fetch('/movies', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, description, seen }),
        });

        if (response.ok) {
            fetchMovies(); // Refresh the list
            addMovieForm.reset(); // Reset form fields
        }
    };
});

async function fetchMovies() {
    const response = await fetch('/movies');
    const movies = await response.json();
    const movieList = document.getElementById('movieList');
    movieList.innerHTML = ''; // Clear current list
    movies.forEach(movie => {
        const li = document.createElement('li');
        li.textContent = `${movie.title} - ${movie.description} - Seen: ${movie.seen ? 'Yes' : 'No'}`;
        movieList.appendChild(li);
    });
}
