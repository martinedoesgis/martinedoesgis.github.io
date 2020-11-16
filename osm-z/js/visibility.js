

//return polygon without first node = last node, the format needed for the visibilty script
function createVibilityPolygon(c){
	var l = c[0].length-1
	var d = c[0]
	var p = []
	for(var i=0; i<l; i++) {
        p.push(d[i])
    }
	return p
}



function updateVisibility(){
	var center = player.getLngLat()
	var visibility = VisibilityPolygon.compute([center.lng,center.lat], visibilitySegments);
	visibility.push(visibility[0])
	var radius = maxViewDistance/1000;
	var options = {steps: 20, units: 'kilometers'};
	var circle = turf.circle([center.lng,center.lat], radius, options);
	visibleArea = turf.intersect(turf.polygon([visibility]),circle);
	map.getSource('visible-area').setData(visibleArea)
}

// updating view field when rotating

map.on('rotate', function() {
	updateVisibilityCone()
	var center = player.getLngLat()
	map.setCenter(center)
});

function updateVisibilityCone(){
	var center = player.getLngLat()
	var startPoint = turf.point([center.lng,center.lat])
	var length = maxViewDistance/1000;
	var options = {units: 'kilometers'};
	var destination1 = turf.destination(startPoint, length, (map.getBearing()-30), options);
	var destination2 = turf.destination(startPoint, length, (map.getBearing()), options);
	var destination3 = turf.destination(startPoint, length, (map.getBearing()+30), options);
	var points = turf.featureCollection([startPoint,destination1,destination2,destination3]);
	var hull = turf.convex(points);
	visibleLight = turf.intersect(hull,visibleArea)
	map.getSource('potential-cone').setData(visibleLight)
}