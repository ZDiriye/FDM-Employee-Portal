const db = require('./dbPath');

function countUsersLeaveRequests(req, res) {
    const userId = req.query.userId;
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


    db.all(query, [userId], (err, rows) => {
        if (err) {
            console.error('Error running query:', err.message);
            res.status(500).json({ error: 'Internal server error' });
        } else {
        // Count total leave requests
        let totalLeaveRequests = rows.length;

        // Count pending leave requests
        let pendingLeaveRequests = rows.filter(request => request.Approval === 'Pending').length;

        // Count completed leave requests
        let completedLeaveRequests = totalLeaveRequests - pendingLeaveRequests;

        // Construct response object
        let response = {
            totalLeaveRequests: totalLeaveRequests,
            pendingLeaveRequests: pendingLeaveRequests,
            completedLeaveRequests: completedLeaveRequests,
        };

        res.json(response);
    }
    });
}


module.exports = countUsersLeaveRequests;