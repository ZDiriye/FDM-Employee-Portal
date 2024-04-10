const db= require('./dbPath');

function payslip(req, res){
    
    const {userId} = req.body;

    db.all(`select * from Payslip where userId = '${userId}'`, (err, rows) =>{
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

}
module.exports = payslip;
