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

	$('#TheCard').click( () => {
		AppendRandomCard( )
	})
	$("#NextCard").click( () => {
		AppendRandomCard( )
	})

		// Get the modal
	var modal = document.getElementById('SaveCardModal');
	// Get the <span> element that closes the modal
	var span = document.getElementsByClassName("close")[0];
	// When the user clicks the button, open the modal 
	$("#SaveCard").click( ()=> {
	    modal.style.display = "block";
	})
		span.onclick = function() {
		    	modal.style.display = "none";
		}
		// When the user clicks anywhere outside of the modal, close it
		window.onclick = function(event) {
		    if (event.target == modal) {
		        modal.style.display = "none";
		    }
		}	
	$("#NameBtn").click( () => {
		if ( $('#NameCardOwner').val() ){
			console.log("clicked savecard button")
			let name = $('#NameCardOwner').val()
			let srcCard = document.getElementById('TheCard').getElementsByTagName('img')[0].src
			let SavedCard = '<img style="width:100px;height:80px; margin:5px;" src="'+srcCard+'"/>'+name+''
			console.log("joehoe : "+srcCard)
			$("#SavedCard").prepend(SavedCard)			
			modal.style.display = "none";
		}
	})

})