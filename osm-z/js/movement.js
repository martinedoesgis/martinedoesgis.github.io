var movementAllowed = false; // set to true once updateEnvironment() reloaded


map.on('click',function(e){
	if(movementAllowed = true){
		var point = turf.point([e.lngLat.lng, e.lngLat.lat]);
		var inVisibleArea = turf.booleanWithin(point, visibleLight);
		if (inVisibleArea){
			var popup = new mapboxgl.Popup({ closeOnClick: true,closeButton: false })
				.setLngLat([e.lngLat.lng, e.lngLat.lat])
				.setHTML('<button class="playerMov">Move here</button>')
				.addTo(map);
			var btn = document.getElementsByClassName("playerMov")[0];
			btn.addEventListener("click", () => {
					console.log("moving!");
					popup.remove();
					var playerCoord = player.getLngLat()
					var path = turf.lineString([[playerCoord.lng,playerCoord.lat],[e.lngLat.lng, e.lngLat.lat]])
					var length = turf.length(path, {units: 'meters'});
					console.log(length)
					var steps = Math.ceil(length)
					for(var i=1; i<=steps; i++) {
						(function(index) {
							var time = i*50
							setTimeout(function(){
								if(index==steps){
									player.setLngLat([e.lngLat.lng, e.lngLat.lat])
									map.setCenter([e.lngLat.lng, e.lngLat.lat])
									console.log("animation finished, new turn")
									updateEnvironment()
								}
								else{
									var dist = index
									var along = turf.along(path, dist, {units: 'meters'});
									player.setLngLat(along.geometry.coordinates)
									map.setCenter(along.geometry.coordinates)
									console.log("moving")
									updateVisibility()
									updateVisibilityCone()
								}
							}, time);
						})(i)
					}
			});
		}
	}
})


