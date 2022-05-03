//mapbox token
mapboxgl.accessToken = 'pk.eyJ1IjoibGVvLWlnYSIsImEiOiJjazY2bGV3MTYxMjV3M25sMmdtNWluM2wzIn0.2THSqD6nz9OhE0Xsjnbw1g';

//map
var map = new mapboxgl.Map({
	style: 'mapbox://styles/leo-iga/cl2ltqtnf002f14peo9i3w1xg',
	center: [12.58461,55.69890],
	zoom: 17,
	pitch: 45,
	maxPitch:60,
	minZoom:17,
	maxZoom:18,
	dragPan: false,
	bearing: -17.6,
	container: 'map',
	antialias: true
});

//search
// map.addControl(
	// new MapboxGeocoder({
	// accessToken: mapboxgl.accessToken,
	// mapboxgl: mapboxgl
	// })
// );

