var express = require("express");
var router = express.Router();
var dbPool = require("./db");
var db = dbPool.getPool();

/* GET page of posti*/
router.get("/:id", function (req, res) {
  var id = parseInt(req.params.id);
  var busId;
  var bus;
  db.query("SELECT bus FROM tratta WHERE id=$1;", [id], (error, results) => {
    if (error) {
      throw error;
    } else {
      busId = results.rows[0].bus;
      db.query("SELECT * FROM bus WHERE id=$1;", [busId], (error, results) => {
        if (error) {
          throw error;
        } else {
          bus = results.rows;
          db.query(
            "SELECT * FROM posto WHERE bus=$1;",
            [busId],
            (error, results) => {
              if (error) {
                throw error;
              } else {
                res.render("selezioneposti", {
                  bus: busId,
                  tratta: id,
                  posti: results.rows,
                });
                
              }
            }
          );
        }
      });
    }
  });
});

module.exports = router;
