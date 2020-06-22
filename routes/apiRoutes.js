var db = require("../models");


// module.exports = function(app) {
//   // Get all examples
//   app.get("/api/examples", function(req, res) {
//     db.Example.findAll({}).then(function(dbExamples) {
//       res.json(dbExamples);
//     });
//   });

//   // Create a new example
//   app.post("/api/examples", function(req, res) {
//     db.Example.create(req.body).then(function(dbExample) {
//       res.json(dbExample);
//     });
//   });

//   // Delete an example by id
//   app.delete("/api/examples/:id", function(req, res) {
//     db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
//       res.json(dbExample);
//     });
//   });
// };


//change to html route?
module.exports = function(app) {
    app.get("/api/kids/:id", function(req, res) {
        db.Kids.findOne({
            where: {
                id: req.params.id
            },
            include: [db.Timedhw, db.Taskedhw, db.Chores, db.Dietary]
        }).then(function(dbKids) {
            // console.log(dbKids.dataValues.Timedhws[0].dataValues.assignment)
            // console.log(dbKids.dataValues.Timedhws[0].dataValues.minutes_required)
            console.log(dbKids.dataValues.Timedhws[0]);
            console.log(dbKids.dataValues.Taskedhws[0]);
            console.log(dbKids.dataValues.Chores[0]);
            console.log(dbKids.dataValues.Dietaries[0]);
            // console.log(dbKids)
            // console.log(dbKids.dataValues.Timedhws.Timedhw)
            res.render("individualkid", {
                Kid: dbKids
            });

        });
    })
}