//***********************************************
// Define variables 
//***********************************************

var selection = new Array();
var idSelection = new Array();
var selectedId; 
var previousId;


//***********************************************
// Get XML file
// 
// Input: link to xml file
// Returns: xml (object)
//***********************************************


// Proxy for cross domain data access
// OpenLayers.ProxyHost= "../../../../cgi-bin/proxy.cgi?url=";

function loadXmlData(){
	var format = new OpenLayers.Format.XML();
	OpenLayers.Request.GET({
		//url: "http://www.hydrodaten.admin.ch/lhg/SMS.xml",
		url: "data/sms.xml",
		success: function(request) {
			xml = format.read(request.responseText).documentElement;
			filterStations(xml, afterDataLoad);
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

}


//***********************************************
// reduce XML data to warmes measurments (output JSON) 
//***********************************************


function filterStations(xml, callback){
	var tempRecords = new Array();
	var records = xml.getElementsByTagName("MesPar");
	for (var i =0; i < records.length; i++){
	
		// get all records that measure the water temperature
		var typvalue = records[i].getAttributeNode("Typ").nodeValue;	

		// get the required values from the records and write to array
		if (typvalue == 03){
			
			var date = new String();			
			var date = new String();			
			
			// get values
			var strnr = records[i].getAttributeNode("StrNr").nodeValue;	
			var temp = records[i].childNodes[7].childNodes[0].nodeValue;
			date = records[i].childNodes[3].childNodes[0].nodeValue;
			time = records[i].childNodes[5].childNodes[0].nodeValue;
			
			// add value to array
			var rec = new Object();
			rec.strnr = parseInt(strnr);
			rec.temp = parseFloat(temp);	
			rec.date = date;	
			rec.time = time;	
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

	// select random measurment station id
	selectedId = selectRandomId(idSelection);

callback();
}



///*********************************************************** 
//  Select a random id from measure station subset
//
// 	Input: ids of measure stations subset (Array)  
// 	Returns: id (int) 
///*********************************************************** 

function selectRandomId(idArray){
	var randomIdx = Math.floor(Math.random()*25);
	var id = idArray[randomIdx];
	return id; 
}
 


///*********************************************************** 
//  Get feature accoring to the "main" id (measuremen station id)
//
// 	Input: measurement station id {int} 
// 	Returns: OpenLayers feature object
//*********************************************************** 

function getFeatureFromId(id) {
	var features = detailLayer.getFeaturesByAttribute('edv_nr4', id);
 	var feature = features[0];
	return feature;
}



///*********************************************************** 
//  create an pbject containing all information  
//
// Returns: upsdated selection {array}
//*********************************************************** 

function createMatrix(){
	for(var i=0; i<selection.length; i++){
		var id = selection[i].strnr;
		var feature = getFeatureFromId(id);
		try {var name = feature.data['lhg_name'];} catch(err) {var name = "unknown"; }
		selection[i].name = name; 
	}
}




///*********************************************************** 
//  Get information of a measument from the xml file
//
// 	Input: measurement station id {int}, property {string} 
// 	Returns: temperature {float} 
//*********************************************************** 

function getPropertyFromId(id, property){
	for(var i=0; i<selection.length; i++){
		if (selection[i].strnr == id){
			var x = selection[i];
			var temp = x[property];
		}
	}
	return temp;
}



///*********************************************************** 
//  Get ranking of the temperature measurment 
//
// 	Input: measurement station id {int} 
// 	Returns: rank {int} 
//*********************************************************** 

function getRankFromId(id) {
	for(var i=0; i<selection.length; i++){
		if(selection[i].strnr == id){
			var rank = i + 1;
		}
	}
	return rank;
}

///*********************************************************** 
//  Get ranking of the temperature measurment 
//
// 	Input: measurement station id {int} 
// 	Returns: index {int} 
//*********************************************************** 

function getIndexFromId(id) {
	for(var i=0; i<selection.length; i++){
		if(selection[i].strnr == id){
			var index = i;
		}
	}
	return index;
}



///*********************************************************** 
//  Change data 
//
// 	Input: measurement station id {int} 
//*********************************************************** 

function changeStation(selectedId) {
	
	zoomToFeature(selectedId);
	displayObjectData(selectedId);		
	unHighlightBar(previousId);
	highlightBar(selectedId);
	$("#rect-" + previousId).tipsy('hide');
	$("#rect-" + selectedId).tipsy('show');


}




