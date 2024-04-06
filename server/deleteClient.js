const db = require('./dbPath');

const deleteClient = (req, res) => {
    console.log(req.body); // Log the request body to see what data is being sent
    const clientId = req.body.clientId;
    const sql = 'DELETE FROM "client" WHERE "clientId" = ?';
    console.log('SQL:', sql); // Log the SQL query
    db.run(sql, clientId, function(err) {
        if (err) {
            console.error('Error deleting client:', err);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            console.log('Deleted client with clientId:', clientId);
            res.status(200).json({ message: 'client deleted successfully' });
        }
    });
};

module.exports = deleteClient;
