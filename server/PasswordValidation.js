const db = require('./dbPath');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'abc'; // for creating the token



function PasswordValidation(req, res){
    const {username, password} = req.body

    db.all(`select * from account where userId = '${username}' and password ='${password}'`, (err, accountRow) => {
        if(err){
            throw err;
        }

        if(accountRow.length>0){
            db.get(`select * from user where userID = "${username}"`, (err, userRow) => {
                if(err){
                    console.error(err.message);
                    return res.status(500).send({ validation: false, message: 'An error occurred' });
                }

                if (userRow) {
                    // User found, create a token with both userID and username.
                    console.log("this is type: ", userRow  )
                    const token = jwt.sign(
                        { userID: username, Name: userRow.firstName, Surname:userRow.lastName, Type: accountRow[0].type },
                        SECRET_KEY,
                        { expiresIn: '1h' } // Token expires in 1 hour
                    );

                    res.send({ validation: true, token: token });
                } else {
                    // No Name found for this userID
                    res.status(404).send({ validation: false, message: 'No Name found for given userID' });
                }
            });
        }else{
            res.send({ validation: false, message: 'Invalid userID or password' });
        }

            
    });
};

module.exports = PasswordValidation; 
