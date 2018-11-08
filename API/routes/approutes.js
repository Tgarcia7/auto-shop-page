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
};