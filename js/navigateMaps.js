




//*********************************************************** 
//  Zooms to given feature on detail map
//
// Input: OpenLayers feature object
//*********************************************************** 

function zoomToFeature(feature){
	var center = feature.geometry.getBounds().getCenterLonLat();
	center.lon = center.lon + 350;
	detailMap.setCenter(center, 8, false, true); 
	center.lon = center.lon -  350; 
}
