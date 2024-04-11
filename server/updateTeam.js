const db = require('./dbPath');

function updateTeam(req, res) {
    const { teamId, managerId, teamName } = req.body;

    // Fetch current manager ID for the team from the database
    const getCurrentManagerQuery = 'SELECT managerId FROM team WHERE teamId = ?';
    db.get(getCurrentManagerQuery, [teamId], (err, row) => {
        if (err) {
            console.error('Error fetching current manager:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }

        const currentManagerId = row.managerId;
        console.log(currentManagerId);
        // Update team details including manager in the team table
        const updateTeamQuery = 'UPDATE team SET managerId = ?, teamName = ? WHERE teamId = ?';
        db.run(updateTeamQuery, [managerId, teamName, teamId], function(err) {
            if (err) {
                console.error('Error updating team:', err);
                return res.status(500).json({ error: 'Internal server error' });
            }

            // Check if manager ID has changed
            if (currentManagerId !== managerId) {
                // Update old manager's teamId in the account table
                const updateOldManagerQuery = 'UPDATE account SET teamId = NULL WHERE userId = ?';
                db.run(updateOldManagerQuery, [currentManagerId], function(err) {
                    if (err) {
                        console.error('Error updating old manager:', err);
                        return res.status(500).json({ error: 'Internal server error' });
                    }

                    // Update new manager's teamId in the account table
                    const updateNewManagerQuery = 'UPDATE account SET teamId = ? WHERE userId = ?';
                    db.run(updateNewManagerQuery, [teamId, managerId], function(err) {
                        if (err) {
                            console.error('Error updating new manager:', err);
                            return res.status(500).json({ error: 'Internal server error' });
                        }

                        res.status(200).json({ message: 'Manager updated successfully' });
                    });
                });
            } else {
                // If manager is not updated, just return success
                res.status(200).json({ message: 'Team updated successfully' });
            }
        });
    });
}

module.exports = updateTeam;
