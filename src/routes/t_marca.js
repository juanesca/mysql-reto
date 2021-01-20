const router = require("express").Router();

const db = require("../database");

router.get("/registro", async (req, res) => {
  await db.query("SELECT count(*) FROM tipo_marca", (err, rows, field) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});

router.get('/m-l-c', async (req,res) => {
    await db.query('SELECT b.desc_marca, a.desc_linea, COUNT(a.desc_linea) AS cantidad FROM tipo_marca AS b INNER JOIN tipo_linea AS a ON b.id_marca = a.id_marca', (err,rows,field)=>{
        if(!err){
            res.json(rows);
        } else {
            console.log(err);
        }
    })
});

router.post("/add", async (req, res) => {
  const { desc_marca, activo } = req.body;
  const newT_marca = {
    desc_marca,
    activo,
  };
  await db.query("INSERT INTO tipo_marca SET ?", [newT_marca], (err) => {
    if (err) {
      console.log(err);
    }
  });
});

router.post('/delete/:id', async (req,res) => {
  const { id } = req.params;
  await db.query('DELETE FROM tipo_marca WHERE id_marca = ?',[id], (err) => {
    if (err){
      console.log(err);
    }
  })
});

module.exports = router;
