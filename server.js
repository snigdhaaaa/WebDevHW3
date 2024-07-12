const express = require('express');
const mongoose = require('mongoose');
const path = require('path');  // Ensure path module is required
const Movie = require('./movie');
const app = express();
const port = 3000;

app.use(express.json());

mongoose.connect('mongodb+srv://snigdhadas:Jhinukdas2003!@gpacalculator.aytg8df.mongodb.net/?retryWrites=true&w=majority&appName=GPACalculator', {
    useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

// Create movie
app.post('/movies', async (req, res) => {
    let movie = new Movie({ title: req.body.title, genre: req.body.genre });
    movie = await movie.save();
    res.send(movie);
});

// Get all movies
app.get('/movies', async (req, res) => {
    const movies = await Movie.find();
    res.send(movies);
});

// Get single movie
app.get('/movies/:id', async (req, res) => {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).send('Movie not found');
    res.send(mobie);
});

// Update movie
app.put('/movies/:id', async (req, res) => {
    const movie = await Movie.findByIdAndUpdate(
        req.params.id,
        { title: req.body.title, genre: req.body.genre },
        { new: true }
    );
    if (!movie) return res.status(404).send('Movie not found');
    res.send(movie);
});

// Delete Movie
app.delete('/movies/:id', async (req, res) => {
    const movie = await Movie.findByIdAndDelete(req.params.id);  // Updated method
    if (!movie) return res.status(404).send('Movie not found');
    res.status(204).send();
});

// Load assets
app.use('/assets/css', express.static(path.resolve(__dirname, 'assets/css')));
app.use('/assets/img', express.static(path.resolve(__dirname, 'assets/img')));
app.use('/assets/js', express.static(path.resolve(__dirname, 'assets/js')));

// Route to serve index.html
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'views', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
