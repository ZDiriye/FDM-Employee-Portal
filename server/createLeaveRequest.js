const db = require('./dbPath');

function createLeaveRequest(req, res) {
  const { userId, startTime, endTime, description, dateSubmitted, Approval } = req.body;


  const insertLeaveRequestQuery = 'INSERT INTO leaveRequest (userId, startTime, endTime, description, dateSubmitted, Approval) VALUES (?, ?, ?, ?, ?, ?)';
  db.run(insertLeaveRequestQuery, [userId, startTime, endTime, description, dateSubmitted, Approval], function(err) {
      if (err) {
          console.error('Error executing SQL query:', err.message);
          return res.status(500).json({ error: 'Internal server error' });
      }
      console.log('Leave request created successfully');
      return res.status(200).json({ message: 'Leave request created successfully' });
  });
}


module.exports = createLeaveRequest;