$( document ).ready( ()=> {

	//This function shows random card
	let NextCard = ""
	function AppendRandomCard (){
		$.get("/SwitchCard", (RandomCard)=>{
			NextCard = RandomCard})
		.then(()=>{ $('#TheCard').slideUp(1000, ()=>{
			$('#TheCard').empty()
			$('#TheCard').hide()
			$('#TheCard').html('<img id="CardImg" src="/Images/'+NextCard+'"/>')
			$('#TheCard').slideDown(1000)
		})
	})		
	}
	//Run function on click button or car
	$('#TheCard').click( () => {
		AppendRandomCard( )
	})
	$("#NextCard").click( () => {
		AppendRandomCard( )
	})

	//This function adds a player
	let PlayerCounter = 0
	function addPlaya () {
		if ( $('#AddPlayerName').val().length > 1 ){
			PlayerCounter = PlayerCounter+1
			console.log(PlayerCounter)
			let name = $('#AddPlayerName').val()
			$('#players').append('<div class="playerStyle" id="Playa'+PlayerCounter+'"><span id="remove'+PlayerCounter+'" class="glyphicon glyphicon-remove" aria-hidden="true"></span><span class="namelist">'+name+'</span><span class="score" style="float : right" id="ScorePlayer'+PlayerCounter+'"> 0</span></div>')
			$('#AddPlayerName').val(" ")
			$(".glyphicon-remove").click( () => {
				let target = "#"+event.target.id
				id = $(target).closest("div").prop("id")
				let PlayaID = "#"+id
				$(PlayaID).remove()				
			})
		}	
	}
	//Run function on click button or on keyboard enter
	$("#AddPlayerBtn").click( () => {
		console.log("clickedbutton")
		addPlaya ()
	})
	$("#AddPlayerName").keypress(function(e) {
		if(e.which == 13) {
			addPlaya ()
		}
	})
	//Show players to choose from in the give card modal
	$("#SaveCard").click( () =>{
		let ArrayName = document.getElementById('players').getElementsByClassName('namelist')
		$('#giveCard').empty()
		for (var i = 0; i < ArrayName.length; i++) {
			let name = ArrayName[i].innerText 
			let names= '<button class="givePlayerCard"><span class="namelist">'+name+'</span></button>'
			$('#giveCard').append(names)
		}
		//Get the name of the player on click
		let giveCardCounter = 0
		$(".givePlayerCard").click( () => {
			giveCardCounter = giveCardCounter+1
			let target = event.target.innerText
			console.log( target )
			let name = target
			let srcCard = document.getElementById('TheCard').getElementsByTagName('img')[0].src
			let SavedCard = '<div id="savedCard'+giveCardCounter+'" class="savedCardSmall"><span>'+name+'</span><span aria-hidden="true" class="glyphicon glyphicon-remove smallCard" id="removeSavedCard'+giveCardCounter+'"></span><img src="'+srcCard+'" style="width:100px;height:80px; margin:5px;"></div>'
			$("#SavedCard").prepend(SavedCard)
			$(".smallCard").click( () => {
				console.log("clicked glyphy")
				let target = "#"+event.target.id
				console.log(target)
				id = $(target).closest("div").prop("id")
				let CardID = "#"+id
				$(CardID).remove()				
			})			
		})
	})	
})