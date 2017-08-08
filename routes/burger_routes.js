var db = require("../models");
module.exports = function(app) {

  app.get("/burgers", function(req, res) {
      db.SecondBurger.findAll({}).then(function(result) {
          res.json(result);
    });
  });

  app.delete("/delete/:id", function(req, res) {
    db.SecondBurger.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(result) {
        //res.redirect("/");
        res.json(result);
    });
  });


  app.put("/update/:id", function(req, res) {
    db.SecondBurger.update(
      {eaten:true},
      {where: 
          {  id: req.params.id    }
      }
      ).then(function(dbPost) {
        res.json(dbPost);
      });
  });


  app.post("/addNewBurger", function(req, res) {
    db.SecondBurger.create(req.body).then(function(result) {
      res.json(result);
    });
  });


}