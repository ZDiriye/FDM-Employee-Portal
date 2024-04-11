const db = require('./dbPath');

function getManagerId(req, res) {
    const teamId = req.query.teamId;

    const query = `
        SELECT 
            managerId
        FROM 
            team
        WHERE 
            teamId = ?`;

    db.all(query, [teamId], (err, rows) => {
        if (err) {
            console.error('Error running query:', err.message);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            res.json(rows);
        }
    });
}

module.exports = getManagerId;
