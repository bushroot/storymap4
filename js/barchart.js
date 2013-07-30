
function loadChart(){

	var data = selection;

	var svgWidth = $('#barChart').width();
	var svgHeight = $("#barChart").height(); 
	var barPadding = 5;

	// add svg variale to chart div
	 var svg= d3.select('#barChart').append('svg').attr({
		'id': "svgChart",
		'width': svgWidth,
		'height': svgHeight 
	});


		// define scale of x-axis
		var xScale = d3.scale.linear().domain([0, data.length]).range([0, svgWidth]);
		
		// define scale of y-axis
		var padding = 5; 
		var yScale = d3.scale.linear().domain([0, d3.max(data, function(datum) {
			return datum.temp;
		})]).rangeRound([svgHeight-padding,padding]);


/*
    
		// set up yAxis 
		var yAxis = d3.svg.axis()
			.scale(yScale)
			.orient("rightdth: 100%;                 ")
			.ticks(5)
			;
        
		svg.append("g")
			.attr("class", "axis")
			.attr("transform", "translate(" + 0 + ",0)") 
			.call(yAxis);
	
*/
	
	dataset = svg.selectAll("rect").data().length; 
	bars = svg.selectAll("rect")
		.data(data).enter()
		.append("svg:rect")
		.attr("x", function(datum, index) { return xScale(index);})
		.attr("y", function(datum) { return yScale(datum.temp);  })
		.attr("height", function(datum) { return svgHeight - yScale(datum.temp); })
		.attr("width", svgWidth / data.length * 0.6)
		.attr("id", function(datum, i) { return "rect-" + datum.strnr; })
		.attr("fill", fillColor)
		.attr("class","bar")
		.attr("cursor", "pointer")	
		.on("click",function (d,i){
			var barId = data[i].strnr;
			previousId = selectedId;
			selectedId = barId;
			changeStation(selectedId);
			overviewMap.zoomToMaxExtent();	
/*
			fid = dataset[i].reservoir_stabil_id;
			ii = i;
			getObjectinfo(fid);				
			zoomToFeature(fid);	
			selectOverviewFeature(fid);
			highlightBar(fid);	
			$("#rank").text(ii+1);
			var cl  =  "#rect-" + dataset[i].reservoir_stabil_id;
			$(cl).tipsy('show');
	
*/
		})
	

			highlightBar(selectedId);
	
//		$(".bar").tooltip();
/*

		$(".bar").tipsy({
			trigger:' manual', 
			gravity: 's',
			html: true,
			title: function(){
				var name = dataset[ii].damname;
				var number = dataset[ii].damheight;
				return '<h1 class="tips" >' + name + '<br>' + number + ' m  </h1>';
			}
		});
	});
	
	
*/


}



//***********************************************
// Change color of clicked bar
// 
// Input: id of curently selected measure station {int}
//***********************************************

function highlightBar(selectedId){
	d3.select("#rect-" + selectedId).style("fill", highlightColor);
}



//***********************************************
// Change color of clicked bar
// 
// Input: id of the previously selected measur station {int}
//***********************************************

function unHighlightBar(previousId){
	d3.select("#rect-" + previousId).style("fill", fillColor);
}
