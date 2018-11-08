'use strict';
var autoRouts = require('../controller/appController.js');

module.exports = function(app) {  
  app.route('/auto')
    .get(autoRouts.listarTodos);
   
  app.route('/auto/:usuario')
    .get(autoRouts.listarPorUsuario);

  app.route('/auto')
    .post(autoRouts.agregarAuto);

  app.route('/citas/:fecha')
  .get(autoRouts.citas);

  /*app.post('/citas', function(req, res){

    let stmt = `INSERT INTO citas (cita_usuario, cita_placa, cita_descripcion, cita_fecha)
                VALUES(?,?)`;
    let values = [1, req.body.carro, req.body.descripcion, "2018-01-01"];
    
    // execute the insert statment
    sql.query(stmt, values, (err, results, fields) => {
      if (err) {
        return console.error(err.message);
      }
    });
    console.log("listo");
  });*/

};