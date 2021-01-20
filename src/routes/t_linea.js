const router = require("express").Router();

const db = require("../database");

router.get("/registro", async (req, res) => {
  await db.query("SELECT count(*) FROM tipo_linea", (err, rows, field) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});

router.get('/order-activo', async (req,res) =>{
  await db.query('SELECT IF(activo = \'S\', \'Activo\', \'Inactivo\') AS activo, COUNT(activo) FROM tipo_linea GROUP BY activo', (err,rows,field) => {
    if(!err){
      res.json(rows);
    } else {
      console.log(err);
    }
  })
});

router.get('/vehiculos', async (req, res) => {
  await db.query(`SELECT vehiculos.nro_placa, vehiculos.modelo, tipo_linea.desc_linea, tipo_marca.desc_marca FROM vehiculos JOIN tipo_linea ON vehiculos.id_linea=tipo_linea.id_linea JOIN tipo_marca ON tipo_linea.id_marca= tipo_marca.id_marca`, (err,rows,field) => {
    if(!err){
      res.json(rows);
    } else {
      console.log(err);
    }
  });
  return res.json(rows);
});

router.get('/vehiculosLEFT', async (req, res) => {
  await db.query(`SELECT vehiculos.nro_placa, vehiculos.modelo, tipo_linea.desc_linea, tipo_marca.desc_marca FROM vehiculos LEFT JOIN tipo_linea ON vehiculos.id_linea=tipo_linea.id_linea LEFT JOIN tipo_marca ON tipo_linea.id_marca= tipo_marca.id_marca`, (err,rows,field) => {
    if(!err){
      res.json(rows);
    } else {
      console.log(err);
    }
  });
  return res.json(rows);
});

router.get('/all', async (req,res) => {
  await db.query(`SELECT vehiculos.nro_placa, vehiculos.modelo, tipo_linea.id_linea, tipo_linea.desc_linea, CASE WHEN tipo_linea.activo = 'S' THEN 'activo' WHEN tipo_linea.activo = 'N' THEN 'inactivo' END AS linea_activa, tipo_marca.id_marca, tipo_marca.desc_marca, CASE WHEN tipo_marca.activo = 'S' THEN 'activo' WHEN tipo_marca.activo = 'N' THEN 'inactivo' END AS marca_activa, DATE_FORMAT(CAST(vehiculos.fecha_ven_seguro AS DATETIME),  "%d/%m/%Y %H:%i:%s") AS fecha_ven_seguro,DATE_FORMAT(  CAST(     vehiculos.fecha_ven_tecnomecanica AS DATETIME ),"%d/%m/%Y %H:%i:%s") AS fecha_ven_tecnomecanica,DATE_FORMAT(CAST(vehiculos.fecha_ven_contratodo AS DATETIME),"%d/%m/%Y %H:%i:%s") AS fecha_ven_contratodo FROM vehiculosJOIN tipo_linea ON vehiculos.id_linea = tipo_linea.id_lineaJOIN tipo_marca ON tipo_linea.id_marca = tipo_marca.id_marcaWHERE vehiculos.modelo <> NULL AND vehiculos.fecha_ven_contratodo <> NULL AND tipo_marca.desc_marca <> NULL AND tipo_linea.desc_linea <> NULL`)});
  

router.post("/add", async (req, res) => {
  const { desc_linea, id_marca, activo } = req.body;
  const newT_linea = {
    desc_linea,
    id_marca,
    activo,
  };
  await db.query("INSERT INTO tipo_linea SET ?", [newT_linea]);
});


module.exports = router;
