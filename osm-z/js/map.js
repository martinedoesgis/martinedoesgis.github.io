//mapbox token
mapboxgl.accessToken = 'pk.eyJ1IjoibGVvLWlnYSIsImEiOiJjazY2bGV3MTYxMjV3M25sMmdtNWluM2wzIn0.2THSqD6nz9OhE0Xsjnbw1g';

//map
var map = new mapboxgl.Map({
	style: 'mapbox://styles/leo-iga/ckhko3ln90u2v1arr8ix4fwhm',
	center: [-74.0018,40.7193],
	zoom: 18,
	pitch: 45,
	maxPitch:45,
	minZoom:18,
	maxZoom:20,
	dragPan: false,
	bearing: -17.6,
	container: 'map',
	antialias: true
});

