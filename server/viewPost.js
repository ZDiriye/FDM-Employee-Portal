const db= require('./dbPath');

function viewPost(req, res){

    db.all(`select * from BLOG  order by postId desc`, (err, rows) =>{
        if(err){
            console.error(err);
            return res.status(500).json({ message: "An error occurred while fetching posts." });
        }

        if(rows.length>0){

            res.json(rows);

        }else{

            res.send({validation: false});
        }

    })

    db.run(`delete from BLOG where postDate < datetime('now', '-3 days')`, (err) => {
        if (err) {
            console.error(err);
            
        }
       console.log("old posts deleted");
    });

    db.run(`
        DELETE FROM BLOG 
        WHERE postId NOT IN (
            SELECT postId FROM BLOG 
            ORDER BY postId DESC 
            LIMIT 10)`, (err) => {
        if (err) {
            console.error("Error deleting extra posts:", err);
        } else {
            console.log("Extra posts deleted, only the most recent 10 are kept");
        }
    });

}


module.exports = viewPost;