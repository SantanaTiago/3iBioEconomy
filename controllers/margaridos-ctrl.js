const dbEntrada = require('../models/entrada-model')
const dbGeral = require('../models/geral-model')
const dbSaida = require('../models/saida-model')
const User = require("../models/User");

getTankEntradaById = async (req, res) => {
    await dbEntrada.findOne({ _id: req.params.id }, (err, data) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!data) {
            return res
                .status(404)
                .json({ success: false, error: `Entrance tank data not found` })
        }
        return res.status(200).json({ success: true, data: data })
    }).catch(err => console.log(err))
}

getTankEntrada = async (req, res) => {
    await dbEntrada.find({}, null, {sort: {timestamp: -1}}, (err, data) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!data.length) {
            return res
                .status(404)
                .json({ success: false, error: `Entrance tank not found` })
        }
        return res.status(200).json({ success: true, data: data })
    }).catch(err => console.log(err))
}

getTankEntradaLast = async (req, res) => {
    await dbEntrada.find({}, null, {sort: {timestamp: -1}, limit:10},(err, data) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!data) {
            return res
                .status(404)
                .json({ success: false, error: `Last data of entrance tank not found` })
        }
        return res.status(200).json({ success: true, data: data })
    }).catch(err => console.log(err))
}

getTankGeralById = async (req, res) => {
    await dbGeral.findOne({ _id: req.params.id }, (err, data) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!data) {
            return res
                .status(404)
                .json({ success: false, error: `Geral tank data not found` })
        }
        return res.status(200).json({ success: true, data: data })
    }).catch(err => console.log(err))
}

getTankGeral = async (req, res) => {
    await dbGeral.find({}, null, {sort: {timestamp: -1}}, (err, data) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!data.length) {
            return res
                .status(404)
                .json({ success: false, error: `Geral tank not found` })
        }
        return res.status(200).json({ success: true, data: data })
    }).catch(err => console.log(err))
}

getTankGeralLast = async (req, res) => {
    await dbGeral.find({}, null, {sort: {timestamp: -1}, limit:10}, (err, data) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!data) {
            return res
                .status(404)
                .json({ success: false, error: `Last data from geral tank not found` })
        }
        return res.status(200).json({ success: true, data: data })
    }).catch(err => console.log(err))
}

getTankSaidaById = async (req, res) => {
    await dbSaida.findOne({ _id: req.params.id }, (err, data) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!data) {
            return res
                .status(404)
                .json({ success: false, error: `Exit Tank data not found` })
        }
        return res.status(200).json({ success: true, data: data })
    }).catch(err => console.log(err))
}

getTankSaida = async (req, res) => {
    await dbSaida.find({}, null, {sort: {timestamp: -1}}, (err, data) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!data.length) {
            return res
                .status(404)
                .json({ success: false, error: `Exit Tank not found` })
        }
        return res.status(200).json({ success: true, data: data })
    }).catch(err => console.log(err))
}

getTankSaidaLast = async (req, res) => {
    await dbSaida.find({}, null, {sort: {timestamp: -1}, limit:10}, (err, data) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!data) {
            return res
                .status(404)
                .json({ success: false, error: `Last data form exit tank not found` })
        }
        return res.status(200).json({ success: true, data: data })
    }).catch(err => console.log(err))
}

module.exports = {
    getTankEntrada,
    getTankEntradaLast,
    getTankEntradaById,
    getTankGeral,
    getTankGeralLast,
    getTankGeralById,
    getTankSaida,
    getTankSaidaLast,
    getTankSaidaById,
}
