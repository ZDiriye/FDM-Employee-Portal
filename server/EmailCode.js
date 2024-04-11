const nodemailer = require('nodemailer');
const db= require('./dbPath');



function sendEmail(randomCode, emailAddress){

    return new Promise((resolve, reject) => {

        

        var transporter = nodemailer.createTransport({
            service:"gmail",
            auth:{
                user:'sbalpreet801@gmail.com',
                pass:'emja sswd xalf vesq'
            }
        })


        const mail_configs = {
            from:'sbalpreet801@gmail.com',
            to: emailAddress,
            subject:'FDM security code',
            text: `Your security code is: ${randomCode}`,
        }

        transporter.sendMail(mail_configs,  function(error, info){
            if(error){
                console.log(error)
                return reject({message:'An error is occured'})
            }
            return resolve({message:"Email sent succesfully"})
        })

    })
}




 function EmailCode(req, res){
    const {username} = req.body
    const randomCode = Math.floor(100000 + Math.random() * 900000);
    const timestamp = Date.now();


    db.get(`select email from user where userID= '${username}'`, (err, row) => {

        if(err){
            return res.status(500).send({ message: "An error occurred while fetching the email" });
        }

        if (row){
            emailAddress = row.email;
            console.log(emailAddress, randomCode, timestamp);

            db.run(`UPDATE user SET reset_code = ?, reset_timestamp = ? WHERE userID = ?`, [randomCode, timestamp, username], function(err){
                if(err){
                    return res.status(500).send({ message: "An error occurred while storing the reset code" });
                }

                sendEmail(randomCode, emailAddress)
                    .then(response => res.send(response.message))
                    .catch(error => res.status(500).send(error.message));
            });
        }
        else{
            return res.status(404).send({ message: "Invalid username" });
        }
    });
};

module.exports = EmailCode;
