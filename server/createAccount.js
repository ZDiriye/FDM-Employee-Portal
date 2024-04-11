const db = require('./dbPath');

function createAccount(req, res) {
    const { firstName, lastName, email, password, accountType } = req.body; // Assuming the request body contains user data
    
    // Insert the new account into the database
    const insertAccountQuery = 'INSERT INTO account (password, type) VALUES (?, ?)';
    db.run(insertAccountQuery, [password, accountType], function(err) {
        if (err) {
            console.error('Error creating account:', err.message);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        
        const accountId = this.lastID; // Get the generated accountId
        
        // Insert the new user into the database
        const insertUserQuery = 'INSERT INTO user (userId, firstName, lastName, email) VALUES (?, ?, ?, ?)';
        db.run(insertUserQuery, [accountId, firstName, lastName, email], function(err) {
            if (err) {
                console.error('Error creating user:', err.message);
                res.status(500).json({ error: 'Internal server error' });
                return;
            }
            
            console.log('Account and user created successfully');
            res.status(201).json({ message: 'Account and user created successfully' });
        });
    });
}

module.exports = createAccount;
