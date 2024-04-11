const db= require('./dbPath');

function viewTeamPost(req, res){

    teamId = req.body.teamId;

    db.all(`select * from teamBlog where teamId ='${teamId}' order by postId desc`, (err, rows) =>{
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

    db.run(`delete from teamBlog where postDate < datetime('now', '-3 days')`, (err) => {
        if (err) {
            console.error(err);
            
        }
       console.log("old posts deleted");
    });
}


module.exports = viewTeamPost;
