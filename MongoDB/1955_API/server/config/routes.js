var persons = require("../controllers/persons.js");

module.exports = function(app){

    app.get("/", persons.index)

    app.get("/new/:name", persons.addPerson)

    app.get("/remove/:name", persons.removePerson)

    app.get("/:name", persons.details)
}