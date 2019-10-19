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
    },
    
    editTask: function (req, res) {
        console.log('ahii')
        Task.updateOne({_id : req.params.id}, {title: req.body.title,
            description: req.body.description, completed: req.body.completed
            })
                .then(data => {
                    console.log('data updated', data)
                    res.json({data: data});
                })
                .catch(err => {
                    console.log("We have an error!", err);
                    for (var key in err.errors) {
                        req.flash('registration', err.errors[key].message);
                    }
                    res.json(err);
                });
    },

}