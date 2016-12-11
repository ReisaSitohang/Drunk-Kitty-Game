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
		if ( $('#AddPlayerName').val() ){
			PlayerCounter = PlayerCounter+1
			console.log(PlayerCounter)
			let name = $('#AddPlayerName').val()
			$('#players').append('<div class="playerStyle" id="Playa'+PlayerCounter+'"><span id="remove'+PlayerCounter+'" class="glyphicon glyphicon-remove" aria-hidden="true"></span><span class="namelist"> '+name+'</span><span class="score" style="float : right" id="ScorePlayer'+PlayerCounter+'"> 0</span></div>')
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


	$("#NameBtn").click( () => {
		if ( $('#NameCardOwner').val() ){
			console.log("clicked savecard button")
			let name = $('#NameCardOwner').val()
			let srcCard = document.getElementById('TheCard').getElementsByTagName('img')[0].src
			let SavedCard = '<img style="width:100px;height:80px; margin:5px;" src="'+srcCard+'"/>'+name+''
			console.log("joehoe : "+srcCard)
			$("#SavedCard").prepend(SavedCard)			
		}
	})

})