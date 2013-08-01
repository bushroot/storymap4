

//********************************************************
// 				Variables
//********************************************************


// define colors	
var	fillColor = "#2d578b";
var	highlightColor = "red";

// create style map for vector layer     
var styleMap = new OpenLayers.StyleMap({
	'default': {
        pointRadius: 6,
		fillColor: fillColor,
		fillOpacity: 0.4,
		strokeColor: fillColor,
		strokeOpacity: 1,
		strokeWidth: 2,
		cursor: "pointer"
	},
	"select": {
        pointRadius: 6,
		fillColor: highlightColor,
		fillOpacity: 0.4,
		strokeColor: highlightColor,
		strokeOpacity: 1,
		strokeWidth: 2,
		cursor: "pointer"
	}
});



//*********************************************************** 
// Build and load detail map
//
//*********************************************************** 

// filter the loaded features according to the selected measure stations
function buildFilterStrategy(idSel)	{
	filterStrategy = new OpenLayers.Strategy.Filter({
		filter: new OpenLayers.Filter.DataId({
			fids: idSel
		})
	
	})
	return filterStrategy;
}

var filterStrategy = buildFilterStrategy(idSelection);

function loadDetailMap(){ 

	// create detail map 
	detailMap = new GeoAdmin.Map("detailMap", {
		doZoomToMaxExtent: true //delete this line
	});


	// create vecotr layer containing hydrological measurement stations
	detailLayer = new OpenLayers.Layer.Vector("detailStations", {
		styleMap: styleMap,
		strategies: [filterStrategy, new OpenLayers.Strategy.Fixed()],
		protocol: new OpenLayers.Protocol.HTTP({
			url: "data/hydromessstationen.geojson",
			format: new OpenLayers.Format.GeoJSON()
		})
	});

	// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	detailMap.removeControl(detailMap.controls[4]);
	
	//add vector to detail map 
	detailMap.addLayers([detailLayer]);


}


//*********************************************************** 
// Build and load detail map
//
//*********************************************************** 

function loadOverviewMap() {
	// filter the loaded features according to the selected measure stations
	filterStrategy = new OpenLayers.Strategy.Filter({
		filter: new OpenLayers.Filter.DataId({
			fids: idSelection
		})
	})

	// create overview map 
	overviewMap = new GeoAdmin.Map("overviewMap", {
		doZoomToMaxExtent: true
	});

	// change base layer of overview map
	overviewMap.switchComplementaryLayer("ch.swisstopo.pixelkarte-grau", {
		opacity: 1
	});

	// create vecotr layer containing hydrological measurement stations
	overviewLayer = new OpenLayers.Layer.Vector("overviewStations", {
		styleMap: styleMap,
		strategies: [filterStrategy, new OpenLayers.Strategy.Fixed()],
			protocol: new OpenLayers.Protocol.HTTP({
			url: "data/hydromessstationen.geojson",
			format: new OpenLayers.Format.GeoJSON()
		})
	});
	
	// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	overviewMap.removeControl(overviewMap.controls[4]);
	
	//add vector to overview map
	overviewMap.addLayers([overviewLayer]);

	//create select feature control  
	selectFeature = new OpenLayers.Control.SelectFeature(overviewMap,{
		clickout: false,	
		hover: false
	});
	
	// add select control to main map
	overviewMap.addControl(selectFeature);
	
	overviewLayer.events.on({
		'loadend': function(evt){
			zoomToFeature(selectedId);
			displayObjectData(selectedId);
		},
		'featureselected': function(evt){
			//zoomToFeature(2415);
			//displayObjectData(2415);	
		}
	})


}



//*********************************************************** 
//  Zooms to given feature on detail map
//
// Input: OpenLayers feature object
//*********************************************************** 

function zoomToFeature(selectedId){
	var feature = getFeatureFromId(selectedId);	
	var center = feature.geometry.getBounds().getCenterLonLat();
	center.lon = center.lon + 50;
	detailMap.setCenter(center, 10, false, true); 
	center.lon = center.lon -  50;
}




