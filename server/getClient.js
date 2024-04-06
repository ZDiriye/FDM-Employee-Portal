const db = require('./dbPath');

function getClients(req, res) {
    const query = `
        SELECT 
            clientId, 
            clientName,
            clientEmail
        FROM 
            client `;
    db.all(query, (err, rows) => {
        if (err) {
            console.error('Error running query:', err.message);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            res.json(rows);
        }
    });
}

module.exports = getClients;
