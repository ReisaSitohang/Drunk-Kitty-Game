'use strict'
//Import modules
const express    =  require ( 'express' )
const app        =  express( )
const bodyParser =  require('body-parser')
const Sequelize  =  require('sequelize')
const session    =  require('express-session')
const bcrypt     =  require('bcrypt-nodejs')
const db         =  new Sequelize('drunkkitty', process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD,{
						host: 'localhost',
						dialect: 'postgres'
					});


//Set views
app.set('views', './views')
app.set('view engine', 'pug')

//Use static folder
app.use (express.static(__dirname + '/public'))


//Setting Routes
app.use('/', require( __dirname+'/routes/index' ) )
// app.use('/', registerRouter )

//Set port & Sync database

db.sync( {'force': false} ).then(

	() => { 
			console.log ( 'Synchronized' )

			app.listen(3000, function () {
			console.log('Yep Running')
		} )
	},
	(err) => { console.log('Synchronize failed: ' + err) } 
	)


