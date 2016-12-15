$( document ).ready( ()=> {
	//This function adds info on the card Bubble
	function appendCardInfo (text) {
	$('#CardInfo').empty();
	$('#CardInfo').append(text);
	$('#CardInfo').hide();
	$('#CardInfo').fadeIn();
	}
	//This function shows random card and its rules
	let NextCard = ""
	let CardInfo = ""
	let CardType = ""
	function AppendRandomCard (){
		$.get("/SwitchCard", (Card)=>{
			NextCard = Card.name
			CardInfo = Card.rule
			CardType = Card.type
			console.log(NextCard)
			console.log(CardInfo)
			console.log(CardType)
		})
		.then(()=>{ $('#TheCard').slideUp(1000, ()=>{
			//show card
			$('#TheCard').empty()
			$('#TheCard').hide()
			$('#TheCard').html('<img id="CardImg" src="/Images/'+NextCard+'"/>')
			$('#TheCard').slideDown(1000)
			//show card info in bubble
			$('#CardInfo-Box').hide();
			$('#CardInfo-Box').fadeOut();
			$('#CardInfo-Box').show('show');
			appendCardInfo (CardInfo)
				if(CardType=="Single"){
					SinglePoint ()
				}
			})
		})
	}
	//This function gives points for the single player games
	function SinglePoint (){
		//Get a point yes or no?
			let pointQ = "<div>Do you get a point?</div><div><button class='btn btn-sm btn-success' id='YES'>YES</p><button class='btn btn-sm btn-danger' id='NO'>NO</p></div><div id='nopoint'></div>"
			$('#CardInfo').append(pointQ)
			//No point, next card
			$('#NO').click( ()=>{
				AppendRandomCard( )
			})
			//Got a point yes, who got a point?
			$('#YES').click(()=>{
				$('#nopoint').fadeOut()
				console.log("clicked Yes")
				let ArrayName = document.getElementById('players').getElementsByClassName('namelist')
				console.log(ArrayName)
				$('#CardInfo').append("<div><p>Who got a point?</p></div>")
				// let names =""
				for (var i = 0; i < ArrayName.length; i++) {
					console.log("I am looping")
					let name = ArrayName[i].innerText 
					console.log(name)
					let names= '<button class="givePlayerPoint"><span number="'+(i+1)+'" class="namelist">'+name+'</span>'
					console.log(names)
					let pointYes = names
					$('#CardInfo').append(pointYes)
				}
			// Get the player that gets a points
			$(".givePlayerPoint").click( () => {
				let target = event.target.innerText
				let num = event.target.getAttribute('number')
				let theId = "#score"+num
				console.log(theId)
				//Get the old points
				let OldScore = Number($(theId).text())
				//Add a point
				let NewScore = OldScore+1
				$('#score'+num).empty()
				$('#score'+num).append("<span>"+NewScore+"</span>")
						// let SinglePoint = 1
						// let DoublePoint = 2
						// let pinfo = document.getElementById('players')
						// let OldScore = document.getElementById('players').getElementsByClassName('score')

						// let NewScore = OldScore
						// $(".givePlayerPoint")

			})


				// let points = document.getElementById('TheCard').getElementsByTagName('img')[0].src
				// let srcCard = document.getElementById('TheCard').getElementsByTagName('img')[0].src
				// let SavedCard = '<div id="savedCard'+giveCardCounter+'" class="savedCardSmall"><span>'+name+'</span><span aria-hidden="true" class="glyphicon glyphicon-remove smallCard" id="removeSavedCard'+giveCardCounter+'"></span><img src="'+srcCard+'" style="width:100px;height:80px; margin:5px;"></div>'
				// $("#SavedCard").prepend(SavedCard)
				// $(".smallCard").click( () => {
				// 	console.log("clicked glyphy")
				// 	let target = "#"+event.target.id
				// 	console.log(target)
				// 	id = $(target).closest("div").prop("id")
				// 	let CardID = "#"+id
				// 	$(CardID).remove()				
				// })			
				// })
			})//Closes click on yes
	}//Closes function Single point

	//Run relevant function on click button or car
	$('#TheCard').click( () => {
		if(CardType=="Single"){
		$('#nopoint').empty()
		$('#nopoint').append("Meow.. Meowwww...Give the points..Meoww..")	
		}
		else {
			AppendRandomCard( )
		}
	})

	$("#NextCard").click( () => {
		if(CardType=="Single"){
		$('#nopoint').append("Meow.. Meowwww...Give the points..Meoww..")		
		}
		else {
			AppendRandomCard( )
		}
	})


	//This function adds a player
	let PlayerCounter = 0
	function addPlaya () {
		if ( $('#AddPlayerName').val().length > 1 ){
			PlayerCounter = PlayerCounter+1
			console.log(PlayerCounter)
			let name = $('#AddPlayerName').val()
			$('#players').append('<div class="playerStyle" id="Playa'+PlayerCounter+'"><span id="remove'+PlayerCounter+'" class="glyphicon glyphicon-remove" aria-hidden="true"></span><span class="namelist">'+name+'</span><div id="score'+PlayerCounter+'" style="display: inline-block; float : right"><span>0</span></div></div>')
			$('#AddPlayerName').val(" ")
			$(".glyphicon-remove").click( () => {
				let target = "#"+event.target.id
				id = $(target).closest("div").prop("id")
				let PlayaID = "#"+id
				$(PlayaID).remove()				
			})
			console.log( "joehoe"+$('#score1 span').val() )
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