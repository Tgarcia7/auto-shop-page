'use strict';
var autoRouts = require('../controller/appController.js');

var sql = require('../model/db');//temporal para pruebas

module.exports = function(app) {  
  app.route('/auto')
    .get(autoRouts.listarTodos);
   
  app.route('/auto/:usuario')
    .get(autoRouts.listarPorUsuario);

  app.route('/auto')
    .post(autoRouts.agregarAuto);

  app.route('/citas/:fecha')
  .get(autoRouts.citas);

  app.route('/citas')
  .post(function(req, res){

    let stmt = `INSERT INTO citas (cita_usuario, cita_placa, cita_descripcion, cita_fecha)
                VALUES(?,?,?,?)`;
    let values = [req.body.usuario, req.body.carro, req.body.descripcion, req.body.fecha];
    
    // execute the insert statment
    sql.query(stmt, values, (err, results, fields) => {
      if (err) {
        return console.error(err.message);
      }
    });

      res.json(req.body);
      return console.error("agregado");;
  });

};