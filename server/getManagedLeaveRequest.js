const db = require('./dbPath');

function getManagedLeaveRequest(req, res) {
   const managerId = req.query.managerId;
   const filter = req.query.filter;
   const orderBy = req.query.orderBy;

   let query = `
   SELECT
       user.userId, user.firstName, user.lastName, leaveRequest.startTime, leaveRequest.endTime, leaveRequest.description, leaveRequest.Approval, leaveRequest.dateSubmitted
   FROM
       leaveRequest
   INNER JOIN
       account ON leaveRequest.userId = account.userId
   INNER JOIN
       team ON account.teamId = team.teamId
   INNER JOIN
       user ON account.userId = user.userId
   WHERE
       team.managerId = ?`; // gets the leave requests of employees managed by a specific manager


   if (filter === 'Pending') {
       query += ` AND leaveRequest.Approval = 'Pending'`;
   } else if (filter === 'Completed') {
       query += ` AND leaveRequest.Approval != 'Pending'`;
   }

   if (orderBy === 'Newest') {
       query += ` ORDER BY leaveRequest.dateSubmitted DESC`;
   } else if (orderBy === 'Oldest') {
       query += ` ORDER BY leaveRequest.dateSubmitted ASC`;
   }


   db.all(query, [managerId], (err, rows) => {
       if (err) {
           console.error('Error running query:', err.message);
           res.status(500).json({ error: 'Internal server error' });
       } else {
           res.json(rows);
       }
   });
}


module.exports = getManagedLeaveRequest;