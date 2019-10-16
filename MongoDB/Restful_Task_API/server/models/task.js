var mongoose = require("mongoose");

var TaskSchema = new mongoose.Schema({
    title: { type: String },
    description: { type: String },
    completed: { type: Boolean, default: false },
}, { timestamps: true });

let Task = module.exports = mongoose.model('Task', TaskSchema);