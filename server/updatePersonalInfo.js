const db = require('./dbPath'); // Assuming your database connection is exported from 'db.js'

module.exports = function updatePersonalInfo(req, res){
    const { userId, newFirstName, newLastName } = req.body;
    const updateNameQuery = `UPDATE user SET firstName = ?, lastName = ? WHERE userId = ? `;

   try {
       await db.run(updateNameQuery, [newFirstName, newLastName, userId]);
       res.json({ success: true, message: 'Information updated successfully.' });
   } catch (error) {
       console.error('Error updating approval:', error.message);
       res.status(500).json({ error: 'Internal server error' });
   }
};
