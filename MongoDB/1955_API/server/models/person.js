let mongoose = require('mongoose');

const PersonSchema = new mongoose.Schema({
    name: { type: String, required: true },
}, { timestamps: true });

let Person = module.exports = mongoose.model('Person', PersonSchema);