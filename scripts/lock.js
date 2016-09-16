$(document).ready(function() {
	/*var login = "pokemonLove13";
	var pass = "pokemonFans13School";
	var loginValue = $("#login").attr("val");
	var passValue = $("#pass").attr("val");*/
	$("form").submit(function(event){
		
		if( $("#login").val() === "pokemonLove13" && $("#pass").val() === "pokemonFans13School") {
			window.location.replace("https://seanomik.github.io/game");
			event.preventDefault();
			return;
		}
		$( "span" ).text( "Not valid!" ).show().fadeOut( 3000 );
		event.preventDefault();
		setTimeout(function(){
			window.location.replace("http://google.com");
		}, 3500);
	});
});