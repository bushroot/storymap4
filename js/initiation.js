
function afterDataLoad(){
		loadDetailMap();
		setTimeout(function(){loadOverviewMap(),600});
		setTimeout(function(){displayObjectData(selectedId)},800);
		setTimeout(function(){loadChart(),800});
		}


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
