const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Example task structure: { task: "Sample Task", completed: false }
let todos = [];

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Set view engine to EJS
app.set('view engine', 'ejs');

// Home Route: Displays the Todo List
app.get('/', (req, res) => {
    res.render('index', { todos });
});

// Add Task Form Route
app.get('/add', (req, res) => {
    res.render('add');
});

// Add Task Logic
app.post('/add', (req, res) => {
    const { task } = req.body;
    if (task) {
        todos.push({ task, completed: false });
    }
    res.redirect('/');
});

// Delete Task Logic
app.post('/delete', (req, res) => {
    const index = parseInt(req.body.index);
    if (!isNaN(index) && todos[index]) {
        todos.splice(index, 1);
    }
    res.redirect('/');
});

// Toggle Completed Status Logic
app.post('/toggle', (req, res) => {
    const index = parseInt(req.body.index);
    if (!isNaN(index) && todos[index]) {
        todos[index].completed = !todos[index].completed;
    }
    res.redirect('/');
});

// Start the Server
app.listen(port, () => {
    console.log(`Todo app is running at http://localhost:${port}`);
});
