const db = require('./dbPath');

function deleteTeamMembers(req, res) {
    const { userIds } = req.body;

    // Begin transaction
    db.serialize(() => {
        db.run('BEGIN TRANSACTION');

        // Delete team members
        const deleteTeamMembersQuery = 'DELETE FROM account WHERE userId = ?';
        userIds.forEach(userId => {
            db.run(deleteTeamMembersQuery, [userId], function(err) {
                if (err) {
                    console.error('Error deleting team member:', err);
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
            res.status(200).json({ message: 'Team members deleted successfully' });
        });
    });
}

module.exports = deleteTeamMembers;
