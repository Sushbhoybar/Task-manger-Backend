const express = require('express');
const db = require('./db');
const router = express.Router();

// Get all tasks
router.get('/tasks', (req, res) => {
    db.query('SELECT * FROM tasks', (err, results) => {
        if (err) return res.status(500).send(err.message);
        res.status(200).json(results);
    });
});

// Get a task by ID
router.get('/tasks/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM tasks WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).send(err.message);
        res.status(200).json(results[0]);
    });
});

// Create a task
router.post('/tasks', (req, res) => {
    const { title, description } = req.body;
    db.query('INSERT INTO tasks (title, description) VALUES (?, ?)', [title, description], (err, results) => {
        if (err) return res.status(500).send(err.message);
        res.status(201).json({ message: 'Task created', id: results.insertId });
    });
});

// Update a task
router.put('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const { title, description, status } = req.body;
    db.query('UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ?', [title, description, status, id], (err, results) => {
        if (err) return res.status(500).send(err.message);
        res.status(200).json({ message: 'Task updated' });
    });
});

// Delete a task
router.delete('/tasks/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM tasks WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).send(err.message);
        res.status(200).json({ message: 'Task deleted' });
    });
});

module.exports = router;