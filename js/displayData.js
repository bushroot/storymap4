



//********************************************************
// 				Variables
//********************************************************

















//********************************************************
// 				Functions
//********************************************************



function getObjectData(id){
	var geoJsonData = overviewLayer.getFeaturesByAttribute("edv_nr4", id)[0].data;
//	var xmlData =  
	return geoJsonData;
//	return xmlData;
	
}












