const mongoose = require('mongoose')

const UsuarioSchema = new  mongoose.Schema({
	nombre: String,
	telefono: String,
	mail: String,
	creadoEn: {
		type: Date,
		default: new Date()
	}
})

const Usuario = mongoose.model('users', UsuarioSchema)
module.exports = Usuario