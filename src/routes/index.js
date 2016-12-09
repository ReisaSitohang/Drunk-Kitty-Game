'use strict'
//__________Import Modules
const express    =  require( 'express' )
const router     =  express.Router(  )
// const session    =  require( 'express-session' )
const bodyParser =  require( 'body-parser' )
const Sequelize  =  require( 'Sequelize' )
const db         =  new Sequelize('drunkkitty', process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD,{
	host: 'localhost',
	dialect: 'postgres'
});
//Define models
let Card = db.define('card', {
	name: {type: Sequelize.STRING, unique: true},
}, {
	timestamps: false
})

let User = db.define('user', {
	name: {type: Sequelize.STRING, unique: true},
});

//sync
db.sync( {'force': false} )

//Set Routes
router.get('/', (req, res) => {
	res.render('index')
})

router.get('/SwitchCard', (req, res) => {
	Card.find({
		order: [
		Sequelize.fn( 'RANDOM' ),
		]
	}).then( (data)=>{
		console.log(data)
		res.send(data.name)
	})
})



  ////////////////////
 ////// EXPORT //////
////////////////////

module.exports = router