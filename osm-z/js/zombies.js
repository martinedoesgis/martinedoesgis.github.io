var nbZombiesPerTurn = 5

var zombiesData = {
		  "type": "FeatureCollection",
		  "features": []
		}
		
function generateZombies(){
	console.log(zombiesData)
	
	var center = player.getLngLat()
	var radius = maxViewDistance/1000*4;
	var options = {steps: 20, units: 'kilometers'};
	var circle = turf.circle([center.lng,center.lat], radius, options);
	var bbox = turf.bbox(circle);
	
	var possibleArea = circle;
	possibleArea = turf.difference(possibleArea, potentialViewArea)
	possibleArea = turf.union(possibleArea,visibleArea)
	possibleArea = turf.difference(circle,possibleArea)
	
	
	for (let i = 0; i < nbZombiesPerTurn; i++) {
		var zombie = zombiePositionGenerator(possibleArea)
		zombie.properties.state = "dontSee"
		zombie.properties.color = "#1AAB7A"
		zombie.properties.opacity = 1
		zombiesData.features.push(zombie)
	}
	map.getSource('zombies').setData(zombiesData)
	manageZombies()
	
}

function zombiePositionGenerator(possibleArea){
	var p = randomPointInMultiPolygon(possibleArea)
	return p.features[0]
	//console.log(p,buildingsArea)
}

function manageZombies(){
	for (var i in zombiesData.features){
		//removeZombies that are too far
		if (zombiesData.features[i].properties.state == 'dontSee'){
			
		}
		
	}
}

function playerSeeZombies(){
	//check if zombie is in vision area
	for (var i in zombiesData.features){
		var playerVision = turf.booleanWithin(zombiesData.features[i], visibleLight);
		if(playerVision){
			console.log(playerVision)
			zombiesData.features[i].properties.state = "seeAndSeen"
			zombiesData.features[i].properties.color = "#d62f64"
			zombiesData.features[i].properties.opacity = 1
		}
		else if(zombiesData.features[i].properties.state == "seeAndSeen"){
			zombiesData.features[i].properties.state = "see"
			zombiesData.features[i].properties.color = "#d6d12f"
			zombiesData.features[i].properties.opacity = 1
		}
	}
	map.getSource('zombies').setData(zombiesData)
}


function moveZombies(){

	//check if zombie is in vision area
	for (var i in zombiesData.features){
		var vision = turf.booleanWithin(zombiesData.features[i], visibleArea);
		if(vision){
			zombiesData.features[i].properties.state = "see"
			zombiesData.features[i].properties.color = "#d6d12f"
			zombiesData.features[i].properties.opacity = 1
		}
		var playerVision = turf.booleanWithin(zombiesData.features[i], visibleLight);
		if(playerVision){
			console.log(playerVision)
			zombiesData.features[i].properties.state = "seeAndSeen"
			zombiesData.features[i].properties.color = "#d62f64"
			zombiesData.features[i].properties.opacity = 1
		}
	}
	map.getSource('zombies').setData(zombiesData)
}

