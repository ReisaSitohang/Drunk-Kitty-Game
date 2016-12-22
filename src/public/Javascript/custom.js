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
			if(CardType=="Team"){
				TeamPoint ()
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
				let ArrayName = document.getElementById('players').getElementsByClassName('namelist')
				$('#CardInfo').append("<div><p>Meoow...Who are you? I'm too drunk to remember..</p></div>")
				let ArrayNames = []
				for (var i = 0; i < ArrayName.length; i++) {
					let name = ArrayName[i].innerText
					ArrayNames.push(name) 
					let names= '<button class="givePlayerPoint"><span number="'+(i+1)+'" class="namelist">'+name+'</span>'
					let pointYes = names
					$('#CardInfo').append(pointYes)
				}
			// Get the player that gets a points
			$(".givePlayerPoint").click( () => {
				let target = event.target.innerText
				let num = event.target.getAttribute('number')
				let theId = "#score"+num
				//Get the old points
				let OldScore = Number($(theId).text())
				//Add a point
				let NewScore = OldScore+1
				$('#score'+num).empty()
				$('#score'+num).append("<span>"+NewScore+"</span>")
				AppendRandomCard( )
			})
			})//Closes click on yes
	}//Closes function Single point

	//This function is for team games
	function TeamPoint (){
		let ArrayName = document.getElementById('players').getElementsByClassName('namelist')
		let ArrayNames = []
		for (var i = 0; i < ArrayName.length; i++) {
			let name = ArrayName[i].innerText
			ArrayNames.push("<span data-number='"+(i+1)+"'>"+name+"</span>")
		}		
		//Function that randomizes/shuffles the array
		function shuffle(array) {
			var currentIndex = array.length, temporaryValue, randomIndex;

		  // While there remain elements to shuffle...
		  while (0 !== currentIndex) {

		    // Pick a remaining element...
		    randomIndex = Math.floor(Math.random() * currentIndex);
		    currentIndex -= 1;

		    // And swap it with the current element.
		    temporaryValue = array[currentIndex];
		    array[currentIndex] = array[randomIndex];
		    array[randomIndex] = temporaryValue;
		}

		return array;
	}
		// Get random teams, divide by 2 but doesn't have to be even numbers
		arr = shuffle(ArrayNames);
		let arraylength = arr.length
		let teams = arraylength/2
		let largeteam = Math.ceil(teams)
		let smallteam = Math.floor(teams)

		var team1 = arr
		var team2 = team1.splice(largeteam, smallteam);
		$('#CardInfo').append("<br><br><div><p>Meoow....Your teams : </p></div><div id='Team1'><p>Team 1:</p></div><div id='Team2'><p>Team 2:</p></div>")
		for (var i = 0; i < team1.length; i++) {
			let name = team1[i]
			let teams= '<button class="btn btn-sm btn-danger">'+name+''
			$('#Team1').append(teams)
		}

		for (var i = 0; i < team2.length; i++) {
			let name = team2[i]
			let teams= '<button class="btn btn-sm btn-info">'+name+''
			$('#Team2').append(teams)
		}
		$('#CardInfo').append("<p>Click on the winning team to hand out the points!</p>")

		function getAllElementsWithAttribute(attribute){
			var matchingElements = [];
			var allElements = document.getElementsByTagName('*');
			for (var i = 0, n = allElements.length; i < n; i++){
				if (allElements[i].getAttribute(attribute) !== null)
				{
      	// Element exists with attribute. Add to array.
		      matchingElements.push(allElements[i]);
			  }
			}
		return matchingElements;
		}

		//Click on winning team to hand out points
		$('#Team1').click(()=>{
			let ArrayWinners = document.getElementById('Team1').getElementsByTagName('span')
			let winners = []
			for (var i = 0; i < ArrayWinners.length; i++) {
				let num = ArrayWinners[i].getAttribute('data-number')
				winners.push(num)
			}
			for (var i = 0; i < winners.length; i++) {
				let theId = "#score"+winners[i]
				//Get the old points
				let OldScore = Number($(theId).text())
				//Add a point
				let NewScore = OldScore+1
				$(theId).empty()
				$(theId).append("<span>"+NewScore+"</span>")
					AppendRandomCard( )
			}
		})
		$('#Team2').click(()=>{
			let ArrayWinners = document.getElementById('Team2').getElementsByTagName('span')
			let winners = []
			for (var i = 0; i < ArrayWinners.length; i++) {
				let num = ArrayWinners[i].getAttribute('data-number')
				winners.push(num)
			}
			for (var i = 0; i < winners.length; i++) {
				let theId = "#score"+winners[i]
				//Get the old points
				let OldScore = Number($(theId).text())
				//Add a point
				let NewScore = OldScore+1
				$(theId).empty()
				$(theId).append("<span>"+NewScore+"</span>")
					AppendRandomCard( )
			}
		})
	}


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
			let name = $('#AddPlayerName').val()
			$('#players').append('<div class="playerStyle" id="Playa'+PlayerCounter+'"><span id="remove'+PlayerCounter+'" class="glyphicon glyphicon-remove" aria-hidden="true"></span><span class="namelist">'+name+'</span><div id="score'+PlayerCounter+'" style="display: inline-block; float : right"><span>0</span></div></div>')
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
			let name = target
			let srcCard = document.getElementById('TheCard').getElementsByTagName('img')[0].src
			let SavedCard = '<div id="savedCard'+giveCardCounter+'" class="savedCardSmall"><span class="naam">'+name+'</span><span aria-hidden="true" class="glyphicon glyphicon-remove smallCard" id="removeSavedCard'+giveCardCounter+'"></span><img src="'+srcCard+'" style="width:100px;height:80px; margin:5px;"></div>'
			$("#SavedCard").prepend(SavedCard)
			$(".smallCard").click( () => {
				let target = "#"+event.target.id
				id = $(target).closest("div").prop("id")
				let CardID = "#"+id
				$(CardID).remove()				
			})			
		})
	})	
	$( "#emailbtn" ).click( () => {
		$( "#close" ).trigger( "click" );
	});

	//Timer stuff
	$('#timer').click(()=>{
		$('#timer').after('<div id="puttime"><input id="mins" placeholder="minutes"/> <button id="timerbtn" class="btn btn-info">go</button></div>')
		$('#timerbtn').click(()=>{
		function startTimer(duration, display) {
		    var timer = duration, minutes, seconds;
		    setInterval(function () {
		        minutes = parseInt(timer / 60, 10);
		        seconds = parseInt(timer % 60, 10);

		        minutes = minutes < 10 ? "0" + minutes : minutes;
		        seconds = seconds < 10 ? "0" + seconds : seconds;

		        display.text(minutes + ":" + seconds);

		        if (--timer < 0) {
		            timer = duration;
		        }
		    }, 1000);
		}
		let min = $('#mins').val()
		jQuery(function ($) {
		    var Minutes = 60 * min,
		        display = $('#time');
		    startTimer(Minutes, display);
		})
		$('#timetext').empty()
		$('#timetext').append("<span>Game ends in </span><span id='time'></span>")
		$('#timetext').hide()
		setTimeout(function(){ $('#timetext').fadeIn(1000) }, 700);
		$('#puttime').empty()
	})		

	})								
})