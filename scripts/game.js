$(document).ready(function() {
  var player = "<img id=player src=images/player_gifs/run/front/run_TPOS.gif>";
  //var player = "<img id=player src=images/player_front1.png>";
	var tallGrass = "<img id=tallGrass src=images/environment/tallGrass.png>";
  var inventory = "<div id='inventory'></div>";
  var pokemonCenter0 = "<img id=pokemonCenter0 src=images/buildings/pokemon_center.png>";
  var pokemonCenter0Inside = "<img id=pokemonCenterInside0 src=images/buildings/inside/pokemon_center_inside.png>";
  var pokemonCenterLeave ="<div id=pokemonCenterLeave></div>"
  //var pokemonCenterBackgroundInside = "<div id=pokemonCenterInsideBackground></div>";
  
  playBackgroundMusic("#jquery_jplayer_1", "audio/background/Violet_City.mp3", 0.25);
	
  
	var inPokeCenterHealDiv = false;
	var pokeCenterAudioSetup = false;
	var battleAudioSetup = false;
	var battleTransitionAudioSetup = false;
	var battleMusicSrc = ["audio/battle/battle1.mp3", "audio/battle/battle2.mp3"];
	
  var invOpen = "false";
	var gifSetAgain = false;
  var havePokemon = "true";
	var enemyPokemonDead = "false";
	var attacking = "false";
  var howManyTimesMoved = 0;
	var howManyTimesNeededToMoveForWildPokemon = Math.ceil(Math.random() * 30) + 15;
	var inTallGrass = false;
	var isPlayerMoving = "true";
	var enemyPokeName;
	var playerPokeHealth = 1;
	var enemyPokeHealth = 1;
	var playerSpeed = "10px";
	var inPokeCenter = false;
	var isPokeCenterDeskColsEnabled = false;
	var currentplayerPokemon;
  //var pokemonHealthAry = ["#pokemon0Health, ", "#pokemon1Health, ", "#pokemon2Health, ", "#pokemon3Health, ", "#pokemon4Health, ", "#pokemon5Health"];
  //Arrays
  var pokemonAry = ["Pikachu", "Bulbasaur"];
  var allPokemonInfoAry = ["images/pokemon/pikachu.png", "images/pokemon/bulbasaur.png", "images/pokemon/charmander.png"];
  var medicineInventory = ["Potion"];
  var medicineItemsInfo = ["images/inventory/drugs/potion.png"];
	var bulbasaurAttacks = ["VineWhip", "Growl"];
  var pokemonMedicineHealthAry = [0, 0, 0, 0, 0, 0];
	var currentPokemonArrayElem;
  //var pokemonHealthMedicineAry = ["#pokemon0HealthMedicine, ", "#pokemon1HealthMedicine, ", "#pokemon2HealthMedicine, ", "#pokemon3HealthMedicine, ", "#pokemon4HealthMedicine, ", "#pokemon5HealthMedicine"];
  //Setup
  var allPokemonInGame = ["Pikachu", "Bulbasaur", "Charmander"];
	$("#pokemonBattle").hide();
	$("#pokemonCenterInside0").hide();
	$("#chooseNewBattlePokemon").hide();
  $("#pokemonList").hide();
  $("#inventory").hide();
  $("#medicineMenu").hide();
  $('#map').prepend(player);
  $("#map").prepend(pokemonCenter0Inside);
  //$("#map").prepend(pokemonCenterLeave);
  //$("#map").prepend(pokemonCenterBackgroundInside);
	$("#map").prepend(tallGrass);
	$("#map").prepend(pokemonCenter0);
  $("#pokemonListMedicine").hide();
	$("#playersPokemonAttackList").hide();
	
	
	$("#pokemonCenterInsideBackground").hide();
	$("#pokemonCenterInside0").hide();
	$("#pokemonCenterLeave").hide();
	$("#pokemonCenterDeskCol0").hide();
	$("#pokemonCenterDeskCol1").hide();
	$("#pokemonCenterDeskCol2").hide();
	$("#pokemonHealDiv").hide();
	$("#nurseJoy").hide();
	
	$("#healingPokeMsgDiv").hide();
	
	
	//Move Arrays
	var bulbasaurAttacks = ["VineWhip", "Growl"];
	var pikachuAttacks = ["ThunderBolt", "Growl"];
	var charmanderAttacks = ["FlameThrower", "Growl"];
	//Functions to run
	
	//Pokemon Misc Vars
  var healthAddedFromPotions = 0.1;
	//Choose pokemon health bars
	$("#chooseNewBattlePokemonHealth0").hide();
	$("#chooseNewBattlePokemonHealth1").hide();
	$("#chooseNewBattlePokemonHealth2").hide();
	$("#chooseNewBattlePokemonHealth3").hide();
	$("#chooseNewBattlePokemonHealth4").hide();
	$("#chooseNewBattlePokemonHealth5").hide();
  //Pokemon health bars
  //$(pokemonHealthAry).hide();
  $("#pokemon0Health").hide();
  $("#pokemon1Health").hide();
  $("#pokemon2Health").hide();
  $("#pokemon3Health").hide();
  $("#pokemon4Health").hide();
  $("#pokemon5Health").hide();
  //Pokemon health bars medicine
  $("#pokemon0HealthMedicine").hide();
  $("#pokemon1HealthMedicine").hide();
  $("#pokemon2HealthMedicine").hide();
  $("#pokemon3HealthMedicine").hide();
  $("#pokemon4HealthMedicine").hide();
  $("#pokemon5HealthMedicine").hide();
	//Pokemon battle health
	$("#pokemonBattleHealth").hide();
	$(document).keyup(function(key) {
		switch (parseInt(key.which, 10)) {
			case 37: // Left arrow up
			
				if (invOpen == "true") {
        		break;
        }
				
				$("#player").attr("src", "images/player_gifs/run/left/player_left2.png");
				gifSetAgain = false;
				$("#player").stop(true).animate({"left" : "-=0px"});
				break;
			case 38: // Up arrow up
			
				if (invOpen == "true") {
        		break;
        }
				
				$("#player").attr("src", "images/player_gifs/run/back/player_back2.png");
				gifSetAgain = false;
				$("#player").stop(true).animate({"top" : "-=0px"});
				break;
			case 39: // Right arrow up
			
				if (invOpen == "true") {
        		break;
        }
				
				$("#player").attr("src", "images/player_gifs/run/right/player_right2.png");
				gifSetAgain = false;
				$("#player").stop(true).animate({"left" : "+=0px"});
				break;
			case 40: // Down arrow up
			
				if (invOpen == "true") {
        		break;
        }
				
				$("#player").attr("src", "images/player_gifs/run/front/player_frontTPOS.png");
				gifSetAgain = false;
				$("#player").stop(true).animate({"top" : "+=0px"});
				break;
			case 32:
				if (inPokeCenterHealDiv == true) {
					invOpen = "true";
			$("#healingPokeMsgDiv").show();
			$("#healingPokeMsgDiaText").text("Let me take your Pokémon to heal them...");
			$("#pokemonHealDiv").hide();
			setTimeout(function() {
				$("#nurseJoy").attr("src", "images/nurse_Joy/img/left/nurseJoy_left1.png").css("width", "43.2px").css("height", "74.4px");
			}, 1000);
			
			$("#jquery_jplayer_1").jPlayer("stop");
			$("#jquery_jplayer_2").jPlayer("stop");
				
				
			$("#jquery_jplayer_3").jPlayer({
				ready: function() {
					$(this).jPlayer("setMedia", {
						mp3: "audio/buildings/pokecenter/PokeCenter_Healing_sound.mp3"
					}).jPlayer("play");
					
					$("#jquery_jplayer_3").jPlayer("volume", 0.25);
					
					var click = document.ontouchstart === undefined ? 'click' : 'touchstart';
					var kickoff = function () {
					$("#jquery_jplayer_3").jPlayer("play");
						document.documentElement.removeEventListener(click, kickoff, true);
					};
						document.documentElement.addEventListener(click, kickoff, true);
					},
						swfPath: "/js",
						loop: false
			});
			$("#jquery_jplayer_3").jPlayer("play");
			
			setTimeout(function() {
				$("#healingPokeMsgDiv").hide();
			}, 2000);
			setTimeout(function() {
				$("#healingPokeMsgDiv").show();
				$("#nurseJoy").attr("src", "images/nurse_Joy/img/front/nurseJoy_front1.png").css("width", "52.8px").css("height", "69.6px");
				$("#healingPokeMsgDiaText").text("Thank you, here are your Pokémon.");
				$("#pokemonHealDiv").hide();
				
				$("#jquery_jplayer_1").jPlayer("stop");
				$("#jquery_jplayer_2").jPlayer("play");
				$("#jquery_jplayer_3").jPlayer("stop");
				setTimeout(function() {
					
				}, 1000);
				setTimeout(function() {
					
					
					$("#chooseNewBattlePokemonHealth" + currentPokemonArrayElem).attr('value', pokemonMedicineHealthAry[currentPokemonArrayElem]);
					$("#pokemon" + currentPokemonArrayElem + "Health").attr('value', pokemonMedicineHealthAry[currentPokemonArrayElem]);
					$("#pokemon0HealthMedicine").attr('value', 1);
					
					
					if (allPokemonInfoAry.length === 1) {
						$("#pokemon0Health").attr("value", 1);
						
						$("#chooseNewBattlePokemonHealth0").attr('value', 1);
						
						$("#pokemon0HealthMedicine").attr('value', 1);
						
						pokemonMedicineHealthAry[0] = 1;
					} else if (allPokemonInfoAry.length <= 2) {
						$("#pokemon0Health").attr("value", 1);
						$("#pokemon1Health").attr("value", 1);
						
						$("#chooseNewBattlePokemonHealth0").attr('value', 1);
						$("#chooseNewBattlePokemonHealth1").attr('value', 1);
						
						$("#pokemon0HealthMedicine").attr('value', 1);
						$("#pokemon1HealthMedicine").attr('value', 1);
						
						pokemonMedicineHealthAry[0] = 1;
						pokemonMedicineHealthAry[1] = 1;
					} else if (allPokemonInfoAry.length <= 3) {
						$("#pokemon0Health").attr("value", 1);
						$("#pokemon1Health").attr("value", 1);
						$("#pokemon2Health").attr("value", 1);
						
						$("#chooseNewBattlePokemonHealth0").attr('value', 1);
						$("#chooseNewBattlePokemonHealth1").attr('value', 1);
						$("#chooseNewBattlePokemonHealth2").attr('value', 1);
						
						$("#pokemon0HealthMedicine").attr('value', 1);
						$("#pokemon1HealthMedicine").attr('value', 1);
						$("#pokemon2HealthMedicine").attr('value', 1);
						
						pokemonMedicineHealthAry[0] = 1;
						pokemonMedicineHealthAry[1] = 1;
						pokemonMedicineHealthAry[2] = 1;
					} else if (allPokemonInfoAry.length <= 4) {
						$("#pokemon0Health").attr("value", 1);
						$("#pokemon1Health").attr("value", 1);
						$("#pokemon2Health").attr("value", 1);
						$("#pokemon3Health").attr("value", 1);
						
						$("#chooseNewBattlePokemonHealth0").attr('value', 1);
						$("#chooseNewBattlePokemonHealth1").attr('value', 1);
						$("#chooseNewBattlePokemonHealth2").attr('value', 1);
						$("#chooseNewBattlePokemonHealth3").attr('value', 1);
						
						$("#pokemon0HealthMedicine").attr('value', 1);
						$("#pokemon1HealthMedicine").attr('value', 1);
						$("#pokemon2HealthMedicine").attr('value', 1);
						$("#pokemon3HealthMedicine").attr('value', 1);
						
						pokemonMedicineHealthAry[0] = 1;
						pokemonMedicineHealthAry[1] = 1;
						pokemonMedicineHealthAry[2] = 1;
						pokemonMedicineHealthAry[3] = 1;
					} else if (allPokemonInfoAry.length <= 5) {
						$("#pokemon0Health").attr("value", 1);
						$("#pokemon1Health").attr("value", 1);
						$("#pokemon2Health").attr("value", 1);
						$("#pokemon3Health").attr("value", 1);
						$("#pokemon4Health").attr("value", 1);
						
						$("#chooseNewBattlePokemonHealth0").attr('value', 1);
						$("#chooseNewBattlePokemonHealth1").attr('value', 1);
						$("#chooseNewBattlePokemonHealth2").attr('value', 1);
						$("#chooseNewBattlePokemonHealth3").attr('value', 1);
						$("#chooseNewBattlePokemonHealth4").attr('value', 1);
						
						$("#pokemon0HealthMedicine").attr('value', 1);
						$("#pokemon1HealthMedicine").attr('value', 1);
						$("#pokemon2HealthMedicine").attr('value', 1);
						$("#pokemon3HealthMedicine").attr('value', 1);
						$("#pokemon4HealthMedicine").attr('value', 1);
						
						pokemonMedicineHealthAry[0] = 1;
						pokemonMedicineHealthAry[1] = 1;
						pokemonMedicineHealthAry[2] = 1;
						pokemonMedicineHealthAry[3] = 1;
						pokemonMedicineHealthAry[4] = 1;
					} else if (allPokemonInfoAry.length <= 6) {
						$("#pokemon0Health").attr("value", 1);
						$("#pokemon1Health").attr("value", 1);
						$("#pokemon2Health").attr("value", 1);
						$("#pokemon3Health").attr("value", 1);
						$("#pokemon4Health").attr("value", 1);
						$("#pokemon5Health").attr("value", 1);
						
						$("#chooseNewBattlePokemonHealth0").attr('value', 1);
						$("#chooseNewBattlePokemonHealth1").attr('value', 1);
						$("#chooseNewBattlePokemonHealth2").attr('value', 1);
						$("#chooseNewBattlePokemonHealth3").attr('value', 1);
						$("#chooseNewBattlePokemonHealth4").attr('value', 1);
						$("#chooseNewBattlePokemonHealth5").attr('value', 1);
						
						$("#pokemon0HealthMedicine").attr('value', 1);
						$("#pokemon1HealthMedicine").attr('value', 1);
						$("#pokemon2HealthMedicine").attr('value', 1);
						$("#pokemon3HealthMedicine").attr('value', 1);
						$("#pokemon4HealthMedicine").attr('value', 1);
						$("#pokemon5HealthMedicine").attr('value', 1);
						
						pokemonMedicineHealthAry[0] = 1;
						pokemonMedicineHealthAry[1] = 1;
						pokemonMedicineHealthAry[2] = 1;
						pokemonMedicineHealthAry[3] = 1;
						pokemonMedicineHealthAry[4] = 1;
						pokemonMedicineHealthAry[5] = 1;
					}
					
					
					$("#healingPokeMsgDiv").hide();
					$("#healingPokeMsgDiaText").text("ERROR: DID NOT SET VARAIBLE. RESTART");
					$("#pokemonHealDiv").hide();
					invOpen = "false";
				}, 2000);
			}, 3400);
					inPokeCenterHealDiv = false;
				}
				break;
		}
	});
	$(document).keydown(function(key) {
		var forPokeCenter = "10";
		
		if (collision($("#player"), $("#pokemonCenterLeave")) == true && inPokeCenter == true) {
      $("#pokemonCenterInside0").hide();
      $("#pokemonCenter0").show();
			$("#tallGrass").show();
      //$("#player").hide();
      $("#pokemonCenter0Door").show();
      $("#pokemonCenterInsideBackground").hide();
      $("#player").width(27);
      $("#player").height(40.5);
      $("#pokemonCenterLeave").hide();
      playerSpeed = "10px";
			//invOpen = "true";
			inPokeCenter = false;
			$("#pokemonCenterDeskCol0").show();
			$("#pokemonCenterDeskCol1").show();
			$("#pokemonCenterDeskCol2").show();
			isPokeCenterDeskColsEnabled = false;
			$("#pokemonHealDiv").hide();
			
			pokeCenterAudioSetup = true;
			$("#jquery_jplayer_2").jPlayer("stop");
			$("#jquery_jplayer_1").jPlayer("play");
			$("#grassBackground").show();
			$("#nurseJoy").hide();
		}
        
    if (collision($("#player"), $("#pokemonCenter0Door")) == true) {
			$("#pokemonCenterInside0").show();
			$("#pokemonCenter0").hide();
      $("#tallGrass").hide();
      //$("#player").hide();
      $("#pokemonCenter0Door").hide();
      $("#pokemonCenterInsideBackground").show();
      $("#player").width(60);
      $("#player").height(88.5);
      $("#pokemonCenterLeave").show();
      playerSpeed = "15px";
			//invOpen = "true";
			inPokeCenter = true;
			isPokeCenterDeskColsEnabled = true;
			$("#pokemonHealDiv").show();
			$("#pokemonCenterDeskCol0").show();
			$("#pokemonCenterDeskCol1").show();
			$("#pokemonCenterDeskCol2").show();
			$("#grassBackground").hide();
			$("#nurseJoy").show();
			
			
			if (pokeCenterAudioSetup == false) {
				$("#jquery_jplayer_1").jPlayer("stop");
						
				$("#jquery_jplayer_2").jPlayer({
					ready: function() {
						$(this).jPlayer("setMedia", {
							mp3: "audio/buildings/pokecenter/Pokemon_Center.mp3"
						}).jPlayer("play");
						
						$("#jquery_jplayer_2").jPlayer("volume", 0.25);
						
						var click = document.ontouchstart === undefined ? 'click' : 'touchstart';
						var kickoff = function () {
							$("#jquery_jplayer_2").jPlayer("play");
							document.documentElement.removeEventListener(click, kickoff, true);
						};
							document.documentElement.addEventListener(click, kickoff, true);
						},
							swfPath: "/js",
							loop: true
				});
						
				pokeCenterAudioSetup = true;
						
				} else {
					$("#jquery_jplayer_1").jPlayer("stop");
					$("#jquery_jplayer_2").jPlayer("play");
				}
		}
        
		if (inTallGrass === true) {
			startBattle("false");
			howManyTimesMoved = 0;
			howManyTimesNeededToMoveForWildPokemon = Math.ceil(Math.random() * 30) + 15; 
			inTallGrass = false;
			invOpen = "true";
			
			
		}
		
		if (collision($("#player"), $("#tallGrass")) == true) {
			inGrass();
		}
		
		var isPaused1 = false;
		var isPaused2 = true;
		
		
		//$("#map").append(collision($("#player"), $("#tallGrass")) + " ");
		switch (parseInt(key.which, 10)) {
			case 37: // Left arrow key pressed
      	if(invOpen == "true") {
        		break;
        }
				

				if (gifSetAgain === false) {
					$("#player").attr("src", "images/player_gifs/run/left/run_LEFT.gif");
				}
				
        
				
				if (collision($("#player"), $("#pokemonCenterDeskCol2")) == true && isPokeCenterDeskColsEnabled == true) {
					$("#player").stop(true).animate({"left" : "-=1px"});
				} else {
					$('#player').animate({left: "-=" + playerSpeed}, 50);
				}
				howManyTimesMoved += 1;
      	
				gifSetAgain = true;
      	break;
      case 38: // Up Arrow Pressed
    		if(invOpen == "true") {
        		break;
        }
				inPokeCenterHealDiv = true;  
				if (collision($("#pokemonHealDiv"), $("#player")) == true && inPokeCenter == true) {
					inPokeCenterHealDiv = true; 
				}
				if (gifSetAgain === false) {
					$("#player").attr("src", "images/player_gifs/run/back/run_BACK.gif");
				}
				
				if (collision($("#player"), $("#pokemonCenterDeskCol0")) == true && isPokeCenterDeskColsEnabled == true) {
					$("#player").stop(true).animate({"top" : "+=1px"});
				} else {
					$('#player').animate({top: "-=" + playerSpeed}, 50);
				}
				
				howManyTimesMoved += 1;
				gifSetAgain = true;
        break;
      case 39:  // Right Arrow Pressed
    		if(invOpen == "true") {
        		break;
        }
        
				if (gifSetAgain === false) {
					$("#player").attr("src", "images/player_gifs/run/right/run_RIGHT.gif");
				}
				
				if (collision($("#player"), $("#pokemonCenterDeskCol1")) == true && isPokeCenterDeskColsEnabled == true) {
					$("#player").stop(true).animate({"left" : "-=1px"});
				} else {
					$('#player').animate({left: "+=" + playerSpeed}, 50);
				}
				
				howManyTimesMoved += 1;
				gifSetAgain = true;
        break;
      case 40: // Down Arrow Pressed
     		if (invOpen == "true") {
        		break;
        }
				
				if (gifSetAgain === false) {
					$("#player").attr("src", "images/player_gifs/run/front/run_TPOS.gif");
				}

				if (inTallGrass === "true") {
					startBattle("false");
					howManyTimesMoved = 0;
					howManyTimesNeededToMoveForWildPokemon = Math.ceil(Math.random() * 30) + 15;
					inTallGrass = "false";
				}
				howManyTimesMoved += 1;
        $('#player').animate({top: "+=" + playerSpeed}, 50);
        gifSetAgain = true;
        break;
      case 73: //Inv Open
	   	if (invOpen === "true") {
				break;
			}
      $("#inventory").show();
      $("#pokeList").hide();
      invOpen = "true";
      break;
      case 27:
      	if(invOpen == "true") {
        	$("#inventory").hide();
    			$("#pokemonList").hide();
       	  $("#medicineMenu").hide();
          //invOpen = "false";
        }
        break;
      case 82:
				startBattle("false");
        break;
			case 81:
				enemyAttack();
				break;
			case 66:
				$("#jquery_jplayer_2").jPlayer("stop");
				break;
			case 70:
				$("#jquery_jplayer_1").jPlayer("stop");
				$("#jquery_jplayer_2").jPlayer("stop");
				$("#jquery_jplayer_4").jPlayer("stop");
				break;
      }
    });
	$('#invbutton').click(function(){
  	$("#pokemonList").show();
    $("#inventory").hide();
  });
  $('#pokemonListBackBtn').click(function(){
  	$("#pokemonList").hide();
    $("#inventory").show();
  });
  $('#medicineBtn').click(function(){
  	$("#medicineMenu").show();
    $("#inventory").hide();
  });
  $("#exitInventory").click(function(){
  	$("#inventory").hide();
    $("#pokemonList").hide();
    $("#medicineMenu").hide();
    invOpen = "false";
  });
  $("#medicineBackBtn").click(function(){
  	$("#medicineMenu").hide();
    $("#inventory").show();
  });
  //Create children for each pokemon in pokeList
  $.each(pokemonAry, function(i, pokeName) {
    $("#pokemon" + i).attr("src", allPokemonInfoAry[i]);
		$("#chooseNewBattlePokemonIMG" + i).attr("src", allPokemonInfoAry[i]);
		$("#pokemon" + i + "Medicine").attr("src", allPokemonInfoAry[i]);
		//pokemonMedicineHealthAry[i] = 1;
	//Health
		if (i === 0) {
			pokemonMedicineHealthAry[0] = 0.5;
			$("#pokemon0Health").attr('value', pokemonMedicineHealthAry[0]);
			$("#pokemon0Health").show();
			$("#pokemon0HealthMedicine").attr('value', pokemonMedicineHealthAry[0]);
			$("#chooseNewBattlePokemonHealth0").attr('value', pokemonMedicineHealthAry[0]);
			$("#chooseNewBattlePokemonHealth0").show();
			$("#pokemon0HealthMedicine").show();
		} else if (i === 1) {
			pokemonMedicineHealthAry[1] = 1;
			$("#pokemon1Health").attr('value', pokemonMedicineHealthAry[1]);
			$("#pokemon1Health").show();
			$("#pokemon1HealthMedicine").attr('value', pokemonMedicineHealthAry[1]);
			$("#chooseNewBattlePokemonHealth1").attr('value', pokemonMedicineHealthAry[1]);
			$("#chooseNewBattlePokemonHealth1").show();
			$("#pokemon1HealthMedicine").show();
		} else if (i === 2) {
			pokemonMedicineHealthAry[2] = 1;
			$("#pokemon2Health").attr('value', pokemonMedicineHealthAry[2]);
			$("#pokemon2Health").show();
			$("#pokemon2HealthMedicine").attr('value', pokemonMedicineHealthAry[2]);
			$("#chooseNewBattlePokemonHealth2").attr('value', pokemonMedicineHealthAry[2]);
			$("#chooseNewBattlePokemonHealth2").show();
			$("#pokemon2HealthMedicine").show();
		} else if (i === 3) {
			pokemonMedicineHealthAry[3] = 1;
			$("#pokemon3Health").attr('value', pokemonMedicineHealthAry[3]);
			$("#pokemon3Health").show();
			$("#pokemon3HealthMedicine").attr('value', pokemonMedicineHealthAry[3]);
			$("#chooseNewBattlePokemonHealth3").attr('value', pokemonMedicineHealthAry[3]);
			$("#chooseNewBattlePokemonHealth3").show();
			$("#pokemon3HealthMedicine").show();
		} else if (i === 4){
			pokemonMedicineHealthAry[4] = 1;
			$("#pokemon4Health").attr('value', pokemonMedicineHealthAry[4]);
			$("#pokemon4Health").show();
			$("#pokemon4HealthMedicine").attr('value', pokemonMedicineHealthAry[4]);
			$("#chooseNewBattlePokemonHealth4").attr('value', pokemonMedicineHealthAry[4]);
			$("#chooseNewBattlePokemonHealth4").show();
			$("#pokemon4HealthMedicine").show();
		} else if (i === 5) {
		pokemonMedicineHealthAry[5] = 1;
			$("#pokemon5Health").attr('value', pokemonMedicineHealthAry[5]);
			$("#pokemon5Health").show();
			$("#pokemon5HealthMedicine").attr('value', pokemonMedicineHealthAry[5]);
			$("#chooseNewBattlePokemonHealth5").attr('value', pokemonMedicineHealthAry[5]);
			$("#chooseNewBattlePokemonHealth5").show();
			$("#pokemon5HealthMedicine").show();
		}
  });
  if (havePokemon === "false") {
    	$("#pokemonList").append("You have no pokemon!");
}

	$.each(medicineInventory, function (i, itemName){
		$("#medicineMenu").append("<div id=drug" + i + "></div>");
		$("#drug" + i).append("<img src=" + medicineItemsInfo[i] + ">")
		$("#drug" + i).click(function(){
			$("#pokemonListMedicine").show();
			$("#medicineMenu").hide();
		});
		$("#pokemonListMedicineBackBtn").click(function(){
			$("#pokemonListMedicine").hide();
			$("#medicineMenu").show();
		});
		$("#pokemon0MedicineDiv").click(function(){
			$("#pokemon0HealthMedicine").attr('value', pokemonMedicineHealthAry[0] += healthAddedFromPotions);
			$("#pokemon0Health").attr('value', pokemonMedicineHealthAry[0]);
			
			if (pokemonMedicineHealthAry[0] > 1) {
				pokemonMedicineHealthAry[0] = 1;
			}
			playerPokeHealth = pokemonMedicineHealthAry[0];
			$("#chooseNewBattlePokemonHealth" + currentPokemonArrayElem).attr('value', pokemonMedicineHealthAry[0]);
		});
		$("#pokemon1MedicineDiv").click(function(){
			$("#pokemon1HealthMedicine").attr('value', pokemonMedicineHealthAry[1] += healthAddedFromPotions);
			$("#pokemon1Health").attr('value', pokemonMedicineHealthAry[1]);
			
			if (pokemonMedicineHealthAry[1] > 1) {
				pokemonMedicineHealthAry[1] = 1;
			}
			playerPokeHealth = pokemonMedicineHealthAry[5];
			$("#chooseNewBattlePokemonHealth" + currentPokemonArrayElem).attr('value', pokemonMedicineHealthAry[5]);
		});
		$("#pokemon2MedicineDiv").click(function(){
			$("#pokemon2HealthMedicine").attr('value', pokemonMedicineHealthAry[2] += healthAddedFromPotions);
			$("#pokemon2Health").attr('value', pokemonMedicineHealthAry[2]);
			
			if (pokemonMedicineHealthAry[2] > 1) {
				pokemonMedicineHealthAry[2] = 1;
			}
			playerPokeHealth = pokemonMedicineHealthAry[5];
			$("#chooseNewBattlePokemonHealth" + currentPokemonArrayElem).attr('value', pokemonMedicineHealthAry[5]);
		});
		$("#pokemon3MedicineDiv").click(function(){
			$("#pokemon3HealthMedicine").attr('value', pokemonMedicineHealthAry[3] += healthAddedFromPotions);
			$("#pokemon3Health").attr('value', pokemonMedicineHealthAry[3]);
			
			if (pokemonMedicineHealthAry[3] > 1) {
				pokemonMedicineHealthAry[3] = 1;
			}
			playerPokeHealth = pokemonMedicineHealthAry[5];
			$("#chooseNewBattlePokemonHealth" + currentPokemonArrayElem).attr('value', pokemonMedicineHealthAry[5]);
		});
		$("#pokemon4MedicineDiv").click(function(){
			$("#pokemon4HealthMedicine").attr('value', pokemonMedicineHealthAry[4] += healthAddedFromPotions);
			$("#pokemon4Health").attr('value', pokemonMedicineHealthAry[4]);
			
			if (pokemonMedicineHealthAry[4] > 1) {
				pokemonMedicineHealthAry[4] = 1;
			}
			playerPokeHealth = pokemonMedicineHealthAry[5];
			$("#chooseNewBattlePokemonHealth" + currentPokemonArrayElem).attr('value', pokemonMedicineHealthAry[5]);
		});
			$("#pokemon5MedicineDiv").click(function(){
			$("#pokemon5HealthMedicine").attr('value', pokemonMedicineHealthAry[5] += healthAddedFromPotions);
			$("#pokemon5Health").attr('value', pokemonMedicineHealthAry[5]);
			
			if (pokemonMedicineHealthAry[5] > 1) {
				pokemonMedicineHealthAry[5] = 1;
			}
			playerPokeHealth = pokemonMedicineHealthAry[5];
			$("#chooseNewBattlePokemonHealth" + currentPokemonArrayElem).attr('value', pokemonMedicineHealthAry[5]);
			/*$("#pokemon" + currentPokemonArrayElem + "Health").attr('value', pokemonMedicineHealthAry[5]);
			$("#pokemon" + currentPokemonArrayElem + "HealthMedicine").attr('value', pokemonMedicineHealthAry[5]);*/
		});
	});
	
  function startBattle() {
		if (invOpen == "true") {
			return;
    }
		
  	inTallGrass = "false";
	  var pokemonEnemy = allPokemonInGame[Math.floor(Math.random() * allPokemonInGame.length)];
	  if (pokemonEnemy === "Pikachu") {
			enemyPokeName = "Pikachu";
		  $("#pokemonEnemy").append("<img width=100px src=" + allPokemonInfoAry[0] + ">");
	  } else if (pokemonEnemy === "Bulbasaur") {
			enemyPokeName = "Bulbasaur";
		  $("#pokemonEnemy").append("<img width=100px src=" + allPokemonInfoAry[1] + ">");
	  } else if (pokemonEnemy === "Charmander") {
			enemyPokeName = "Charmander";
		  $("#pokemonEnemy").append("<img width=100px src=" + allPokemonInfoAry[2] + ">");
	  }
		battle();
		invOpen = "true";
  }
	function battle(ranAgain) {
		if (invOpen == "true") {
			return;
    }
		
		$("#jquery_jplayer_1").jPlayer("stop");
		$("#jquery_jplayer_2").jPlayer("stop");
		$("#jquery_jplayer_4").jPlayer("stop");
		$("#jquery_jplayer_5").jPlayer("stop");
		if (battleAudioSetup == false){
			$("#jquery_jplayer_4").jPlayer({
				ready: function() {
					$(this).jPlayer("setMedia", {
						mp3: "audio/battle/battle1.mp3"
						//mp3: chooseBattleMusic();
					}).jPlayer("play");
					
					$("#jquery_jplayer_4").jPlayer("volume", 0.25);
					
					var click = document.ontouchstart === undefined ? 'click' : 'touchstart';
					var kickoff = function () {
						$("#jquery_jplayer_4").jPlayer("play");
							document.documentElement.removeEventListener(click, kickoff, true);
						};
							document.documentElement.addEventListener(click, kickoff, true);
						},
							swfPath: "/js",
							loop: true
			});
				battleAudioSetup == true;
		} else if (battleAudioSetup == true) {
			$("#jquery_jplayer_1").jPlayer("stop");
			$("#jquery_jplayer_2").jPlayer("stop");
			$("#jquery_jplayer_4").jPlayer("play");
		}
		
		
		$("#grassBackground").hide();
		inTallGrass = "false";
		if (ranAgain === "true") {
			$("#whatsHappeningInBattle").hide();
			$("#pokemonBattle").show();
			$("#runButton").show();
			$("#playersPokemonAttackListBackBtn").hide();
			$("#pokemonBattleHealth").show();
			$("#pokemonAttackBtn").click(function(){
			$("#playersPokemonAttackListBackBtn").show();
			$("#playersPokemonAttackList").show();
			$("#pokemonAttackBtn").hide();
			$("#runButton").hide();
			if (currentplayerPokemon === "Pikachu") {
			$("#playersPokemonAttackList").empty();
				$.each(pikachuAttacks, function (i, moveName){
					$("#playersPokemonAttackList").append("<button id=" + moveName + ">" + moveName + "</button>");
				});
				$("#ThunderBolt").click(function(){
					if (attacking === "true") {
					} else {
						if (enemyPokemonDead === "true") {
						} else {
							attacking = "true";
							$("#whatHappens").empty();
							var normalAttackDmg = 0.05;
							var attackDmg = chanceOfAttackDmg(normalAttackDmg);
							$("#whatsHappeningInBattle").show();
							if (attackDmg === normalAttackDmg) {
								$("#enemyHealth").attr('value', enemyPokeHealth -= normalAttackDmg);
								$("#whatHappens").append("Your Pikachu used Thunder Bolt");
							} else if (attackDmg === 0.18) {
								$("#whatHappens").append("Your Pikachu used Thunder Bolt, it was a super effective hit!");
								$("#enemyHealth").attr('value', enemyPokeHealth -= 0.08);
							} else {
								$("#whatHappens").append("Your Pikachu used Thunder Bolt");
								$("#enemyHealth").attr('value', enemyPokeHealth -= 0.06);
							}
							setTimeout(function(){
								$("#whatsHappeningInBattle").hide();
								$("#whatHappens").empty();
								attacking = "false";
								enemyAttack();
								if (enemyPokeHealth <= 0) {
									attacking = "true";
									$("#whatHappens").empty();
									$("#whatsHappeningInBattle").show();
									$("#whatHappens").append("The wild " + enemyPokeName + "Fainted");
									enemyPokemonDead = "true";
									setTimeout(function(){
										$("#playersPokemonAttackListBackBtn").hide();
										$("#playersPokemonAttackList").empty();
										enemyPokemonDead = "false";
										$("#playersPokemon").empty();
										$("#pokemonEnemy").empty();
										$("#whatHappens").empty();
										$("#pokemonBattle").hide();
										$("#playersPokemonAttackList").hide();
										$("#pokemonAttackBtn").show();
										enemyPokeHealth = 1;
										invOpen = "false";
										attacking = "false";
										$("#grassBackground").show();
										
										$("#jquery_jplayer_1").jPlayer("play");
										$("#jquery_jplayer_4").jPlayer("stop");
									}, 1000);
								}	
							}, 1000); 
						}
					}
					});
			} else if (currentplayerPokemon === "Bulbasaur") {
				$("#playersPokemonAttackList").empty();
				$.each(bulbasaurAttacks, function (i, moveName){
					$("#playersPokemonAttackList").append("<button id=" + moveName + ">" + moveName + "</button>");
				});
				$("#VineWhip").click(function(){
					if (attacking === "true") {
					} else {
						if (enemyPokemonDead === "true") {
						} else {
							attacking = "true";
							$("#whatHappens").empty();
							var normalAttackDmg = 0.05;
							var attackDmg = chanceOfAttackDmg(normalAttackDmg);
							$("#whatsHappeningInBattle").show();
							if (attackDmg === normalAttackDmg) {
								$("#enemyHealth").attr('value', enemyPokeHealth -= normalAttackDmg);
								$("#whatHappens").append("Your Bulbasaur used Vine Whip");
							} else if (attackDmg === 0.18) {
								$("#whatHappens").append("Your Bulbasaur used Vine Whip, it was a super effective hit!");
								$("#enemyHealth").attr('value', enemyPokeHealth -= 0.08);
							} else {
								$("#whatHappens").append("Your Bulbasaur used Vine Whip");
								$("#enemyHealth").attr('value', enemyPokeHealth -= 0.06);
							}
							setTimeout(function(){
								$("#whatsHappeningInBattle").hide();
								$("#whatHappens").empty();
								attacking = "false";
								enemyAttack();
								if (enemyPokeHealth <= 0) {
									attacking = "true";
									$("#whatHappens").empty();
									$("#whatsHappeningInBattle").show();
									$("#whatHappens").append("The wild " + enemyPokeName + "Fainted");
									enemyPokemonDead = "true";
									setTimeout(function(){
										$("#playersPokemonAttackListBackBtn").hide();
										$("#playersPokemonAttackList").empty();
										enemyPokemonDead = "false";
										$("#playersPokemon").empty();
										$("#pokemonEnemy").empty();
										$("#whatHappens").empty();
										$("#pokemonBattle").hide();
										$("#playersPokemonAttackList").hide();
										$("#pokemonAttackBtn").show();
										enemyPokeHealth = 1;
										invOpen = "false";
										attacking = "false";
										$("#grassBackground").show();										
										
										$("#jquery_jplayer_1").jPlayer("play");
										$("#jquery_jplayer_4").jPlayer("stop");
									}, 1000);
								}	
							}, 1000); 
						}
					}
					});
				} else if (currentplayerPokemon === "Charmander") {
				}
				
			});
			$("#runButton").click(function(currentPokemon){
				var d = Math.random();
				if (attacking === "true") {
				} else{
					if (d <= 0.5) { // 50% chance
						invOpen = "true";
						attacking = "true";
						$("#whatHappens").empty();
						$("#whatsHappeningInBattle").show();
						$("#whatHappens").append("Escaped!");
						setTimeout(function(){
							$("#playersPokemonAttackListBackBtn").hide();
							$("#playersPokemonAttackList").empty();
							enemyPokemonDead = "false";
							$("#playersPokemon").empty();
							$("#pokemonEnemy").empty();
							$("#whatHappens").empty();
							$("#pokemonBattle").hide();
							$("#playersPokemonAttackList").hide();
							$("#pokemonAttackBtn").show();
							enemyPokeHealth = 1;
							invOpen = "false";
							attacking = "false";
							inTallGrass = "false";
							$("#grassBackground").show();										
										
							$("#jquery_jplayer_1").jPlayer("play");
							$("#jquery_jplayer_4").jPlayer("stop");
						}, 1000);
					} else if (d <= 0.7) { // 20% chance
						invOpen = "true";
						attacking = "true";
						$("#whatHappens").empty();
						$("#whatsHappeningInBattle").show();
						$("#whatHappens").append("Failed to escape!");
						setTimeout(function(){
							$("#whatHappens").empty();
							$("#whatsHappeningInBattle").hide();
							invOpen = "false";
							attacking = "false";
						}, 1000);
					} else { // 30% chance
						invOpen = "true";
						attacking = "true";
						$("#whatHappens").empty();
						$("#whatsHappeningInBattle").show();
						$("#whatHappens").append("Escaped!");
						setTimeout(function(){
							/*$("#whatHappens").empty();
							$("#whatsHappeningInBattle").hide();
							invOpen = "false";
							attacking = "false";*/
							$("#playersPokemonAttackListBackBtn").hide();
							$("#playersPokemonAttackList").empty();
							enemyPokemonDead = "false";
							$("#playersPokemon").empty();
							$("#pokemonEnemy").empty();
							$("#whatHappens").empty();
							$("#pokemonBattle").hide();
							$("#playersPokemonAttackList").hide();
							$("#pokemonAttackBtn").show();
							enemyPokeHealth = 1;
							invOpen = "false";
							attacking = "false";
							inTallGrass = "false";
							$("#grassBackground").show();										
										
							$("#jquery_jplayer_1").jPlayer("play");
							$("#jquery_jplayer_4").jPlayer("stop");
						}, 1000);
					}
				}
				
			});
			$("#playersPokemonAttackListBackBtn").click(function() {
				$("#playersPokemonAttackListBackBtn").hide();
				$("#playersPokemonAttackList").hide();
				$("#pokemonAttackBtn").show();
				$("#runButton").show();
			});
		} else { // End of ranAgain 
			enemyPokeHealth = 1;
			$("#enemyHealth").attr('value', enemyPokeHealth);
			$("#pokemonBattleHealth").attr('value', playerPokeHealth);
			if (pokemonAry[0] === "Pikachu") {
				$("#playersPokemon").append("<img width=100px src=" + allPokemonInfoAry[0] + ">");
				currentPokemonArrayElem = 0;
				currentplayerPokemon = "Pikachu";
			} else if (pokemonAry[0] === "Bulbasaur") {
				$("#playersPokemon").append("<img width=100px src=" + allPokemonInfoAry[1] + ">");
				currentPokemonArrayElem = 0;
				currentplayerPokemon = "Bulbasaur";
			} else if (pokemonAry[0] === "Charmander") {
				$("#playersPokemon").append("<img width=100px src=" + allPokemonInfoAry[2] + ">");
				currentPokemonArrayElem = 0;
				currentplayerPokemon = "Charmander";
			}
			$("#whatsHappeningInBattle").hide();
			$("#pokemonBattle").show();
			$("#runButton").show();
			$("#playersPokemonAttackListBackBtn").hide();
			$("#pokemonBattleHealth").show();
			$("#pokemonAttackBtn").click(function(){
			$("#playersPokemonAttackListBackBtn").show();
			$("#playersPokemonAttackList").show();
			$("#pokemonAttackBtn").hide();
			$("#runButton").hide();
			if (currentplayerPokemon === "Pikachu") {
			$("#playersPokemonAttackList").empty();
				$.each(pikachuAttacks, function (i, moveName){
					$("#playersPokemonAttackList").append("<button id=" + moveName + ">" + moveName + "</button>");
				});
				$("#ThunderBolt").click(function(){
					if (attacking === "true") {
					} else {
						if (enemyPokemonDead === "true") {
						} else {
							attacking = "true";
							$("#whatHappens").empty();
							var normalAttackDmg = 0.05;
							var attackDmg = chanceOfAttackDmg(normalAttackDmg);
							$("#whatsHappeningInBattle").show();
							if (attackDmg === normalAttackDmg) {
								$("#enemyHealth").attr('value', enemyPokeHealth -= normalAttackDmg);
								$("#whatHappens").append("Your Pikachu used Thunder Bolt");
							} else if (attackDmg === 0.18) {
								$("#whatHappens").append("Your Pikachu used Thunder Bolt, it was a super effective hit!");
								$("#enemyHealth").attr('value', enemyPokeHealth -= 0.08);
							} else {
								$("#whatHappens").append("Your Pikachu used Thunder Bolt");
								$("#enemyHealth").attr('value', enemyPokeHealth -= 0.06);
							}
							setTimeout(function(){
								$("#whatsHappeningInBattle").hide();
								$("#whatHappens").empty();
								attacking = "false";
								enemyAttack();
								if (enemyPokeHealth <= 0) {
									attacking = "true";
									$("#whatHappens").empty();
									$("#whatsHappeningInBattle").show();
									$("#whatHappens").append("The wild " + enemyPokeName + "Fainted");
									enemyPokemonDead = "true";
									setTimeout(function(){
										$("#playersPokemonAttackListBackBtn").hide();
										$("#playersPokemonAttackList").empty();
										enemyPokemonDead = "false";
										$("#playersPokemon").empty();
										$("#pokemonEnemy").empty();
										$("#whatHappens").empty();
										$("#pokemonBattle").hide();
										$("#playersPokemonAttackList").hide();
										$("#pokemonAttackBtn").show();
										enemyPokeHealth = 1;
										invOpen = "false";
										attacking = "false";
										$("#grassBackground").show();										
										
										$("#jquery_jplayer_1").jPlayer("play");
										$("#jquery_jplayer_4").jPlayer("stop");
									}, 1000);
								}	
							}, 1000); 
						}
					}
					});
			} else if (currentplayerPokemon === "Bulbasaur") {
				$("#playersPokemonAttackList").empty();
				$.each(bulbasaurAttacks, function (i, moveName){
					$("#playersPokemonAttackList").append("<button id=" + moveName + ">" + moveName + "</button>");
				});
				$("#VineWhip").click(function(){
					if (attacking === "true") {
					} else {
						if (enemyPokemonDead === "true") {
						} else {
							attacking = "true";
							$("#whatHappens").empty();
							var normalAttackDmg = 0.05;
							var attackDmg = chanceOfAttackDmg(normalAttackDmg);
							$("#whatsHappeningInBattle").show();
							if (attackDmg === normalAttackDmg) {
								$("#enemyHealth").attr('value', enemyPokeHealth -= normalAttackDmg);
								$("#whatHappens").append("Your Bulbasaur used Vine Whip");
							} else if (attackDmg === 0.18) {
								$("#whatHappens").append("Your Bulbasaur used Vine Whip, it was a super effective hit!");
								$("#enemyHealth").attr('value', enemyPokeHealth -= 0.08);
							} else {
								$("#whatHappens").append("Your Bulbasaur used Vine Whip");
								$("#enemyHealth").attr('value', enemyPokeHealth -= 0.06);
							}
							setTimeout(function(){
								$("#whatsHappeningInBattle").hide();
								$("#whatHappens").empty();
								attacking = "false";
								enemyAttack();
								if (enemyPokeHealth <= 0) {
									attacking = "true";
									$("#whatHappens").empty();
									$("#whatsHappeningInBattle").show();
									$("#whatHappens").append("The wild " + enemyPokeName + "Fainted");
									enemyPokemonDead = "true";
									setTimeout(function(){
										$("#playersPokemonAttackListBackBtn").hide();
										$("#playersPokemonAttackList").empty();
										enemyPokemonDead = "false";
										$("#playersPokemon").empty();
										$("#pokemonEnemy").empty();
										$("#whatHappens").empty();
										$("#pokemonBattle").hide();
										$("#playersPokemonAttackList").hide();
										$("#pokemonAttackBtn").show();
										enemyPokeHealth = 1;
										invOpen = "false";
										attacking = "false";
										$("#grassBackground").show();										
										
										$("#jquery_jplayer_1").jPlayer("play");
										$("#jquery_jplayer_4").jPlayer("stop");
									}, 1000);
								}	
							}, 1000); 
						}
					}
					});
				} else if (currentplayerPokemon === "Charmander") {
				}
				
			});
			$("#runButton").click(function(currentPokemon){
				var d = Math.random();
				if (attacking === "true") {
				} else{
					if (d <= 0.5) { // 50% chance
						invOpen = "true";
						attacking = "true";
						$("#whatHappens").empty();
						$("#whatsHappeningInBattle").show();
						$("#whatHappens").append("Escaped!");
						setTimeout(function(){
							$("#playersPokemonAttackListBackBtn").hide();
							$("#playersPokemonAttackList").empty();
							enemyPokemonDead = "false";
							$("#playersPokemon").empty();
							$("#pokemonEnemy").empty();
							$("#whatHappens").empty();
							$("#pokemonBattle").hide();
							$("#playersPokemonAttackList").hide();
							$("#pokemonAttackBtn").show();
							enemyPokeHealth = 1;
							invOpen = "false";
							attacking = "false";
							inTallGrass = "false";
							$("#grassBackground").show();										
							
							$("#jquery_jplayer_1").jPlayer("play");
							$("#jquery_jplayer_4").jPlayer("stop");
						}, 1000);
					} else if (d <= 0.7) { // 20% chance
						invOpen = "true";
						attacking = "true";
						$("#whatHappens").empty();
						$("#whatsHappeningInBattle").show();
						$("#whatHappens").append("Failed to escape!");
						setTimeout(function(){
							$("#whatHappens").empty();
							$("#whatsHappeningInBattle").hide();
							invOpen = "false";
							attacking = "false";
						}, 1000);
					} else { // 30% chance
						invOpen = "true";
						attacking = "true";
						$("#whatHappens").empty();
						$("#whatsHappeningInBattle").show();
						$("#whatHappens").append("Escaped!");
						setTimeout(function(){
							/*$("#whatHappens").empty();
							$("#whatsHappeningInBattle").hide();
							invOpen = "false";
							attacking = "false";*/
							$("#playersPokemonAttackListBackBtn").hide();
							$("#playersPokemonAttackList").empty();
							enemyPokemonDead = "false";
							$("#playersPokemon").empty();
							$("#pokemonEnemy").empty();
							$("#whatHappens").empty();
							$("#pokemonBattle").hide();
							$("#playersPokemonAttackList").hide();
							$("#pokemonAttackBtn").show();
							enemyPokeHealth = 1;
							invOpen = "false";
							attacking = "false";
							inTallGrass = "false";
							$("#grassBackground").show();										
							
							$("#jquery_jplayer_1").jPlayer("play");
							$("#jquery_jplayer_4").jPlayer("stop");
						}, 1000);
					}
				}
			});
			$("#playersPokemonAttackListBackBtn").click(function() {
				$("#playersPokemonAttackListBackBtn").hide();
				$("#playersPokemonAttackList").hide();
				$("#pokemonAttackBtn").show();
				$("#runButton").show();
			});
		}
	}
	function enemyAttack() {
		//playerPokeHealth = 1;
		var isPlayerDead = "false";
		$("#pokemonBattleHealth").attr('value', playerPokeHealth);
		attacking = "true";
		$("#whatHappens").empty();
		var normalAttackDmg = 0.05;
		var attackDmg = chanceOfAttackDmg(0.05);
		$("#whatsHappeningInBattle").show();
		if (attackDmg === normalAttackDmg) {
			$("#whatHappens").append("The wild " + enemyPokeName + " used " + chooseEnemyMove());
			$("#pokemonBattleHealth").attr('value', playerPokeHealth -= normalAttackDmg);
			
			pokemonMedicineHealthAry[currentPokemonArrayElem] = playerPokeHealth;
			$("#chooseNewBattlePokemonHealth" + currentPokemonArrayElem).attr('value', pokemonMedicineHealthAry[currentPokemonArrayElem]);
			$("#pokemon" + currentPokemonArrayElem + "Health").attr('value', pokemonMedicineHealthAry[currentPokemonArrayElem]);
			$("#pokemon" + currentPokemonArrayElem + "HealthMedicine").attr('value', pokemonMedicineHealthAry[currentPokemonArrayElem]);
		}
		if (attackDmg === 0.18) {
			$("#whatHappens").append("The wild " + enemyPokeName + " used " + chooseEnemyMove() + ", it was a super effective hit!");
			$("#pokemonBattleHealth").attr('value', playerPokeHealth -= 0.08);
			
			pokemonMedicineHealthAry[currentPokemonArrayElem] = playerPokeHealth;
			$("#chooseNewBattlePokemonHealth" + currentPokemonArrayElem).attr('value', pokemonMedicineHealthAry[currentPokemonArrayElem]);
			$("#pokemon" + currentPokemonArrayElem + "Health").attr('value', pokemonMedicineHealthAry[currentPokemonArrayElem]);
			$("#pokemon" + currentPokemonArrayElem + "HealthMedicine").attr('value', pokemonMedicineHealthAry[currentPokemonArrayElem]);
		} else {
			$("#whatHappens").append("The wild " + enemyPokeName + " used " + chooseEnemyMove());
			$("#pokemonBattleHealth").attr('value', playerPokeHealth -= 0.06);
			
			pokemonMedicineHealthAry[currentPokemonArrayElem] = playerPokeHealth;
			$("#chooseNewBattlePokemonHealth" + currentPokemonArrayElem).attr('value', pokemonMedicineHealthAry[currentPokemonArrayElem]);
			$("#pokemon" + currentPokemonArrayElem + "Health").attr('value', pokemonMedicineHealthAry[currentPokemonArrayElem]);
			$("#pokemon" + currentPokemonArrayElem + "HealthMedicine").attr('value', pokemonMedicineHealthAry[currentPokemonArrayElem]);
		}
		setTimeout(function(){
			$("#whatsHappeningInBattle").hide();
			$("#whatHappens").empty();
			attacking = "false";
			}, 1000); 
		if (playerPokeHealth <= 0) {
			attacking = "true";
			$("#whatHappens").empty();
			$("#whatsHappeningInBattle").show();
			$("#whatHappens").append("Your " + currentplayerPokemon + " fainted!");
			isPlayerDead = "true";
			setTimeout(function(){
				chooseNextPokemon();
				pokemonMedicineHealthAry[currentPokemonArrayElem] = 0;
				$("#chooseNewBattlePokemonHealth" + currentPokemonArrayElem).attr('value', pokemonMedicineHealthAry[currentPokemonArrayElem]);
				$("#pokemon" + currentPokemonArrayElem + "Health").attr('value', pokemonMedicineHealthAry[currentPokemonArrayElem]);
				$("#pokemon" + currentPokemonArrayElem + "HealthMedicine").attr('value', pokemonMedicineHealthAry[currentPokemonArrayElem]);
				/*$("#playersPokemonAttackListBackBtn").hide();
				$("#playersPokemonAttackList").empty();
				enemyPokemonDead = "false";
				isPlayerDead = "false";
				$("#playersPokemon").empty();
				$("#pokemonEnemy").empty();
				$("#whatHappens").empty();
				$("#pokemonBattle").hide();
				$("#playersPokemonAttackList").hide();
				$("#pokemonAttackBtn").show();
				enemyPokeHealth = 1;
				playerPokeHealth = 1;
				invOpen = "false";
				attacking = "false";
				inTallGrass = "false";
				$("#grassBackground").show();
				$("#jquery_jplayer_1").jPlayer("play");
				$("#jquery_jplayer_4").jPlayer("stop");*/
			}, 1500);
		}
	}
	
	function chooseNextPokemon() {
		if (pokemonMedicineHealthAry[0] <= 0 && pokemonMedicineHealthAry[1] <= 0 && pokemonMedicineHealthAry[2] <= 0 && pokemonMedicineHealthAry[3] <= 0 && pokemonMedicineHealthAry[4] <= 0 && pokemonMedicineHealthAry[5] <= 0) {
			$("#whatHappens").empty();
			$("#whatsHappeningInBattle").show();
			$("#whatHappens").append("There aren't any available Pokèmon!");
			$("#jquery_jplayer_1").jPlayer("stop");
			$("#jquery_jplayer_4").jPlayer("play");
			setTimeout(function() {
				$("#playersPokemonAttackListBackBtn").hide();
				$("#playersPokemonAttackList").empty();
				enemyPokemonDead = "false";
				isPlayerDead = "false";
				$("#playersPokemon").empty();
				$("#pokemonEnemy").empty();
				$("#whatHappens").empty();
				$("#pokemonBattle").hide();
				$("#playersPokemonAttackList").hide();
				$("#pokemonAttackBtn").show();
				$("#chooseNewBattlePokemon").hide();
				enemyPokeHealth = 1;
				playerPokeHealth = 1;
				invOpen = "false";
				attacking = "false";
				inTallGrass = "false";				
				
				$("#grassBackground").show();
				
				$("#jquery_jplayer_1").jPlayer("play");
				$("#jquery_jplayer_4").jPlayer("stop");
			}, 1700);
		} else {
			if (pokemonAry.length > 1) {
				if (pokemonAry.length === 2) {
					$("#chooseNewBattlePokemonDiv0").show();
					$("#chooseNewBattlePokemonDiv1").show();
					$("#chooseNewBattlePokemonDiv2").hide();
					$("#chooseNewBattlePokemonDiv3").hide();
					$("#chooseNewBattlePokemonDiv4").hide();
					$("#chooseNewBattlePokemonDiv5").hide();
				}
				if (pokemonAry.length === 3) {
					$("#chooseNewBattlePokemonDiv0").show();
					$("#chooseNewBattlePokemonDiv1").show();
					$("#chooseNewBattlePokemonDiv2").show();
					$("#chooseNewBattlePokemonDiv3").hide();
					$("#chooseNewBattlePokemonDiv4").hide();
					$("#chooseNewBattlePokemonDiv5").hide();
				}
				if (pokemonAry.length === 4) {
					$("#chooseNewBattlePokemonDiv0").show();
					$("#chooseNewBattlePokemonDiv1").show();
					$("#chooseNewBattlePokemonDiv2").show();
					$("#chooseNewBattlePokemonDiv3").show();
					$("#chooseNewBattlePokemonDiv4").hide();
					$("#chooseNewBattlePokemonDiv5").hide();
				}
				if (pokemonAry.length === 5) {
					$("#chooseNewBattlePokemonDiv0").show();
					$("#chooseNewBattlePokemonDiv1").show();
					$("#chooseNewBattlePokemonDiv2").show();
					$("#chooseNewBattlePokemonDiv3").show();
					$("#chooseNewBattlePokemonDiv4").show();
					$("#chooseNewBattlePokemonDiv5").hide();
				}
				if (pokemonAry.length === 6) {
					$("#chooseNewBattlePokemonDiv0").show();
					$("#chooseNewBattlePokemonDiv1").show();
					$("#chooseNewBattlePokemonDiv2").show();
					$("#chooseNewBattlePokemonDiv3").show();
					$("#chooseNewBattlePokemonDiv4").show();
					$("#chooseNewBattlePokemonDiv5").show();
				}
				$("#chooseNewBattlePokemon").show();
				$("#chooseNewBattlePokemonDiv0").click(function() {
					if ($("#chooseNewBattlePokemonHealth0").attr('value') <= 0) {
						$("#chooseNewBattlePokemon").append("This pokemon doesn't have any health!");
					} else {
						var chosenPokeHealth = $("#chooseNewBattlePokemonHealth0").attr('value');
						$("#pokemonBattleHealth").attr('value', chosenPokeHealth)
						$("#playersPokemon").empty();
						$("#playersPokemonAttackList").empty();
						if ($("#chooseNewBattlePokemonIMG0").attr('src') === allPokemonInfoAry[0]) {
							$("#playersPokemon").append("<img width=100px src=" + allPokemonInfoAry[0] + ">");
							currentPokemonArrayElem = 0;
							currentplayerPokemon = "Pikachu";
						} else if ($("#chooseNewBattlePokemonIMG0").attr('src') === allPokemonInfoAry[1]) {
							$("#playersPokemon").append("<img width=100px src=" + allPokemonInfoAry[1] + ">");
							currentPokemonArrayElem = 0;
							currentplayerPokemon = "Bulbasaur";
						} else if ($("#chooseNewBattlePokemonIMG0").attr('src') === allPokemonInfoAry[2]) {
							$("#playersPokemon").append("<img width=100px src=" + allPokemonInfoAry[2] + ">");
							currentPokemonArrayElem = 0;
							currentplayerPokemon = "Charmander";
						}
						playerPokeHealth = pokemonMedicineHealthAry[currentPokemonArrayElem];
						$("#playersPokemonAttackList").empty();
						$("#chooseNewBattlePokemon").hide();
						$("#playersPokemonAttackList").hide();
						$("#pokemonAttackBtn").show();
						battle("true");
					}
				});
					$("#chooseNewBattlePokemonDiv1").click(function() {
					if ($("#chooseNewBattlePokemonHealth1").attr('value') <= 0) {
						$("#chooseNewBattlePokemon").append("This pokemon doesn't have any health!");
					} else {
						var chosenPokeHealth = $("#chooseNewBattlePokemonHealth1").attr('value');
						$("#pokemonBattleHealth").attr('value', chosenPokeHealth)
						$("#playersPokemon").empty();
						$("#playersPokemonAttackList").empty();
						if ($("#chooseNewBattlePokemonIMG1").attr('src') === allPokemonInfoAry[0]) {
							$("#playersPokemon").append("<img width=100px src=" + allPokemonInfoAry[0] + ">");
							currentPokemonArrayElem = 1;
							currentplayerPokemon = "Pikachu";
						} else if ($("#chooseNewBattlePokemonIMG1").attr('src') === allPokemonInfoAry[1]) {
							$("#playersPokemon").append("<img width=100px src=" + allPokemonInfoAry[1] + ">");
							currentPokemonArrayElem = 1;
							currentplayerPokemon = "Bulbasaur";
						} else if ($("#chooseNewBattlePokemonIMG1").attr('src') === allPokemonInfoAry[2]) {
							$("#playersPokemon").append("<img width=100px src=" + allPokemonInfoAry[2] + ">");
							currentPokemonArrayElem = 1;
							currentplayerPokemon = "Charmander";
						}
						playerPokeHealth = pokemonMedicineHealthAry[currentPokemonArrayElem];
						$("#playersPokemonAttackList").empty();
						$("#chooseNewBattlePokemon").hide();
						$("#playersPokemonAttackList").hide();
						$("#pokemonAttackBtn").show();
						battle("true");
					}
				});
					$("#chooseNewBattlePokemonDiv2").click(function() {
					if ($("#chooseNewBattlePokemonHealth2").attr('value') <= 0) {
						$("#chooseNewBattlePokemon").append("This pokemon doesn't have any health!");
					} else {
						var chosenPokeHealth = $("#chooseNewBattlePokemonHealth2").attr('value');
						$("#pokemonBattleHealth").attr('value', chosenPokeHealth)
						$("#playersPokemon").empty();
						$("#playersPokemonAttackList").empty();
						if ($("#chooseNewBattlePokemonIMG2").attr('src') === allPokemonInfoAry[0]) {
							$("#playersPokemon").append("<img width=100px src=" + allPokemonInfoAry[0] + ">");
							currentPokemonArrayElem = 2;
							currentplayerPokemon = "Pikachu";
						} else if ($("#chooseNewBattlePokemonIMG2").attr('src') === allPokemonInfoAry[1]) {
							$("#playersPokemon").append("<img width=100px src=" + allPokemonInfoAry[1] + ">");
							currentPokemonArrayElem = 2;
							currentplayerPokemon = "Bulbasaur";
						} else if ($("#chooseNewBattlePokemonIMG2").attr('src') === allPokemonInfoAry[2]) {
							$("#playersPokemon").append("<img width=100px src=" + allPokemonInfoAry[2] + ">");
							currentPokemonArrayElem = 2;
							currentplayerPokemon = "Charmander";
						}
						playerPokeHealth = pokemonMedicineHealthAry[currentPokemonArrayElem];
						$("#playersPokemonAttackList").empty();
						$("#chooseNewBattlePokemon").hide();
						$("#playersPokemonAttackList").hide();
						$("#pokemonAttackBtn").show();
						battle("true");
					}
				});
					$("#chooseNewBattlePokemonDiv3").click(function() {
					if ($("#chooseNewBattlePokemonHealth3").attr('value') <= 0) {
						$("#chooseNewBattlePokemon").append("This pokemon doesn't have any health!");
					} else {
						var chosenPokeHealth = $("#chooseNewBattlePokemonHealth3").attr('value');
						$("#pokemonBattleHealth").attr('value', chosenPokeHealth)
						$("#playersPokemon").empty();
						$("#playersPokemonAttackList").empty();
						if ($("#chooseNewBattlePokemonIMG3").attr('src') === allPokemonInfoAry[0]) {
							$("#playersPokemon").append("<img width=100px src=" + allPokemonInfoAry[0] + ">");
							currentPokemonArrayElem = 3;
							currentplayerPokemon = "Pikachu";
						} else if ($("#chooseNewBattlePokemonIMG3").attr('src') === allPokemonInfoAry[1]) {
							$("#playersPokemon").append("<img width=100px src=" + allPokemonInfoAry[1] + ">");
							currentPokemonArrayElem = 3;
							currentplayerPokemon = "Bulbasaur";
						} else if ($("#chooseNewBattlePokemonIMG3").attr('src') === allPokemonInfoAry[2]) {
							$("#playersPokemon").append("<img width=100px src=" + allPokemonInfoAry[2] + ">");
							currentPokemonArrayElem = 3;
							currentplayerPokemon = "Charmander";
						}
						playerPokeHealth = pokemonMedicineHealthAry[currentPokemonArrayElem];
						$("#playersPokemonAttackList").empty();
						$("#chooseNewBattlePokemon").hide();
						$("#playersPokemonAttackList").hide();
						$("#pokemonAttackBtn").show();
						battle("true");
					}
				});
					$("#chooseNewBattlePokemonDiv4").click(function() {
					if ($("#chooseNewBattlePokemonHealth4").attr('value') <= 0) {
						$("#chooseNewBattlePokemon").append("This pokemon doesn't have any health!");
					} else {
						var chosenPokeHealth = $("#chooseNewBattlePokemonHealth4").attr('value');
						$("#pokemonBattleHealth").attr('value', chosenPokeHealth)
						$("#playersPokemon").empty();
						$("#playersPokemonAttackList").empty();
						if ($("#chooseNewBattlePokemonIMG4").attr('src') === allPokemonInfoAry[0]) {
							$("#playersPokemon").append("<img width=100px src=" + allPokemonInfoAry[0] + ">");
							currentPokemonArrayElem = 4;
							currentplayerPokemon = "Pikachu";
						} else if ($("#chooseNewBattlePokemonIMG4").attr('src') === allPokemonInfoAry[1]) {
							$("#playersPokemon").append("<img width=100px src=" + allPokemonInfoAry[1] + ">");
							currentPokemonArrayElem = 4;
							currentplayerPokemon = "Bulbasaur";
						} else if ($("#chooseNewBattlePokemonIMG4").attr('src') === allPokemonInfoAry[2]) {
							$("#playersPokemon").append("<img width=100px src=" + allPokemonInfoAry[2] + ">");
							currentPokemonArrayElem = 4;
							currentplayerPokemon = "Charmander";
						}
						playerPokeHealth = pokemonMedicineHealthAry[currentPokemonArrayElem];
						$("#playersPokemonAttackList").empty();
						$("#chooseNewBattlePokemon").hide();
						$("#playersPokemonAttackList").hide();
						$("#pokemonAttackBtn").show();
						battle("true");
					}
				});
					$("#chooseNewBattlePokemonDiv5").click(function() {
					if ($("#chooseNewBattlePokemonHealth5").attr('value') <= 0) {
						$("#chooseNewBattlePokemon").append("This pokemon doesn't have any health!");
					} else {
						var chosenPokeHealth = $("#chooseNewBattlePokemonHealth0").attr('value');
						$("#pokemonBattleHealth").attr('value', chosenPokeHealth)
						$("#playersPokemon").empty();
						$("#playersPokemonAttackList").empty();
						if ($("#chooseNewBattlePokemonIMG5").attr('src') === allPokemonInfoAry[0]) {
							$("#playersPokemon").append("<img width=100px src=" + allPokemonInfoAry[0] + ">");
							currentPokemonArrayElem = 5;
							currentplayerPokemon = "Pikachu";
						} else if ($("#chooseNewBattlePokemonIMG5").attr('src') === allPokemonInfoAry[1]) {
							$("#playersPokemon").append("<img width=100px src=" + allPokemonInfoAry[1] + ">");
							currentPokemonArrayElem = 5;
							currentplayerPokemon = "Bulbasaur";
						} else if ($("#chooseNewBattlePokemonIMG5").attr('src') === allPokemonInfoAry[2]) {
							$("#playersPokemon").append("<img width=100px src=" + allPokemonInfoAry[2] + ">");
							currentPokemonArrayElem = 5;
							currentplayerPokemon = "Charmander";
						}
						playerPokeHealth = pokemonMedicineHealthAry[currentPokemonArrayElem];
						$("#playersPokemonAttackList").empty();
						$("#chooseNewBattlePokemon").hide();
						$("#playersPokemonAttackList").hide();
						$("#pokemonAttackBtn").show();
						battle("true");
					}
				});

			}
		}
	}
		
	function chooseEnemyMove() {
		var chosenMove;
		if (enemyPokeName === "Pikachu") {
			chosenMove = pikachuAttacks[Math.floor(Math.random() * pikachuAttacks.length)];
			chosenMove = "ThunderBolt";
			return chosenMove;
		} else if (enemyPokeName === "Bulbasaur") {
			chosenMove = bulbasaurAttacks[Math.floor(Math.random() * bulbasaurAttacks.length)];
			chosenMove = "VineWhip";
			return chosenMove;
		} else if (enemyPokeName === "Charmander") {
			chosenMove = charmanderAttacks[Math.floor(Math.random() * charmanderAttacks.length)];
			chosenMove = "FlameThrower";
			return chosenMove;
		}
	}

	function chanceOfAttackDmg(normalDmg) {
		var d = Math.random();
		if (d <= 0.5) { // 50% chance of no change
			return normalDmg;
		} else if (d <= 0.7) { // 20% chance of critical hit
			normalDmg += 0.13;
			return normalDmg;
		} else { //30% chance of higher damage
			normalDmg += 0.05;
			return normalDmg;
		}
	}
	//function 
	
	function inGrass() {
		var d = Math.random();
		if (d <= 0.5) { // 50% chance
			inTallGrass = false;
		} else if (d <= 0.7) { // 20% chance
			inTallGrass = true;
		}
		//$("#map").append(inTallGrass);
	}
	
	
	function collision($div1, $div2) {
    var x1 = $div1.offset().left;
    var y1 = $div1.offset().top;
    var h1 = $div1.outerHeight(true);
    var w1 = $div1.outerWidth(true);
    var b1 = y1 + h1;
    var r1 = x1 + w1;
    var x2 = $div2.offset().left;
    var y2 = $div2.offset().top;
    var h2 = $div2.outerHeight(true);
    var w2 = $div2.outerWidth(true);
    var b2 = y2 + h2;
    var r2 = x2 + w2;
    if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
  	return true;
	}
	
	
	function playBackgroundMusic(divID, musicPath, vol) {
	$("#jquery_jplayer_1").jPlayer({
    ready: function() {
      $(this).jPlayer("setMedia", {
        //mp3: "audio/background/Selenia_City.mp3"
        mp3: musicPath
      }).jPlayer("play");
          
      $(divID).jPlayer("volume", vol);
          
      var click = document.ontouchstart === undefined ? 'click' : 'touchstart';
      var kickoff = function () {
       $(divID).jPlayer("play");
    		 document.documentElement.removeEventListener(click, kickoff, true);
       };
         document.documentElement.addEventListener(click, kickoff, true);
       },
       swfPath: "/js",
       loop: true
    });
	}
	
	function chooseBattleMusic() {
		var choosenMusic = battleMusicSrc[Math.floor(Math.random() * battleMusicSrc.length)];
		return choosenMusic;
	}
});
