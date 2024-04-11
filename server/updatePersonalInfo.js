const db = require('./dbPath'); // Assuming your database connection is exported from 'db.js'

module.exports = function updatePersonalInfo(req, res){
    const { userId, newFirstName, newLastName,password} = req.body;
    const updateNameQuery = `UPDATE user SET firstName = ?, lastName = ? WHERE userId = ? `;
    console.log(userId, newFirstName, newLastName,password);
   try {
       db.run(updateNameQuery, [newFirstName, newLastName, userId]);
       res.json({ success: true, message: 'Information updated successfully.' });
   } catch (error) {
       console.error('Error updating approval:', error.message);
       res.status(500).json({ error: 'Internal server error' });
   }

   const updatePasswordQuery = 'UPDATE account SET password =? WHERE userId =?';
   db.run(updatePasswordQuery,[password,userId], function(err){
    if (err) {
        console.error('Error updating account:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
    });

};
