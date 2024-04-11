const db = require('./dbPath');

function deletePost(req, res) {
    const { postIdsToDelete } = req.body;

    if (!postIdsToDelete || !Array.isArray(postIdsToDelete) || postIdsToDelete.length === 0) {
        return res.status(400).json({ message: "No post IDs provided or the provided data is not an array." });
    }

    let deletedCount = 0;
    let errors = [];

    // Loop through all the post IDs and delete each one
    postIdsToDelete.forEach((postId, index, array) => {
        const sql = `DELETE FROM BLOG WHERE postId = ?`;
        
        db.run(sql, postId, function(err) {
            if (err) {
                // If there's an error, push it to the errors array
                console.error("Error deleting post with ID " + postId + ":", err.message);
                errors.push({ postId: postId, error: err.message });
            } else if (this.changes > 0) {
                // Increment the count for successful deletions
                deletedCount++;
            }

            // If we've processed the last postId, send the response
            if (index === array.length - 1) {
                if (errors.length > 0) {
                    // If there were any errors, return a 500 status with the error details
                    return res.status(500).json({
                        message: "Some posts could not be deleted.",
                        deletedCount: deletedCount,
                        errors: errors
                    });
                } else {
                    // If all deletions were successful, return a 200 status
                    return res.json({ message: `${deletedCount} posts deleted successfully.` });
                }
            }
        });
    });
}

module.exports = deletePost;
