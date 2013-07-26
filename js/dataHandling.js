
// Proxy for cross domain data access
// OpenLayers.ProxyHost= "../../../../cgi-bin/proxy.cgi?url=";




//***********************************************
// Get XML file
//***********************************************

var format = new OpenLayers.Format.XML();
OpenLayers.Request.GET({
	//url: "http://www.hydrodaten.admin.ch/lhg/SMS.xml",
	url: "data/sms.xml",
	success: function(request) {
		xml = format.read(request.responseText).documentElement;
		filterStations(xml);
	},
	failure: function(request) {
		console.log("XML loading failed!");
	}
});

/*
//check if the first node is an element node
function getfirstchild(n)	{
	x=n.firstChild;
	while (x.nodeType!=1){
  		x=x.nextSibling;
  	}
	return x;
}
*/

//***********************************************
// reduce XML data to warmes measurments (output JSON) 
//***********************************************


var selection = new Array();
var idSelection = new Array();

function filterStations(xml){
	var tempRecords = new Array();
	var records = xml.getElementsByTagName("MesPar");
	for (var i =0; i < records.length; i++){
	
		// get the all records that measure the water temperature
		var typvalue = records[i].getAttributeNode("Typ").nodeValue;	

		// get the required values from the records and write to array
		if (typvalue == 03){
			// get values
			var strnr = records[i].getAttributeNode("StrNr").nodeValue;	
			var temp = records[i].childNodes[7].childNodes[0].nodeValue;
			// add value to array
			var rec = new Object();
			rec.strnr = parseInt(strnr);
			rec.temp = parseFloat(temp);	
			tempRecords.push(rec);
		}
	}
	// sord the measurement stations accorging to the measured water temperature
	tempRecords = tempRecords.sort(function(a,b){return b.temp - a.temp});
	// reduce array to n bigges records	
	for (var j=0; j<25; j++ ) {
		var x = tempRecords[j]	
		selection.push(x);
	}
	for (var j=0; j<selection.length; j++){
		idSelection[j] = selection[j].strnr;
	}

}









