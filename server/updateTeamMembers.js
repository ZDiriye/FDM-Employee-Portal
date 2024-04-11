const db = require('./dbPath');

function updateTeamMembers(req, res) {
    const { teamId, userIds } = req.body;

    // Begin transaction
    db.serialize(() => {
        db.run('BEGIN TRANSACTION');

        // Update team ID for each user
        const updateUserTeamQuery = 'UPDATE account SET teamId = ? WHERE userId = ?';
        userIds.forEach(userId => {
            db.run(updateUserTeamQuery, [teamId, userId], function(err) {
                if (err) {
                    console.error('Error updating team member:', err);
                    db.run('ROLLBACK');
                    return res.status(500).json({ error: 'Internal server error' });
                }
            });
        });

        // Commit transaction
        db.run('COMMIT', function(err) {
            if (err) {
                console.error('Error committing transaction:', err);
                return res.status(500).json({ error: 'Internal server error' });
            }
            res.status(200).json({ message: 'Team members updated successfully' });
        });
    });
}

module.exports = updateTeamMembers;
