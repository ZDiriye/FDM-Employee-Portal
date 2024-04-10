const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Resolve the absolute path to the SQLite database file
const dbPath = path.resolve(__dirname, 'se_project.db');

// Connect to the database
const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error('Error connecting to database:', err.message);
    } else {
        console.log('Connected to the database');

        // Enable foreign key support
        db.exec("PRAGMA foreign_keys=ON", (err) => {
            if (err) {
                console.error('Error enabling foreign key support:', err.message);
            } else {
                console.log('Foreign key support enabled');
            }
        });
    }
});

module.exports = db;