const request = require('request')
const fs = require('fs')
const cheerio = require('cheerio')
const cron = require("node-cron");

var date = new Date().toISOString().
  replace(/T/, ' ').      // replace T with a space
  replace(/\..+/, '').     // delete the dot and everything after
  replace(/:/, '-').       // replace : by -
  replace(/:/, '-')
  
console.log("Export time: "+date)

request({uri:'https://3g.dxy.cn/newh5/view/pneumonia'},
	function(error,response,body){
		var data = body
		data = data.substring(data.indexOf("window.getAreaStat = ") + 21);
		data = data.substring(0, data.indexOf('}catch(e)'));
		fs.writeFile('exports/dxy/html/'+date+'.html', body, function (err) {
		  if (err) throw err;
			 console.log('DXY html saved!'); 
		});
		fs.writeFile('exports/dxy/data/'+date+'.json', data, function (err) {
		  if (err) throw err;
			 console.log('DXY data saved!'); 
		});
	
})

request({uri:'https://www.google.com/maps/d/kml?mid=1a04iBi41DznkMaQRnICO40ktROfnMfMx&forcekml=1'},
	function(error,response,body){
		fs.writeFile('exports/bno/kml/'+date+'.kml', body, function (err) {
		  if (err) throw err;
		  console.log('BNO KML saved!');
		});
	
})

request({uri:'https://bnonews.com/index.php/2020/01/timeline-coronavirus-epidemic/'},
	function(error,response,body){
		fs.writeFile('exports/bno/html/history/'+date+'.html', body, function (err) {
		  if (err) throw err;
		  console.log('BNO history saved!');
		});
	
})

request({uri:'https://bnonews.com/index.php/2020/02/the-latest-coronavirus-cases/'},
	function(error,response,body){
		fs.writeFile('exports/bno/html/latest/'+date+'.html', body, function (err) {
		  if (err) throw err;
		  console.log('BNO latest saved!');
		});
	
})
