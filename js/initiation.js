/*
function afterDataLoad(){
		loadDetailMap();
		loadOverviewMap();
//		displayObjectData(selectedId);
//		loadChart();
}		
*/


function afterDataLoad() {
	loadOverviewMap(afterLoadOverviewMap);
}


function afterLoadOverviewMap() {
	addNames(afterAddName);
}


function afterAddName() {
	loadDetailMap(afterLoadDetailMap);
}

function afterLoadDetailMap() {
	displayObjectData(selectedId);
	afterLoadChart();
//	selectDetailFetureFromId(selectedId);
//	selectOverviewFetureFromId(selectedId);

}


function afterLoadChart(){
	loadChart(selectDetailFeatureFromId(selectedId));
	firstLoad = false;
}

			//displayObjectData(selectedId);




function initiation(){

	if ( $.browser.msie && $.browser.version <= 8) {
		$('div#mainContent').replaceWith(
			'<div class="browserError">'
				+'<h1>Incompatible Browser</h1>'
				+ '<p>Please update your browser or use different modern web browser!</p>'
			+'</div)');
	}
	else{
		loadXmlData(afterDataLoad);
	}

}
