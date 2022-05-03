//random point in multipolygon
function randomPointInMultiPolygon(multipolygon){
	var bbox = turf.bbox(multipolygon);
	var point = turf.randomPoint(1, {bbox: bbox})
	for (var i in multipolygon.geometry.coordinates){
		var polygon = turf.polygon(multipolygon.geometry.coordinates[i]);
		var inside = turf.booleanWithin(point.features[0], polygon);
		if (inside) {
			return point
		}
	}
	return randomPointInMultiPolygon(multipolygon)
}
