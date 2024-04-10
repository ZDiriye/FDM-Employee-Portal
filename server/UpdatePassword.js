const db = require('./dbPath'); // Assuming your database connection is exported from 'db.js'

const updatePassword = (req, res) => {
    const { userId, password } = req.body;

    // Validate input
    if (!userId || !password) {
        return res.status(400).json({ error: 'Missing userId or password' });
    }

    // Update only the password in the "account" table
    db.run(`UPDATE "account" SET "password" = ? WHERE "userId" = ?`, [password, userId], function(err) {
        if (err) {
            console.error('Error updating password:', err);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            res.status(200).json({ message: 'Password updated successfully' });
        }
    });
};

module.exports = updatePassword; // Rename this as it no longer updates the entire account