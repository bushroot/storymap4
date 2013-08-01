


// reset with of div that are defined when toggle the view in the mobile view
$(window).resize (function makeDefaultCss() {
	var omcwidth = document.getElementById("overviewMapContainer").style.width;
	if ((omcwidth != '""') && ($(window).width() > 760)) {
		document.getElementById("overviewMapContainer").style.width = "";
		document.getElementById("barChartContainer").style.width = "";
		$("#barChartContainer").css({"visibility": "visible"});
	}
	var dmcwidth = document.getElementById("detailMapContainer").style.width;
	if ((dmcwidth != '""') && ($(window).width() > 760)) {
		document.getElementById("detailMapContainer").style.width = "";
		document.getElementById("objectInfoContainer").style.width = "";
		$("#objectInfoContainer").css({"visibility": "visible"});
	}    
})




function changeToDetails(){
	$("#overviewMapContainer").width("0%");
	$("#detailMapContainer").width("100%");
	detailMap.destroy();
	loadDetailMap();	
	$("#barChartContainer").width("0%");
	$("#barChartContainer").css({"visibility": "hidden"});
	$("#objectInfoContainer").width("100%");
	$("#objectInfoContainer").css({"visibility": "visible"});
}


function changeToOverview(){
	$("#overviewMapContainer").width("100%");
	$("#detailMapContainer").width("0%");
	overviewMap.destroy();
	loadOverviewMap();	
	$("#barChartContainer").width("100%");
	$("#barChartContainer").css({"visibility": "visible"});
	$("#objectInfoContainer").width("0%");
	$("#objectInfoContainer").css({"visibility": "hidden"});
	
}

