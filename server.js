//Importing express framework
const express = require('express');
const app = express();
const port = 3000; //Using port 3000 as domain

// Middleware for error handling, logs the error stack to the console and sends a 500 response
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Middleware to serve static files from the "public" directory
app.use(express.static('public'));

// Import and configure body-parser to parse URL-encoded bodies
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// Route for the root URL, sends a simple welcome message
app.get('/', (req, res) => {
    res.send('Welcome to Data Respresentation & Querying');
});

// Dynamic route that greets the user using name and surname passed in the URL
app.get('/hello/:name/:surname', (req, res) => {
    const name = req.params.name;
    const surname = req.params.surname;
    res.send(`Hello ${name} ${surname}`);
});

// Route that returns a list of movies in JSON format
app.get('/api/movies', (req, res) => {
    const movies = [
        {
            "Title": "Avengers: Infinity War",
            "Year": "2018",
            "imdbID": "tt4154756",
            "Type": "movie",
            "Poster": "https://example.com/poster1.jpg"
        },
        {
            "Title": "Captain America: Civil War",
            "Year": "2016",
            "imdbID": "tt3498820",
            "Type": "movie",
            "Poster": "https://example.com/poster2.jpg"
        },
        {
            "Title": "World War Z",
            "Year": "2013",
            "imdbID": "tt0816711",
            "Type": "movie",
            "Poster": "https://example.com/poster3.jpg"
        }
    ];
    res.status(200).json({ myMovies:movies });
});

// Import the "path" module to work with file and directory paths
const path = require('path');

// Route that serves the "index.html" file located in the same directory as the server file
app.get('/index', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// GET Route 
app.get('/name', (req, res) => {
    const firstname = req.query.firstname;
    const lastname = req.query.lastname;
    res.send(`Hello ${firstname} ${lastname}`);
});
// POST route
app.post('/name', (req, res) => {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    res.send(`Hello ${firstname} ${lastname}`);
});

// Start the server, listening on the specified port
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

