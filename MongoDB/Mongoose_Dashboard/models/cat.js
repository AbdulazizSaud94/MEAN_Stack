let mongoose = require('mongoose');



const CatSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 3 },
    food: { type: String, required: true, minlength:5 },
    age: Number,
}, { timestamps: true });

let Cat = module.exports = mongoose.model('Cat', CatSchema);