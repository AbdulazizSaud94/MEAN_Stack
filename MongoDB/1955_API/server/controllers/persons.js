let Person = require('../models/person');

module.exports = {

    index: function (req, res) {
        Person.find()
            .then(names => res.json(names))
            .catch(err => res.json(err));
    },

    addPerson: function(req, res){
        Person.create({name:req.params.name}, function(error, Person){
            if(error){
                res.json(error);
            }
            else{
                res.json({added:true});
            }
        })
    },

    removePerson: function(req, res){
        Person.remove({name:req.params.name},function(error,person){
            if(error)
                res.json(error);
            else
                res.json({removed:true});
        })
    },

    details: function(req, res){
        Person.findOne({name:req.params.name},function(error,person){
            if(error)
                res.json(error);
            else
                res.json(person);
        })
    }
}