var player = new mapboxgl.Marker({
		draggable: true
	})

map.on('load', function() {
	//player
	player.setLngLat([5.92033,45.56620])
	player.addTo(map);
	
	// blue potential vision
	map.addSource('potential-vision', {
		'type': 'geojson',
		'data': {
			"type": "FeatureCollection",
			"features": []
		}
	});
	map.addLayer({
		'id': 'potential-vision',
		'type': 'fill',
		'source': 'potential-vision',
		'layout': {},
		'paint': {
			'fill-color': '#088',
			'fill-opacity': 0
		}
	});
	
	//red buildings
	map.addSource('redBuildings', {
		  'type': 'geojson',
		  'data': {
			  "type": "FeatureCollection",
			  "features": []
			}
		});
	map.addLayer({
		'id': 'redBuildings',
		'type': 'fill',
		'source': 'redBuildings',
		'layout': {},
		'paint': {
			'fill-color': '#800',
			'fill-opacity': 0
		}
	});
	
	// yellow potential cone
	map.addSource('potential-cone', {
		'type': 'geojson',
		'data': {
			"type": "FeatureCollection",
			"features": []
		}
	});
	map.addLayer({
		'id': 'potential-cone',
		'type': 'fill',
		'source': 'potential-cone',
		'layout': {},
		'paint': {
			'fill-color': '#FFFF00',
			'fill-opacity': 0.1
		}
	});
	
	//green visible area
	map.addSource('visible-area', {
		  'type': 'geojson',
		  'data': {
			  "type": "FeatureCollection",
			  "features": []
			}
		});
	map.addLayer({
		'id': 'visible-area',
		'type': 'fill',
		'source': 'visible-area',
		'layout': {},
		'paint': {
			'fill-color': '#ADFF2F',
			'fill-opacity': 0
		}
	});
	
	//final vision display
	map.addSource('visible-display', {
		  'type': 'geojson',
		  'data': {
			  "type": "FeatureCollection",
			  "features": []
			}
		});
	map.addLayer({
		'id': 'visible-display',
		'type': 'fill',
		'source': 'visible-display',
		'layout': {},
		'paint': {
			'fill-color': '#000',
			'fill-opacity': 0.7
		}
	});
	
	//3D buildings
	// Insert the layer beneath any symbol layer.
	var layers = map.getStyle().layers;
	var labelLayerId;
	for (var i = 0; i < layers.length; i++) {
		if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
			labelLayerId = layers[i].id;
			break;
		}
	}
	map.addLayer(
	{
		'id': '3d-buildings',
		'source': 'composite',
		'source-layer': 'building',
		'filter': ['==', 'extrude', 'true'],
		'type': 'fill-extrusion',
		'minzoom': 15,
		'paint': {
			'fill-extrusion-color': '#555',
			//'fill-extrusion-pattern': 'wall',
			// use an 'interpolate' expression to add a smooth transition effect to the
			// buildings as the user zooms in
			'fill-extrusion-height': [
			'interpolate',
			['linear'],
			['zoom'],
			15,
			0,
			15.05,
			['get', 'height']
			],
			'fill-extrusion-base': [
			'interpolate',
			['linear'],
			['zoom'],
			15,
			0,
			15.05,
			['get', 'min_height']
			],
			'fill-extrusion-opacity': 0.7,	
		}
	}
	,labelLayerId);	
	
	
	//layer ordering
	map.moveLayer('potential-vision', '3d-buildings');
	map.moveLayer('visible-area', '3d-buildings');
	
	
	updateEnvironment()
	
	
})