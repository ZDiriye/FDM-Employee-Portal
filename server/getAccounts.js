const db = require('./dbPath');

function getAccounts(req, res) {
    const query = `
        SELECT 
            user.firstName, 
            user.lastName, 
            user.email,
            account.userId,
            account.password,
            account.type, 
            account.teamId, 
            account.clientId
        FROM 
            account 
        INNER JOIN 
            user ON account.userId = user.userId`;
    db.all(query, (err, rows) => {
        if (err) {
            console.error('Error running query:', err.message);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            res.json(rows);
        }
    });
}

module.exports = getAccounts;
