const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

let todos = []; // Example task structure: { task: "Sample Task", completed: false }

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Set view engine to EJS
app.set('view engine', 'ejs');

// Routes
app.get('/', (req, res) => {
    res.render('index', { todos });
});

app.get('/add', (req, res) => {
    res.render('add');
});

app.post('/add', (req, res) => {
    const { task } = req.body;
    if (task) {
        todos.push({ task, completed: false });
    }
    res.redirect('/');
});

app.post('/delete', (req, res) => {
    const { index } = req.body;
    if (index !== undefined) {
        todos.splice(index, 1);
    }
    res.redirect('/');
});

// Toggle the task completion status
app.post('/toggle', (req, res) => {
    const { index, completed } = req.body;

    if (index !== undefined) {
        // Toggle the completed status based on the checkbox value
        todos[index].completed = completed === 'on';  // If checked, set true, else false
    }
    res.redirect('/'); // Redirect back to the homepage
});

// Start the server
app.listen(port, () => {
    console.log(`Todo app is running at http://localhost:${port}`);
});
