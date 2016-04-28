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
    var displayPoints = {
        ref: "ttl-linechart-props.displayPoints",
        type: "boolean",
        label: "Dsiplay Points?",
        defaultValue: false
    };
    var pointRadius = {
        ref: "ttl-linechart-props.pointRadius",
        type: "number",
        label: "Point Radius",
        component: "slider",
        defaultValue: 0,
        min: 0,
        max: 10
    }
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
    var appearanceSection = {
        component: "expandable-items",
        label: "Apearance",
        items:{
            displayPoints: displayPoints,
            pointRadius: pointRadius
        }
    };
    return {
        type: "items",
        component: "accordion",
        items: {
            dimensions: dimensions,
            measures: measures,
            sorting: sorting,
            customSection: customSection,
            appearanceSection: appearanceSection
        }
    };
})