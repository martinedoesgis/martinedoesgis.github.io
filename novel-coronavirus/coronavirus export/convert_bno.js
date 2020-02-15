const DOMParser = require('xmldom').DOMParser;
const fs = require('fs')
const togeojson = require('@mapbox/togeojson')
const { Parser } = require('json2csv');

function containsObject(obj, list) {
    var i;
    for (i = 0; i < list.length; i++) {
        if (list[i] === obj) {
            return true;
        }
    }

    return false;
}

var features = []
var dates = []

fs.readdir('exports/bno/kml', function(err, files) {
	for (var i in files){
		var kml = new DOMParser().parseFromString(fs.readFileSync('exports/bno/kml/'+files[i], 'utf8'));
		var converted = togeojson.kml(kml);
		for (var y in converted.features){
			getInfo(converted.features[y],files[i])
			
		}
	}
	joinFeatures(features,dates[dates.length-1])
}) 

function invertDate(date){
	var d = date.split("-")
	return d[2]+"-"+d[1]+"-"+d[0]
}


function joinFeatures(features,maxDate){
	var base = []
	for (var i in features){
		if (features[i].properties.date == maxDate){ // creating the list from last date
			var casesField = "confirmedcases_"+invertDate(features[i].properties.date)+""
			var deathsField = "deaths_"+invertDate(features[i].properties.date)+""
			var data = {
				'city': features[i].properties.name,
				'Latitude': features[i].geometry.coordinates[0],
				'Longitude': features[i].geometry.coordinates[1]
			};
			data[casesField] = features[i].properties.cases
			data[deathsField] = features[i].properties.deaths
			base.push(data)
		}
	}
	
	for (var i in features){
		if (features[i].properties.date != maxDate){ // other dates
			for (var y in base){
				var b = base[y]
				//unique id based on coordinates, not ideal
				if (base[y].Latitude == features[i].geometry.coordinates[0] && base[y].Longitude == features[i].geometry.coordinates[1]){
					var casesField = "confirmedcases_"+invertDate(features[i].properties.date)+""
					var deathsField = "deaths_"+invertDate(features[i].properties.date)+""
					b[casesField] = features[i].properties.cases
					b[deathsField] = features[i].properties.deaths
				}
			}
		}
	}
	var parser = new Parser();
	var csv = parser.parse(base);
	fs.writeFile('exports/bno/csv/data_'+maxDate+'.csv', csv, function (err) {
		if (err) throw err;
		console.log('CSV saved!');
	});
}




function getInfo(f,file){
	var name = f.properties.name
	if(f.geometry.coordinates.length == 3){ //keeping only points (3 because XYZ in KML)
		if (name !== "Meaning of colors"){ //removing points they put to explain colors
			var nameSplit = name.split(']')
			var name2 = nameSplit[1].replace(/(\r\n|\n|\r)/gm, "");
			nameSplit = nameSplit[0].split("-")
			if (nameSplit[1]){
				nameSplit = nameSplit[1].split('/')
				var cases = Number(nameSplit[0].replace(',',''));
				var deaths = 0
				if(nameSplit[1]){
					deaths = Number(nameSplit[1].replace(',',''));
				}
				var date = file.split(' ')
				date = date[0]
				var isDateinArray = containsObject(date,dates)
				if (isDateinArray){}
				else{dates.push(date)}
				//console.log(date,name2, cases,deaths, f.geometry.coordinates[0],f.geometry.coordinates[1])
				var feature = {
					  "type": "Feature",
					  "properties": {
						  "name": name2,
						  "date" : date,
						  "cases" : cases,
						  "deaths" : deaths
					  },
					  "geometry": {
						"type": "Point",
						"coordinates": [
						  f.geometry.coordinates[1],
						  f.geometry.coordinates[0]
						]
					}
				}
				features.push(feature)
			}
		}
	}
	
}