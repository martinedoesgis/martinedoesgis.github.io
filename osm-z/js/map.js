//mapbox token
mapboxgl.accessToken = 'pk.eyJ1IjoibGVvLWlnYSIsImEiOiJjazY2bGV3MTYxMjV3M25sMmdtNWluM2wzIn0.2THSqD6nz9OhE0Xsjnbw1g';

//map
var map = new mapboxgl.Map({
	style: 'mapbox://styles/leo-iga/ckhko3ln90u2v1arr8ix4fwhm',
	center: [5.92033,45.56620],
	zoom: 18,
	pitch: 45,
	maxPitch:45,
	minZoom:17,
	maxZoom:20,
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

