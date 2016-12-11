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
			$('#players').append('<div class="playerStyle" id="Playa'+PlayerCounter+'"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span><span> '+name+'</span><span id="ScorePlayer'+PlayerCounter+'"></span></div>')
			$('#AddPlayerName').val(" ")
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


	// 	// Get the modal
	// var modal = document.getElementById('SaveCardModal');
	// // Get the <span> element that closes the modal
	// var span = document.getElementsByClassName("close")[0];
	// // When the user clicks the button, open the modal 
	// $("#SaveCard").click( ()=> {
	//     modal.style.display = "block";
	// })
	// 	span.onclick = function() {
	// 	    	modal.style.display = "none";
	// 	}
	// 	// When the user clicks anywhere outside of the modal, close it
	// 	window.onclick = function(event) {
	// 	    if (event.target == modal) {
	// 	        modal.style.display = "none";
	// 	    }
	// 	}	
	// $("#NameBtn").click( () => {
	// 	if ( $('#NameCardOwner').val() ){
	// 		console.log("clicked savecard button")
	// 		let name = $('#NameCardOwner').val()
	// 		let srcCard = document.getElementById('TheCard').getElementsByTagName('img')[0].src
	// 		let SavedCard = '<img style="width:100px;height:80px; margin:5px;" src="'+srcCard+'"/>'+name+''
	// 		console.log("joehoe : "+srcCard)
	// 		$("#SavedCard").prepend(SavedCard)			
	// 		modal.style.display = "none";
	// 	}
	// })

})