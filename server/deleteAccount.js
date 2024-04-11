// deleteAccount.js
const db = require('./dbPath');

const deleteAccount = (req, res) => {
    const userId = req.body.userId;

    // Delete the account, which will automatically delete associated user(s) due to cascading delete
    db.run(`DELETE FROM "account" WHERE "userId" = ?`, userId, function(err) {
        if (err) {
            console.error('Error deleting account:', err);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            res.status(200).json({ message: 'Account and associated user(s) deleted successfully' });
        }
    });
};

module.exports = deleteAccount;
