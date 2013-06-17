

function mapLoad() {

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

	// create detail map 
	detailMap = new GeoAdmin.Map("detailMap", {
		doZoomToMaxExtent: true //delete this line
	});

	// create overview map 
	overviewMap = new GeoAdmin.Map("overviewMap", {
		doZoomToMaxExtent: true
	});

	// change base layer of overview map
	overviewMap.switchComplementaryLayer("ch.swisstopo.pixelkarte-grau", {
		opacity: 1
	});





}
