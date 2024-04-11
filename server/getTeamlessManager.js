const db = require('./dbPath'); 

function getTeamlessManager(req, res) {
    const query = `
        SELECT 
            account.userId
        FROM 
            account 
        WHERE
            account.teamId IS NULL 
            AND account.type = 'manager'`; 

    db.all(query, (err, rows) => {
        if (err) {
            console.error('Error running query:', err.message);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            res.json(rows);
        }
    });
}

module.exports = getTeamlessManager;
