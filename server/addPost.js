const multer = require('multer');
const path = require('path');
const db= require('./dbPath');

// Multer configuration for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

// Function to add a new blog post
const addPost = (req, res, next) => {
    let text = req.body.text;
    const userId = req.body.userId;
    const title = req.body.title;
    const name = req.body.name
    const postDate = new Date().toISOString();
    
    if (req.file) {
        // If an image was uploaded, use its path as the data
        data = path.join('uploads', req.file.filename);
    }

    const sql = 'INSERT INTO BLOG (text, title, userId, name, postDate) VALUES (?, ?, ?, ?, ?)';
    const params = [text, title, userId, name, postDate];
    
    db.run(sql, params, function(err) {
        if (err) {
            console.error(err.message);
            res.status(500).send({ error: err.message });
            return;
        }
        res.status(201).send({ message: 'Post successfully added', postId: this.lastID });
    });
};

// Export the middleware and function so it can be used in server.js
module.exports = {
    uploadMiddleware: upload.single('image'),
    addPost
};
