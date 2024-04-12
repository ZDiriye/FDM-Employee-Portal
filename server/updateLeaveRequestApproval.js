const db = require('./dbPath');

function updateLeaveRequestApproval(req, res) {
    const updatedApprovals = req.body;

    const updateQuery = `
        UPDATE leaveRequest
        SET Approval = ?
        WHERE userId = ? AND dateSubmitted = ?`;

    // Iterate through the updated approvals and execute the update query for each record
    updatedApprovals.forEach(async (approval) => {
        const { userId, dateSubmitted, approvalStatus } = approval;
        try {
            await db.run(updateQuery, [approvalStatus, userId, dateSubmitted]);
        } catch (error) {
            console.error('Error updating approval:', error.message);
            return res.status(500).json({ error: 'Internal server error' });
        }
    });

    res.json({ message: 'Leave request approvals updated successfully' });
}


module.exports = updateLeaveRequestApproval;
