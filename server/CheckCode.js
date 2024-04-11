const db= require('./dbPath');


function CheckCode (req, res){
    const {username, securityCode} = req.body;
    db.get(`select reset_code, reset_timestamp from user where userID = "${username}"`, (err, row) => {
        if(err){
            return res.status(500).send({ message: "An error occurred while retrieving the reset code" });
        }

        if(row && row.reset_code === securityCode && Date.now()- row.reset_timestamp<300000){
            res.send({ validation: true });
            db.run(`update user set reset_code = NULL, reset_timestamp = NULL where userID = "${username}"`, function(err){
                if(err){
                    console.error("Error clearing reset code: ", err.message);
                }
            console.log("vallidation is TRUE");
            });
        }else{
            res.send({ validation: false });
        }
    })
};

module.exports = CheckCode;
