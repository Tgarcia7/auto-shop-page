'use strict'
var ModelTaller = new require("../model/appModel")

exports.listarTodos = (req, res) => {
  ModelTaller.listarTodos((err, auto) => {
    if (err) { res.send(err) }
    res.json(auto)
  })
}

exports.listarPorUsuario = (req, res) => {
  ModelTaller.listarPorUsuario(req.params.usuario, (err, auto) => {
    if (err) { res.send(err) }
    res.json(auto)
  })
}

exports.listarPorFecha = (req, res) => {
  ModelTaller.listarPorFecha(req.params.fecha, (err, auto) => {
    if (err) { res.send(err) }
    res.json(auto)
  })
}

exports.horarioDisponible = (req, res) => {
  ModelTaller.horarioDisponible(req.params.fecha, (err, horDisp) => {
    if (err) { res.send(err) }
    res.json(horDisp)
  })
}

exports.aceptarCitas = (req, res) => {
  ModelTaller.aceptarCitas(req.params.idCita, (err, aceptar) => {
    if (err) { res.send(err) }
    res.json(aceptar)
  })
}

exports.rechazarCitas = (req, res) => {
  ModelTaller.rechazarCitas(req.params.idCita, (err, rechazar) => {
    if (err) { res.send(err) }
    res.json(rechazar)
  })
}

exports.nombreUsuario = (req, res) => {
  ModelTaller.nombreUsuario(req.params.idUsuario, (err, user) => {
    if (err) { res.send(err) }
    res.json(user)
  })
}

exports.agregarCita = (req, res) => {
  ModelTaller.agregarCita(req, (err, cita) => {
    if (err) { res.send(err) }
    res.json(req.body)
  })
}

exports.agregarAuto = (req, res) => {
  ModelTaller.agregarAuto(req, (err, cita) => {
    if (err) { res.send(err) }
    res.json(req.body)
  })
}