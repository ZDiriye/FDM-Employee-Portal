const db = require('./dbPath'); // Assuming your database connection is exported from 'db.js'

const updateClient = (req, res) => {
    const { clientId, clientName, clientEmail } = req.body;

    // Update client details in the database
    db.run(`UPDATE "client" SET "clientName" = ?, "clientEmail" = ? WHERE "clientId" = ?`, [
        clientName,
        clientEmail,
        clientId
    ], function(err) {
        if (err) {
            console.error('Error updating client:', err);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            console.log('Updated client with clientId:', clientId);
            res.status(200).json({ message: 'Client updated successfully' });
        }
    });
};

module.exports = updateClient;
