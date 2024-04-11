const db = require('./dbPath');

function createClient(req, res) {
    const { clientName, clientEmail } = req.body;
    console.log(clientName, clientEmail, req.body);

    const insertClientQuery = 'INSERT INTO client (clientName, clientEmail) VALUES (?, ?)';
    db.run(insertClientQuery, [clientName, clientEmail], function (err) {
        if (err) {
            console.error('Error inserting client:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        console.log('client inserted:', this.lastID);
        res.status(200).json({ message: 'client created successfully' });
    });
}

module.exports = createClient;
