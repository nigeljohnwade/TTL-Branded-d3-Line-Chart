define( [], function () {
    'use strict';
    var dimensions = {
        uses: "dimensions",
        min: 1,
        max: 1
    };
    var measures = {
        uses: "measures"
    };
    var sorting = {
        uses: "sorting"
    }
    var chartTitle = {
        ref: "ttl-linechart-props.chartTitle",
        label: "Chart Title",
        type: "string"
    };
    var captionText = {
        ref: "ttl-linechart-props.captionText",
        label: "Caption Text",
        type: "string",
        component: "textarea"
    };
    var displayLegend = {
        ref: "ttl-linechart-props.displayLegend",
        label: "Display Legend?",
        type: "boolean",
        defaultValue: false
    }
    var legendPosition = {
        ref: "ttl-linechart-props.legendPosition",
        component: "dropdown",
        label: "Legend Position",
        type: "string",
        options: [{
                value: "e",
                label: "East"
            },{
                value: "w",
                label: "West"
            }],
    };        
    var customSection = {
        component: "expandable-items",
        label: "Labels",
        items: {
            chartTile: chartTitle,
            captionText: captionText,
            displayLegend: displayLegend,
            legendPosition: legendPosition
        }
    };
    return {
        type: "items",
        component: "accordion",
        items: {
            dimensions: dimensions,
            measures: measures,
            customSection: customSection
        }
    };
})