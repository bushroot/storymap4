    




function changeCSS(cssFile, cssLinkIndex) {
	var oldlink = document.getElementsByTagName("link").item(cssLinkIndex);
	
	var newlink = document.createElement("link")
	newlink.setAttribute("rel", "stylesheet");
	newlink.setAttribute("type", "text/css");
	newlink.setAttribute("href", cssFile);
	
	document.getElementsByTagName("head").item(0).replaceChild(newlink, oldlink);
}




/*
// does not work! change variable in css instead!
var mapArrays = new Array("overviewMapSpan", "detailMapSpan");
function toggleElements(id){
	document.getElementById(id).style.width = "100%";
    ide = id.toString(); 
	for (i=0;i<elements.length;i++){
		if (elements[i] != ide){
			document.getElementById(elements[i]).style.width = "0%";
		}		
	}
}
*/
