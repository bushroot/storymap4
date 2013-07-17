
// Proxy for cross domain data access
// OpenLayers.ProxyHost= "../../../../cgi-bin/proxy.cgi?url=";

var format = new OpenLayers.Format.XML();

OpenLayers.Request.GET({
	//url: "http://www.hydrodaten.admin.ch/lhg/SMS.xml",
	url: "data/sms.xml",
	success: function(request) {
		xml = format.read(request.responseText).documentElement;
		console.log(xml);
		filterStations(xml);
	},
	failure: function(request) {
		console.log("XML loading failed!");
	}
});


//check if the first node is an element node
function getfirstchild(n)	{
	x=n.firstChild;
	while (x.nodeType!=1){
  		x=x.nextSibling;
  	}
	return x;
}



function filterStations(xml){
	
	var records = xml.getElementsByTagName("MesPar");
	for (var i =0; i < records.length; i++){
	
		// get the all records that measure the water temperature
		var typvalue = records[i].getAttributeNode("Typ").nodeValue;	
	
		// get the required values from the records
		if (typvalue == 03){
			var strnr = records[i].getAttributeNode("StrNr").nodeValue;	
			var temp = records[i].childNodes[7].childNodes[0].nodeValue;
		}
		
			



	}





}





















// Openlayer Filter !







