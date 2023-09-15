// create web server with express
const express = require('express');
const app = express();
// create a port
const port = 3000;
// create a path
const path = require('path');
// create a body parser
const bodyParser = require('body-parser');
// create a mongoose
const mongoose = require('mongoose');
// connect to mongoose
mongoose.connect('mongodb://localhost:27017/comments', { useNewUrlParser: true, useUnifiedTopology: true });
// create a schema
const commentSchema = new mongoose.Schema({
    name: String,
    comment: String
});
// create a model
const Comment = mongoose.model('Comment', commentSchema);
// use body parser
app.use(bodyParser.urlencoded({ extended: true }));
// use static files
app.use(express.static('public'));
// set view engine
app.set('view engine', 'ejs');
// set views
app.set('views', path.join(__dirname, 'views'));
// get home page
app.get('/', (req, res) => {
    res.render('home');
});
// get comments page
app.get('/comments', (req, res) => {
    Comment.find({}, (err, comments) => {
        if (err) {
            console.log(err);
        } else {
            res.render('comments', { comments: comments });
        }
    });
});
// post comments page
app.post('/comments', (req, res) => {
    const comment = new Comment({
        name: req.body.name,
        comment: req.body.comment
    });
    comment.save((err, comment) => {
        if (err) {
            console.log(err);
        } else {
            console.log(comment);
            res.redirect('/comments');
        }
    });
});
// listen to port
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});