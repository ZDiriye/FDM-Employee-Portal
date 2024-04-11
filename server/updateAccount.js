const db = require('./dbPath'); // Assuming your database connection is exported from 'db.js'

const updateAccount = (req, res) => {
    const updatedAccount = req.body;

    // Check if "Unassign Team" option is selected
    if (updatedAccount.teamId === "Unassign Team") {
        updatedAccount.teamId = null; // Set teamId to null
        console.log('team',updatedAccount.teamId)
    }

    if (updatedAccount.clientId === "Unassign Client") {
        updatedAccount.clientId = null; // Set clientId to null
        console.log('client',updatedAccount.clientId)
    }
    // Update account details in the database
    db.run(`UPDATE "user" SET "firstName" = ?, "lastName" = ?, "email" = ? WHERE "userId" = ?`, [
        updatedAccount.firstName,
        updatedAccount.lastName,
        updatedAccount.email,
        updatedAccount.userId
    ], function(err) {
        if (err) {
            console.error('Error updating account:', err);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            // If the account is successfully updated, also update the account details in the "account" table
            db.run(`UPDATE "account" SET "password" = ?, "type" = ?, "teamId" = ?, "clientId" = ? WHERE "userId" = ?`, [
                updatedAccount.password,
                updatedAccount.type,
                updatedAccount.teamId,
                updatedAccount.clientId,
                updatedAccount.userId
            ], function(err) {
                if (err) {
                    console.error('Error updating account details:', err);
                    res.status(500).json({ error: 'Internal server error' });
                } else {
                    res.status(200).json({ message: 'Account updated successfully' });
                }
            });
        }
    });
};

module.exports = updateAccount;
