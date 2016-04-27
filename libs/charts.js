define([
    "./legend",
    ], function(
        legend
    ){
    return{
        drawLineChart: function(data, labels, target, container, layout){
            var colors = [
                '#1f78b4','#33a02c','#e31a1c','#ff7f00','#6a3d9a','#b15928',
                '#62a3d0','#72bf5b','#ef5a5a','#fe9f37','#9a77b8','#d8ac60',
                '#a6cee3','#b2df8a','#fb9a99','#fdbf6f','#cab2d6','#ffff99'
            ]; 
            var width = container.width(),
                height = container.height(),
                legendWidth = 0;

            if(layout["ttl-linechart-props"].displayLegend){
                legend.drawLegend(data, labels, colors, container, layout);
                legendWidth = $('.legend', container).width();
            }
            
            var y = d3.scale.linear()
                .range([height, 0]);
            var x = d3.scale.linear()
                .range([0, width - legendWidth]);
                
            var containerSelection = d3.select(container[0]);

            var chart = containerSelection.append("svg")
                .attr("width", width - legendWidth)
                .attr("height", height)
                .html("")
                .attr("class", target);
                
            var _dataCollate = {max:[], length:[]};
            $.each(data, function(idx, elem){
                _dataCollate.max.push(d3.max(elem));
                _dataCollate.length.push(elem.length)
            });
            
            y.domain([0, d3.max(_dataCollate.max)]);
            x.domain([0, d3.max(_dataCollate.length)]);

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
                
            if(layout["ttl-linechart-props"].displayLegend && layout["ttl-linechart-props"].legendPosition === 'w'){
                chart.style("transform", "translateX(" + legendWidth + "px)");
            }        
        }
    }
});