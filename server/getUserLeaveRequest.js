const db = require('./dbPath');

function getUserLeaveRequest(req, res) {
    console.log(req.body); // Log the request body to see what data is being sent
    const userId= req.body.userId;


   let query = `
   SELECT
       leaveRequest.startTime,
       leaveRequest.endTime,
       leaveRequest.description,
       leaveRequest.Approval,
       leaveRequest.dateSubmitted
   FROM
       leaveRequest
   WHERE
       leaveRequest.userId = ?`;


   const filter = req.query.filter;
   const orderBy = req.query.orderBy;



   if (filter === 'Pending') {
       query += ` AND leaveRequest.Approval = 'Pending'`;
   } else if (filter === 'Completed') {
       query += ` AND leaveRequest.Approval != 'Pending'`;
   }


   if (orderBy === 'newest') {
       query += ` ORDER BY leaveRequest.dateSubmitted DESC`;
   } else if (orderBy === 'oldest') {
       query += ` ORDER BY leaveRequest.dateSubmitted ASC`;
   }


   db.all(query, [userId], (err, rows) => {
       if (err) {
           console.error('Error running query:', err.message);
           res.status(500).json({ error: 'Internal server error' });
       } else {
           res.json(rows);
       }
   });
}


module.exports = getUserLeaveRequest;
