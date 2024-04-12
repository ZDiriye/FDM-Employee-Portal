const db = require('./dbPath');

function getUserLeaveRequest(req, res) {
    const userId = req.query.userId;
    const filter = req.query.filter;
    const orderBy = req.query.orderBy;

    console.log("Received request for user:", userId);
    console.log("Filter:", filter);
    console.log("OrderBy:", orderBy);

    let query = `
        SELECT
            startTime,
            endTime,
            description,
            Approval,
            dateSubmitted
        FROM
            leaveRequest
        WHERE
            userId = ?`;

    // Modify the query based on the filter parameter
    if (filter === 'Pending') {
        query += ` AND Approval = 'Pending'`;
    } else if (filter === 'Completed') {
        query += ` AND Approval != 'Pending'`;
    }

    // Modify the query based on the orderBy parameter
    if (orderBy === 'newest') {
        query += ` ORDER BY dateSubmitted DESC`;
    } else if (orderBy === 'oldest') {
        query += ` ORDER BY dateSubmitted ASC`;
    }

    console.log("Executing query:", query);

    db.all(query, [userId], (err, rows) => {
        if (err) {
            console.error('Error running query:', err.message);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            console.log("Fetched leave requests:", rows);
            res.json(rows);
        }
    });
}

module.exports = getUserLeaveRequest;
