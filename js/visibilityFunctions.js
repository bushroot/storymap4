

// does not work! change variable in css instead!
function toggleElements(id){
	document.getElementById(id).style.display = "inline";
    ide = id.toString(); 
	for (i=0;i<elements.length;i++){
		if (elements[i] != ide){
			document.getElementById(elements[i]).style.display = "hidden";
		}		
	}
}




var elements = new Array("overviewMapSpan", "detailMapSpan", "objectInfo", "barChart");
//	document.getElementById("overviewMapSpan").style.display = "none";



