var maxMoveDistance = 75
var maxViewDistance = 100

var potentialViewArea,redBuildings,visibleArea,visibleLight,visibilitySegments,circle

function updateEnvironment(){
	var center = player.getLngLat()
	var radius = maxViewDistance/1000*2;
	var options = {steps: 20, units: 'kilometers'};
	circle = turf.circle([center.lng,center.lat], radius, options);
    var features = map.queryRenderedFeatures( 
	  { layers: ['building-extrusion'] }
	);
	var difference = circle
	redBuildings = {
		  "type": "FeatureCollection",
		  "features": []
		}
	for (var i in features){
	  difference = turf.difference(difference,features[i])
	  var disjoint = turf.booleanDisjoint(circle, features[i])
	  if(disjoint){}
	  else{
		//console.log(features[i])
		if (features[i].geometry.type == "Polygon"){
			if(features[i].geometry.coordinates.length == 1){
				redBuildings.features.push(features[i])
			}
			else{
				redBuildings.features.push(turf.polygon([features[i].geometry.coordinates[0]]))
			}
		}
	  }
	}
	if (difference.geometry.type == 'MultiPolygon'){
			for (var i in difference.geometry.coordinates){
				var polygon = turf.polygon(difference.geometry.coordinates[i]);
				var playerInside = turf.booleanWithin(turf.point([center.lng,center.lat]), polygon);
				if(playerInside){
					potentialViewArea = polygon
				}
			}
		}
		else{
			potentialViewArea = difference
		}
	map.getSource('potential-vision').setData(potentialViewArea)
	map.getSource('redBuildings').setData(redBuildings)
	
	var visibilityPolygons = []
	var polyBbox = turf.bbox(potentialViewArea)
	polyBbox = turf.bboxPolygon(polyBbox)
	visibilityPolygons.push(createVibilityPolygon(polyBbox.geometry.coordinates))
	for (var i in redBuildings.features){
		visibilityPolygons.push(createVibilityPolygon(redBuildings.features[i].geometry.coordinates))
	}
	visibilitySegments = VisibilityPolygon.convertToSegments(visibilityPolygons);
	visibilitySegments = VisibilityPolygon.breakIntersections(visibilitySegments);
	
	updateVisibility()
	movementAllowed = true
}