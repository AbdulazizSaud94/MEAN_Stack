let mongoose = require('mongoose');


const MessageSchema = new mongoose.Schema({
    name: { type: String, required: [true, "Messages must have a sender name"] },
    content: { type: String, required: [true, "Messages must have content"] },
    comments: [CommentSchema],
}, { timestamps: true });

const CommentSchema = new mongoose.Schema({
    commenter: {type: String, required: [true, "Comments must have a sender name"]},
    comment: {type: String, required: [true, "Comments must have content"]},
  }, {timestamps: true})

let Message = module.exports = mongoose.model('Message', MessageSchema);