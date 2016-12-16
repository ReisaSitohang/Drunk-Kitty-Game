'use strict'
//__________Import Modules
const express    =  require( 'express' )
const router     =  express.Router(  )
const bodyParser =  require( 'body-parser' )
const Sequelize  =  require( 'Sequelize' )
var multer  = require('multer')
var path = require('path')
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)) //Appending extension
  }
})
const db         =  new Sequelize('drunkkitty', process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD,{
	host: 'localhost',
	dialect: 'postgres'
});
//Middleware
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({     // to support URL-encoded bodies
	extended: true
})); 
//Define models
let Card = db.define('card', {
	name: {type: Sequelize.STRING, unique: true},
	rule: {type: Sequelize.STRING},
	type: {type: Sequelize.STRING},
	origin: {type: Sequelize.STRING},
}, {
	timestamps: false
})

let User = db.define('user', {
	name: {type: Sequelize.STRING, unique: true},
});

let Email = db.define('email', {
	email: {type: Sequelize.STRING, unique: true},
});
// Put info in card DB

var ReadandParser = require (__dirname+'/../Modules/JsonReadandParser')

ReadandParser (__dirname+'/../Cards.json', function(jsonContent) {
	console.log(jsonContent)
	Card.bulkCreate(jsonContent)
	.catch(function(err) {
		console.log('Error ' + err);
	})
	.finally(function(err) {
		console.log('FINISHED')
	});
})


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
		res.send(data)
	})
})

//Save emails
router.post('/email', (req, res) => {
	Email.create({
		email: req.body.email
	}).then( (data)=>{
		console.log(data)
		res.status(204).end()
	})
})

//Upload Card
router.post('/upload', multer({ storage: storage}).single('upl'), function(req,res)
	{ console.log(req.body) 
		console.log(req.file.filename)
		Card.create({
		name: req.file.filename,
		rule: req.body.Rule,
		type: req.body.Type,
		origin: "notoriginal",
		})
		res.status(204).end(); })
// router.post('/uploadnoimg', (res,req)=>{
// 		Card.create({
// 		name: req.file.filename,
// 		rule: req.body.Rule,
// 		type: req.body.Type,
// 		origin: "notoriginal",
// 		})
// })


  ////////////////////
 ////// EXPORT //////
////////////////////

module.exports = router