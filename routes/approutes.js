'use strict'
var appController = require('../controller/appController')

module.exports = (app) => {

  app.route('/auto')
    .get(appController.listarTodos)

  app.route('/auto/:usuario')
    .get(appController.listarPorUsuario)

  app.route('/citas/:fecha')
    .get(appController.listarPorFecha)

  app.route('/citas')
    .post(appController.agregarCita)

  app.route('/horarioDisponible/:fecha')
    .get(appController.horarioDisponible)

  app.route('/citasAceptar/:idCita')
    .get(appController.aceptarCitas)

  app.route('/citasRechazar/:idCita')
    .get(appController.rechazarCitas)

  app.route('/usuario/:idUsuario')
    .get(appController.nombreUsuario)

  app.route('/autos')
    .post(appController.agregarAuto)

  app.get('*', (request, response) => {
    response.send('Ruta indefinida')
  })

}