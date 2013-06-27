
var data;

$(document).ready(function()
{
  $.ajax({
    type: "GET",
    url: "data/sms.xml",
    dataType: "xml",
    success: storeInVariable 
  });
});

function storeInVariable(xml){
	data = $(xml);
}


function parseXml(xml){
	$(xml).find("Name").each(function()
	{
		$("#xmlData").append($(this).attr("author") + "<br />");
	});
}

/*
var invocation = new XMLHttpRequest();
var url = "http://www.hydrodaten.admin.ch/lhg/";
 
/*  
function callOtherDomain() {
  if(invocation) {    
    invocation.open('GET', url, true);
    invocation.onreadystatechange = handler;
    invocation.send(); 
  }
}

callOtherDomain();
*/
/*
OpenLayers.ProxyHost= "proxy.cgi?url=";



/*if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
  xmlhttp=new XMLHttpRequest();
  }
else
  {// code for IE6, IE5
  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
xmlhttp.open("GET","http://www.hydrodaten.admin.ch/lhg/SMS.xml",false);
xmlhttp.send();
xmlDoc=xmlhttp.responseXML;*/
/*
var format = new OpenLayers.Format.XML();

OpenLayers.Request.GET({
	url: "http://www.hydrodaten.admin.ch/lhg/SMS.xml",
	success: function(request) {
		console.log(request);
		xml = format.read(request.responseText);
		console.log(xml);
	},
	failure: function(request) {
		console.log(request);
	}
});

*/
