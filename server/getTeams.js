const db = require('./dbPath');

function getTeams(req, res) {
    const query = `
        SELECT 
            team.teamId, 
            team.teamName,
            team.managerId,
            user.firstName,
            user.lastName
        FROM 
            team 
        INNER JOIN 
            account ON team.managerId = account.userId
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

module.exports = getTeams;
