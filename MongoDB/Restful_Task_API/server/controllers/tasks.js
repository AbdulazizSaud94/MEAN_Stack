let mongoose = require('mongoose');
let Task = require('../models/task');

module.exports = {

    index: function (req, res) {
        Task.find()
            .then(tasks => res.json(tasks))
            .catch(err => res.json(err));
    },

    getTask: function (req, res) {
        Task.findOne({ _id: req.params.id }, function (error, task) {
            if (error)
                res.json(error);
            else
                res.json(task);
        })
    },

    addTask: function(req, res){
        Task.create({title: req.body.title, description: req.body.description, completed: req.body.completed}, function(error, task){
            if(error){
                res.json({message: "Error", error: error});
            }
            else{
                res.json({message: "Success", added: true});
            }
        })
    },

    deleteTask: function(req, res){
        Task.remove({_id: req.params.id},function(error){
            if(error){
                res.json({message: "Error", error: error});
            }
            else{
                res.json({message: "Success", removed: true});
            }
        })
    }

}