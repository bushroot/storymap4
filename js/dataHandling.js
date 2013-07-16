
// Proxy for cross domain data access
// OpenLayers.ProxyHost= "../../../../cgi-bin/proxy.cgi?url=";

var format = new OpenLayers.Format.XML();

OpenLayers.Request.GET({
	//url: "http://www.hydrodaten.admin.ch/lhg/SMS.xml",
	url: "data/sms.xml",
	success: function(request) {
		console.log(request);
		xml = format.read(request.responseText);
		console.log(xml);
	},
	failure: function(request) {
		console.log(request);
	}
});







