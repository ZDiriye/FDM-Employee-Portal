const db = require('./dbPath');

function createTeam(req, res) {
    const { managerId, teamName } = req.body;
    console.log(managerId, teamName, req.body);

    const insertTeamQuery = 'INSERT INTO team (managerId, teamName) VALUES (?, ?)';
    db.run(insertTeamQuery, [managerId, teamName], function (err) {
        if (err) {
            console.error('Error inserting team:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }

        const teamId = this.lastID;
        console.log('Team inserted:', teamId);

        // Call the function to update the account table
        updateAccount(teamId, managerId, res);
    });
}

function updateAccount(teamId, managerId, res) {
    const updateUserTeam = 'UPDATE account SET teamID = ? WHERE userId = ?';
    db.run(updateUserTeam, [teamId, managerId], function (err) {
        if (err) {
            console.error('Error updating account:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }

        console.log('Account updated');
        res.status(200).json({ message: 'Team created successfully' });
    });
}

module.exports = createTeam;
