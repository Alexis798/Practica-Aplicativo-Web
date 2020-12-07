const path = require('path')


const express = require('express')

const { config, engine} = require('express-edge')

const Usuario = require('./models/Usuario')

const mongoose = require('mongoose')

const bodyParser = require('body-parser')

const app = new express()

mongoose.connect('mongodb://localhost/practica')

app.use(engine);
app.set('views', `${__dirname}/views`);

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.get('/', async (req, res) => {
	//res.sendFile(path.resolve(__dirname, 'html/index.html'))
	const usuarios = await Usuario.find({})
	console.log(usuarios)

	res.render('index', {
		usuarios
	})
})

app.get('/usuario/:id', async (req, res) => {
	const usuario = await Usuario.findById(req.params.id)
	console.log(usuario)

	res.render('usuario', {
		usuario
	})
})

app.get('/ingresar', (req, res) => {
	//res.sendFile(path.resolve(__dirname, 'html/index.html'))
	res.render('ingresar')
})

app.post('/ingresar/guardar', (req, res) => {
	Usuario.create(req.body, (error, Usuario) => {
		res.redirect('/')
	})
})

app.get('/editar/:id', async (req, res) => {
	//res.sendFile(path.resolve(__dirname, 'html/index.html'))
	
	const usuario = await Usuario.findById(req.params.id)

	console.log(usuario)

	res.render('editar', {
		usuario
	})
})

app.post('/editar/guardar', (req, res) => {
	const idUsuario = req.body.id
	console.log(idUsuario)

	Usuario.findByIdAndUpdate(idUsuario, {
		nombre: req.body.nombre,
		telefono: req.body.telefono,
		mail: req.body.mail
	}, (error, usuario) => {
		console.log(error, idUsuario)
		res.redirect('/')
	})

})

app.get('/borrar/:id', async (req,res) => {

	const usuario = await Usuario.findById(req.params.id)

	console.log(usuario)

	res.render('borrar', {
		usuario
	})
})

app.post('/borrar', (req, res) => {
	const idUsuario = req.body.id
	console.log(idUsuario)

	Usuario.findByIdAndRemove(idUsuario, function(err){
		if(err){
			res.send(err);
		}else{
			res.redirect("/")
		}
	})
})



app.listen(4000, () => {
	console.log('Aplicación corriendo en el puerto 4000')
})