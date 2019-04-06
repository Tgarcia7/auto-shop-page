'use strict'
var Automovil = new require("../model/appModel")

exports.listarTodos = (req, res) => {
  Automovil.listarTodos((err, auto) => {
    if (err) { res.send(err) }
    res.json(auto)
  })
}

exports.listarPorUsuario = (req, res) => {
  Automovil.listarPorUsuario(req.params.usuario, (err, auto) => {
    if (err) {res.send(err)}
    res.json(auto)
  })
}

exports.listarPorFecha = (req, res) => {
  Automovil.listarPorFecha(req.params.fecha, (err, auto) => {
    if (err){ res.send(err) }
    res.json(auto)
  })
}

exports.horarioDisponible = (req, res) => {
  Automovil.horarioDisponible(req.params.fecha, (err, horDisp) => {
    if (err){res.send(err)}
    res.json(horDisp)
  })
}

exports.aceptarCitas = (req, res) => {
  Automovil.aceptarCitas(req.params.idCita, (err, aceptar) => {
    if (err){ res.send(err) }
    res.json(aceptar)
  })
}

exports.rechazarCitas = (req, res) => {
  Automovil.rechazarCitas(req.params.idCita, (err, rechazar) => {
    if (err){ res.send(err) }
    res.json(rechazar)
  })
}

exports.nombreUsuario = (req, res) => {
  Automovil.nombreUsuario(req.params.idUsuario, (err, user) => {
    if (err){ res.send(err) }
    res.json(user)
  })
}

exports.agregarCita = (req, res) => {
  Automovil.agregarCita(req, (err, cita) => {
    if (err) { res.send(err) }
    res.json(req.body)
  })
}

exports.agregarAuto = (req, res) => {
  Automovil.agregarAuto(req, (err, cita) => {
    if (err) { res.send(err) }
    res.json(req.body)
  })
}