'use strict'
//__________Import Modules
const express    =  require( 'express' )
const router     =  express.Router(  )
// const session    =  require( 'express-session' )
const bodyParser =  require( 'body-parser' )
const sequelize  =  require( 'sequelize' )
const db         =  new sequelize('drunkkitty', process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD,{
						host: 'localhost',
						dialect: 'postgres'
					});
//Define models
let Card = db.define('card', {
	name: {type: sequelize.STRING, unique: true},
});

let User = db.define('user', {
	name: {type: sequelize.STRING, unique: true},
});

//sync
db.sync( {'force': true} )

//Set Routes
router.get('/', (req, res) => {
	res.render('index')
})

router.post('/SwitchCard', (req, res) => {
	res.render('index')
})



  ////////////////////
 ////// EXPORT //////
////////////////////

module.exports = router