const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')


//backend functions imports
const PasswordValidation = require('./PasswordValidation');
const EmailCode = require('./EmailCode');
const CheckCode = require('./CheckCode');
const updatePassword = require('./UpdatePassword');
const { uploadMiddleware, addPost } = require('./addPost');
const viewPost = require('./viewPost');
const deletePost = require('./RemovePost');
const getAccounts = require('./getAccounts');
const createAccount = require('./createAccount');
const updateAccount = require('./updateAccount')
const deleteAccount = require('./deleteAccount')
const getTeams = require('./getTeams')
const createTeam = require('./createTeams')
const deleteTeam = require('./deleteTeam')
const updateTeam = require('./updateTeam');
const updateTeamMembers = require('./updateTeamMembers');
const deleteTeamMembers = require('./deleteTeamMembers');
const getTeamMember = require('./getTeamMember');
const getTeamlessAccount = require('./getTeamlessAccount');
const getTeamlessManager =require('./getTeamlessManager');
const getManagers= require('./getManagers')
const createClient =require('./createClient');
const updateClient =require('./updateClient');
const deleteClient = require('./deleteClient');
const getClient = require('./getClient');



const app = express()
app.use(cors())
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
});
app.use(express.json({limit : '10mb'}))
app.use(bodyParser.json());


// assinging each imported function to a path for the fronend code
app.post('/validatePassword', PasswordValidation);
app.post("/recoveryEmail", EmailCode);
app.post("/securityCode", CheckCode);
app.post('/updatePassword', updatePassword);
app.post('/addPost', uploadMiddleware, addPost);
app.post('/viewPost',viewPost );
app.delete('/deletePost', deletePost);
app.get('/api/accounts/view', getAccounts);
app.post('/api/accounts/add', createAccount);
app.post('/api/accounts/update', updateAccount);
app.delete('/api/accounts/delete', deleteAccount);
app.get('/api/teams/view', getTeams);
app.post('/api/teams/add', createTeam);
app.delete('/api/teams/delete', deleteTeam);
app.post('/api/teams/update', updateTeam);
app.post('/api/teams/updateTeamMembers', updateTeamMembers); // not used
app.delete('/api/teams/deleteTeamMembers', deleteTeamMembers); // not used
app.get('/api/teams/getTeamlessManager',getTeamlessManager);
app.get('/api/teams/getManagers',getManagers);
app.get('/api/accounts/getTeamMember', getTeamMember);
app.get('/api/accounts/getTeamlessAccount', getTeamlessAccount);
app.post('/api/clients/add',createClient);
app.post('/api/clients/update',updateClient);
app.get('/api/clients/view',getClient);
app.delete('/api/clients/delete',deleteClient);






app.listen(3001, () => console.log('Listening at port 3001'))