function drawLineChart(data, target, container){
    var colors = [
        '#1f78b4','#33a02c','#e31a1c','#ff7f00','#6a3d9a','#b15928',
        '#62a3d0','#72bf5b','#ef5a5a','#fe9f37','#9a77b8','#d8ac60',
        '#a6cee3','#b2df8a','#fb9a99','#fdbf6f','#cab2d6','#ffff99'
    ]; 
    var width = container.width(),
        height = container.height();

    var y = d3.scale.linear()
        .range([height, 0]);
    var x = d3.scale.linear()
        .range([0, width]);
        
    var containerSelection = d3.select(container[0]);

    var chart = containerSelection.append("svg")
        .attr("width", width)
        .attr("height", height)
        .html("")
        .attr("class", target);
        
    y.domain([0, d3.max(data[0])]);
    x.domain([0, data[0].length]);

    var line = d3.svg.line()
        .interpolate("basis")
        .x(function(d, i) {
            return x(i); 
        })
        .y(function(d, i) {
            return y(d); 
        });
        
    var series = chart.selectAll(".series")
        .data(data)
        .enter().append("g")
        .attr("class", "series");

    series.append("path")
        .attr("class", "line")
        .attr("d", function(d, i) { 
            return line(d); 
        })
        .attr("stroke-width", "1px")
        .attr("stroke", function(d, i){
            return colors[i];
        })
        .attr("fill", "none");
}