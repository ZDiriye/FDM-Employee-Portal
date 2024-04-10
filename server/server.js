/*const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const updatePersonalInfo = require('./updatePersonalInfo');
const PasswordValidation = require('./PasswordValidation');
const updatePassword = require('./UpdatePassword');
const getAccounts = require('./getAccounts');
*/
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const updatePersonalInfo = require('./updatePersonalInfo'); // Ensure this is the correct path and function name

const app = express();
const port = 5000;
app.use(cors({
  origin: 'http://localhost:3000', // This should be the origin of the site that will be making the requests
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Include any other methods you wish to allow
  credentials: true, // This is needed if your frontend is sending credentials like cookies or basic auth
  optionsSuccessStatus: 200 // Some legacy browsers (IE11, various SmartTVs) choke on 204
}));

app.use(bodyParser.json());

// Define your routes here
app.post('/updatePersonalInfo', updatePersonalInfo);



// Your API endpoints
//app.get('/api/accounts/view', getAccounts);
//app.post('/api/accounts/validatePassword', PasswordValidation);
//app.post('/api/accounts/updatePassword', updatePassword);


// Start your server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

