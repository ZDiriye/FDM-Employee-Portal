const db = require('./dbPath');

function getTeamlessAccount(req, res) {
    const query = `
        SELECT 
            account.userId,
            user.firstName, 
            user.lastName, 
            user.email,
            account.type, 
            account.teamId, 
            account.clientId
        FROM 
            account
        INNER JOIN
            user ON account.userId = user.userId    
        WHERE
            account.teamId = NULL`;
    db.all(query, (err, rows) => {
        if (err) {
            console.error('Error running query:', err.message);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            res.json(rows);
        }
    });
}

module.exports = getTeamlessAccount;
