document.addEventListener('DOMContentLoaded', () => {
    const moviesList = document.getElementById('movies');
    const titleInput = document.getElementById('title');
    const genreInput = document.getElementById('genre');
    const addMovieButton = document.getElementById('add-movie');
  
    let editMode = false;
    let editMovieId = null;
  
    // Fetch and display movies
    const fetchMovies = async () => {
      const response = await fetch('/movies');
      const movies = await response.json();
      moviesList.innerHTML = '';
      movies.forEach(movie => {
        const li = document.createElement('li');
        li.textContent = `${movie.title} - ${movie.genre}`;
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = async () => {
          await fetch(`/movies/${movie._id}`, { method: 'DELETE' });
          fetchMovies();
        };
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.onclick = () => {
          editMode = true;
          editMovieId = movie._id;
          titleInput.value = movie.title;
          genreInput.value = movie.genre;
          addMovieButton.textContent = 'Update Movie';
        };
        li.appendChild(editButton);
        li.appendChild(deleteButton);
        moviesList.appendChild(li);
      });
    };
  
    // Add or update a Movie
    addMovieButton.addEventListener('click', async () => {
      const title = titleInput.value;
      const genre = genreInput.value;
      if (title && genre) {
        if (editMode) {
          await fetch(`/movies/${editMovieId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, genre }),
          });
          editMode = false;
          editMovieId = null;
          addMovieButton.textContent = 'Add Movie';
        } else {
          await fetch('/movies', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, genre }),
          });
        }
        titleInput.value = '';
        genreInput.value = '';
        fetchMovies();
      }
    });
  
    fetchMovies();
  });
  