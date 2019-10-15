let mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    commenter: { type: String, required: [true, "Comments must have a sender name"], minlength: [3, "Commenter name must be of length 3 or more"]},
    comment: { type: String, required: [true, "Comments must have content"], minlength: [3, "Comment must be of length 3 or more"] },
}, { timestamps: true })

const MessageSchema = new mongoose.Schema({
    name: { type: String, required: [true, "Messages must have a sender name"], minlength: [3, "Name must be of length 3 or more"] },
    content: { type: String, required: [true, "Messages must have content"], minlength: [3, "Message must be of length 3 or more"] },
    comments: [CommentSchema],
}, { timestamps: true });


let Comment = module.exports = mongoose.model('Comment', CommentSchema);
let Message = module.exports = mongoose.model('Message', MessageSchema);
