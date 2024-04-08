const db = require('./dbPath');

function getClientInfo(req, res) {
    const userId = req.query.userId;

    console.log("function running for account ", userId);

    console.log(userId);


    const query = `
        SELECT 
            client.clientId,
            client.clientName,
            client.clientEmail
        FROM 
            client
        INNER JOIN 
                account ON client.clientId = account.clientId
        WHERE
            account.userId = ?`;

    console.log("query is ", query);

    db.all(query, userId, function(err,data) {
        if (err) {
            console.error('Error getting data:', err);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            console.log('Got client info:', data);
            res.status(200).json(data); 
        }
    });
}

module.exports = getClientInfo;
