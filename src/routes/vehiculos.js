const { Router } = require("express");
const router = Router();

const db = require("../database");

router.get("/", async (req, res) => {
  await db.query("SELECT * FROM vehiculos", (err, rows, field) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});

router.get('/registro', async (req,res) => {
  await db.query('SELECT count(*) FROM vehiculos', (err,rows,field) =>{
    if(!err){
      res.json(rows);
    } else {
      console.log(err);
    }
  })
});

router.get('/model-max', async (req,res) => {
  await db.query('SELECT modelo,MAX(cantidad) AS cantidad FROM(SELECT modelo, COUNT(modelo) AS cantidad FROM vehiculos GROUP BY modelo) AS Maximo', (err,rows,field)=>{
    if(!err){
      res.json(rows);
    } else {
      console.log(err);
    }
  })
});

router.get('/model-min', async (req,res) => {
  await db.query('SELECT modelo,MIN(cantidad) AS cantidad FROM(SELECT modelo, COUNT(modelo) AS cantidad FROM vehiculos GROUP BY modelo) AS Minimo', (err,rows,field)=>{
    if(!err){
      res.json(rows);
    } else {
      console.log(err);
    }
  })
})

router.get('/order-fv-seg', async (req,res) =>{
  await db.query('SELECT * FROM vehiculos ORDER BY fecha_ven_seguro', (err,rows,field) =>{
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  })
});

router.get('/order-modelos', async(req,res)=>{
  await db.query('SELECT * FROM vehiculos ORDER BY modelo', (err,rows,field)=>{
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  })
});

router.get('/sum-modelo', async (req,res) => {
  await db.query('SELECT modelo, COUNT(modelo) AS suma FROM vehiculos GROUP BY modelo', (err,rows,field) => {
    if(!err){
      res.json(rows);
    } else {
      console.log(err);
    }
  })
});

router.get('/desc-vehiculo', async (req,res)=> {
  await db.query('SELECT vehiculos.nro_placa, vehiculos.modelo, tipo_linea.desc_linea, tipo_marca.desc_marca FROM vehiculos JOIN tipo_linea ON vehiculos.id_linea=tipo_linea.id_linea JOIN tipo_marca ON tipo_linea.id_marca= tipo_marca.id_marca', (err,rows,field)=>{
    if(!err){
      res.json(rows);
    } else {
      console.log(err);
    }
  })
});

router.get('/desc-vehiculo-activo', async (req,res)=> {
  await db.query('SELECT vehiculos.nro_placa, vehiculos.modelo, tipo_linea.desc_linea, tipo_marca.desc_marca FROM vehiculos JOIN tipo_linea ON vehiculos.id_linea=tipo_linea.id_linea AND tipo_linea.activo = \'S\' JOIN tipo_marca ON tipo_linea.id_marca= tipo_marca.id_marca AND tipo_marca.activo = \'S\'', (err,rows,field)=>{
    if(!err){
      res.json(rows);
    } else {
      console.log(err);
    }
  })
});

router.get('/prom-modelo', async (req,res) => {
  await db.query('SELECT modelo, AVG(cantidad) AS promedio FROM(SELECT modelo, COUNT(modelo) AS cantidad FROM vehiculos GROUP BY modelo) AS promedio', (err,rows,field)=>{
    if(!err){
      res.json(rows);
    } else {
      console.log(err);
    }
  })
})

router.post('/add', async (req,res) =>{
  const {nro_placa, id_linea, modelo, fecha_ven_seguro, fecha_ven_tecnomecanica, fecha_ven_contratodo } = req.body;
  const newVehiculo = {
    nro_placa,
    id_linea,
    modelo,
    fecha_ven_seguro,
    fecha_ven_tecnomecanica,
    fecha_ven_contratodo
  };
  await db.query('INSERT INTO vehiculos SET ?', [newVehiculo], (err) => {
    if (err) {
      console.log(err);
    }
  });
});

router.put('/edit/:nro_placa', async (req,res) =>{
  const {nro_placa} = req.params;
  const auto = await db.query('SELECT * FROM vehiculos WHERE nro_placa = ?', [nro_placa]);

  const {id_linea, modelo, fecha_ven_seguro, fecha_ven_tecnomecanica, fecha_ven_contratodo } = req.body;
  
  if(id_linea != null || id_linea != undefined){
    id_linea = auto.id_linea;
  }
  if(modelo != null || modelo != undefined){
    modelo = auto.modelo;
  }
  if(fecha_ven_seguro != null || fecha_ven_seguro != undefined){
    fecha_ven_seguro = auto.fecha_ven_seguro;
  }
  if(fecha_ven_tecnomecanica != null || fecha_ven_tecnomecanica != undefined){
    fecha_ven_tecnomecanica = auto.fecha_ven_tecnomecanica;
  }
  if(fecha_ven_contratodo != null || fecha_ven_contratodo != undefined){
    fecha_ven_contratodo = auto.fecha_ven_contratodo;
  }

  const newVehiculo = {
    id_linea,
    modelo,
    fecha_ven_seguro,
    fecha_ven_tecnomecanica,
    fecha_ven_contratodo
  }
  await db.query('UPDATE vehiculos SET ? WHERE nro_placa= ?',[newVehiculo, nro_placa], (err) => {
    if (err) {
      console.log(err);
    }
  })
})


module.exports = router;
