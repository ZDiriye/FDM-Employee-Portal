const express = require('express')
const app = express()
const cors = require('cors')
const sqlite3 = require('sqlite3').verbose();


app.use(cors())
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
});
app.use(express.json({limit : '10mb'}))


let db = new sqlite3.Database('se_project.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the access database');
});

app.post('/validatePassword', (req, res) =>{
    const {username, password} = req.body

    db.all(`select * from account where userId = '${username}' and password ='${password}'`, (err, rows) => {
        if(err){
            throw err;
        }

        if(rows.length > 0){
            res.send({validation: true})
        }else{
            res.send({validation: false})
        }
    });
})



app.listen(3001, () => console.log('Listening at port 3001'))