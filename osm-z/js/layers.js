const markerPlayer = document.createElement('div');
markerPlayer.className = 'markerPlayer';

var player = new mapboxgl.Marker({
	element: markerPlayer,
})

map.on('load', function() {
	//player
	player.setLngLat([12.58461,55.69890])
	player.addTo(map);
	
	// zombies
	map.addSource('zombies', {
		'type': 'geojson',
		'data': {
			"type": "FeatureCollection",
			"features": []
		}
	});
	map.addLayer({
		'id': 'zombies',
		'type': 'circle',
		'source': 'zombies',
		'layout': {},
		'paint': {
			'circle-color': ['get','color'],
			'circle-opacity': ['get','opacity'],
			'circle-radius': 10
		}
	});
	
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
			'fill-opacity': 0
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
	
	//black non-visible area
	map.addSource('nonvisible-area', {
		  'type': 'geojson',
		  'data': {
			  "type": "FeatureCollection",
			  "features": []
			}
		});
	map.addLayer({
		'id': 'nonvisible-area',
		'type': 'fill',
		'source': 'nonvisible-area',
		'layout': {},
		'paint': {
			'fill-color': '#000',
			'fill-opacity': 0.5
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
			'fill-extrusion-color': '#aaa',
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
			'fill-extrusion-opacity': 1,	
		}
	}
	,labelLayerId);	
	
	
	//layer ordering
	//map.moveLayer('potential-vision', '3d-buildings');
	//map.moveLayer('visible-area', '3d-buildings');

	
	
	updateEnvironment()
	
	
})