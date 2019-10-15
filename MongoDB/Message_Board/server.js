const express = require("express");
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');
app.use(session({
    secret: 'keyboardkitteh',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))
app.use(express.static(__dirname + "/static"));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
var bodyParser = require('body-parser')
const flash = require('express-flash');
app.use(flash());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
mongoose.connect('mongodb://localhost/testdb1', { useNewUrlParser: true });

let db = mongoose.connection;

// Check Database connection
db.once('open', function () {
    console.log("Connected to mongoDB. ");
});

// check Database errors
db.on('error', function (err) {
    console.log(err);
});

const CommentSchema = new mongoose.Schema({
    commenter: { type: String, required: [true, "Comments must have a sender name"], minlength: [3, "Commenter name must be of length 3 or more"] },
    comment: { type: String, required: [true, "Comments must have content"], minlength: [3, "Comment must be of length 3 or more"] },
}, { timestamps: true })

const MessageSchema = new mongoose.Schema({
    name: { type: String, required: [true, "Messages must have a sender name"], minlength: [3, "Name must be of length 3 or more"] },
    content: { type: String, required: [true, "Messages must have content"], minlength: [3, "Message must be of length 3 or more"] },
    comments: [CommentSchema],
}, { timestamps: true });

mongoose.model('Message', MessageSchema);
var Message = mongoose.model('Message');
mongoose.model('Comment', CommentSchema);
var Comment = mongoose.model('Comment');


app.get('/', (req, res) => {
    Message.find({}).sort({ createdAt: 'desc' }).find(function (err, posts) {
        if (err) {
            console.log(err);
        }
        else {
            res.render('index', {
                posts: posts,
            });
        }
    });
});

app.post('/add_message', (req, res) => {
    console.log("Message DATA", req.body);
    var message = new Message({ name: req.body.message_name, content: req.body.message_text });
    message.save(function (err) {
        if (err) {
            console.log("We have an error!", err);
            // adjust the code below as needed to create a flash message with the tag and content you would like
            for (var key in err.errors) {
                req.flash('registration', err.errors[key].message);
            }
            res.redirect('/');
        }
        else {
            console.log('successfully added a Message!');
            res.redirect('/');
        }
    })
});

// app.post('/add_comment/:id', (req, res) => {
//     console.log("Comment DATA", req.body);
//     console.log(`msg id:${req.params.id}`);
//     Comment.create(req.body, function (err, data) {
//         if (err) {
//             // handle the error from creating comment
//             console.log("error from creating comment");
//             res.redirect('/');
//         }
//         else {
//             Message.findOneAndUpdate({ _id: req.params.id }, { $push: { comments: data } }, function (err, data) {
//                 if (err) {
//                     // handle the error from trying to update the user
//                     console.log("error from trying to update the message");
//                     res.redirect('/');
//                 }
//                 else {
//                     console.log("Comment added");
//                     res.redirect('/');
//                 }
//             })
//         }
//     });
// });

app.post('/add_comment/:id', function (req, res) {
    Message.findOne({ _id: req.params.id }, function (err, message) {
        var comment = new Comment(
            {
                commenter: req.body.comment_name,
                comment: req.body.comment_text,
            });
        console.log(comment);

        message.comments.push(comment);
        message.save(function (err) {
            if (err) {
                console.log('something went wrong');
                console.log(comment.errors);
                res.redirect('/')
            }
            else {
                console.log('successfully added a Comment!');
                res.redirect('/');
            }
        });
    });
});

app.listen(8000, () => console.log("listening on port 8000"));