define([
    "./legend",
    ], function(
        legend
    ){
    return{
        drawLineChart: function(data, labels, target, container, layout){
            var props = layout["ttl-linechart-props"];
            var colors = [
                '#1f78b4','#33a02c','#e31a1c','#ff7f00','#6a3d9a','#b15928',
                '#62a3d0','#72bf5b','#ef5a5a','#fe9f37','#9a77b8','#d8ac60',
                '#a6cee3','#b2df8a','#fb9a99','#fdbf6f','#cab2d6','#ffff99'
            ]; 
            var width = container.width(),
                height = container.height(),
                legendWidth = 0,
                chartTitleHeight = 0,
                captionTextHeight = 0,
                topPadding = 0,
                bottomPadding = 0,
                leftPadding = 0,
                rightPadding = 0,
                xAxisHeight = 0,
                yAxisWidth = 0;
                
            var _dataCollate = {max:[], length:[]};
            $.each(data, function(idx, elem){
                _dataCollate.max.push(d3.max(elem.map(function(elem2){ return elem2.value})));
                _dataCollate.length.push(elem.length)
            });
            
            if(props.displayLegend){
                legend.drawLegend(data, labels, colors, container, layout);
                legendWidth = $('.legend', container).width();
            }
            
            var containerSelection = d3.select(container[0]);
            
            var chart = containerSelection.append("svg")
                .attr("width", width - legendWidth)
                .attr("height", height)
                .html("")
                .attr("class", target);
            
            if(props.chartTitle && props.chartTitle.length > 0){
                var chartTitle = chart.append("text")
                    .classed("chart-title", true)
                    .text(function(d, i){
                        return props.chartTitle
                    })
                    .attr("y", function(d, i){
                        return this.offsetHeight;
                    });
                chartTitleHeight = chartTitle[0][0].offsetHeight;
            }
            if(props.captionText && props.captionText.length > 0){
                var captionText = chart.append("text")
                    .classed("caption-text", true)
                    .text(function(d, i){
                        return props.captionText;
                    })
                    .attr("y", function(d, i){
                        return this.offsetHeight + chartTitleHeight;
                    });
                captionTextHeight = captionText[0][0].offsetHeight;
            }
            

            var x = d3.scale.linear()
                .range([0, width - legendWidth]);
            x.domain([0, d3.max(_dataCollate.length)]);
            var x_axis = d3.svg.axis().scale(x);
            var axis_x = d3.select("svg")
                .append("g")
                .attr("class", "x axis")
                .call(x_axis);
            xAxisHeight = axis_x[0][0].getBBox().height;
             
            var plotHeight = height - chartTitleHeight - captionTextHeight - topPadding - bottomPadding - xAxisHeight;
            
            var y = d3.scale.linear()
                .range([plotHeight, 0]);
            y.domain([0, d3.max(_dataCollate.max)]);
            var y_axis = d3.svg.axis().scale(y).orient("left");
            var axis_y = d3.select("svg")
                .append("g")
                .attr("class", "y axis")
                .call(y_axis);
            yAxisWidth = axis_y[0][0].getBBox().width; 
            axis_x.remove();
            
            x = d3.scale.linear()
                .range([0, width - legendWidth - yAxisWidth]);
            x.domain([0, d3.max(_dataCollate.length)]);
            x_axis = d3.svg.axis().scale(x);
            axis_x = d3.select("svg")
                .append("g")
                .attr("class", "x axis")
                .call(x_axis);
                
            axis_x.attr("transform", "translate(" + yAxisWidth + "," + (height - bottomPadding - xAxisHeight) + ")");
            axis_y.attr("transform", "translate(" + yAxisWidth + ", "  + (chartTitleHeight + captionTextHeight + topPadding) + ")");
            
            var plotWidth = width - yAxisWidth - leftPadding - rightPadding;

            var line = d3.svg.line()
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
                    return line((d.map(function(elem){return elem.value}))); 
                })
                .attr("stroke-width", "1px")
                .attr("stroke", function(d, i){
                    return colors[i];
                })
                .attr("fill", "none");
                
            series.attr("transform", function(){
                    return "translate(" + yAxisWidth + ", " + (chartTitleHeight + captionTextHeight + topPadding) + ")"
                });
            if(props.displayPoints){
                for(var i = 0 ; i < data.length ; i++){
                    var points = chart.selectAll(".points")
                        .data(data[i])
                        .enter()
                        .append("circle")
                        .attr("cx", function(d, idx){
                            return x(idx);
                        })
                        .attr("cy", function(d, idx){
                            return y(d.value);
                        })
                        .attr("r", function(d, idx){
                            return props.pointRadius;
                        })
                        .attr("stroke", function(d, idx){
                            return colors[i];
                        })
                        .attr("transform", function(){
                            return "translate(" + yAxisWidth + ", " + (chartTitleHeight + captionTextHeight + topPadding) + ")"
                        })
                        .append("title")
                        .text(function(d, idx){
                            return [d.name, ": ", d.value, " (", labels[i], ")"].join('');
                        });
                }
            }
                
            if(props.displayLegend && props.legendPosition === 'w'){
                chart.style("transform", "translateX(" + legendWidth + "px)");
            }        
        }
    }
});