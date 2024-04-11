const db = require('./dbPath');

const deleteTeam = (req, res) => {
    console.log(req.body); // Log the request body to see what data is being sent
    const teamId = req.body.teamId;
    const sql = 'DELETE FROM "team" WHERE "teamId" = ?';
    console.log('SQL:', sql); // Log the SQL query
    db.run(sql, teamId, function(err) {
        if (err) {
            console.error('Error deleting team:', err);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            console.log('Deleted team with teamId:', teamId);
            res.status(200).json({ message: 'Team deleted successfully' });
        }
    });
};

module.exports = deleteTeam;
