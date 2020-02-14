const chart_config = given_data =>
{
    const male_chart = {
        type: "XYChart",
        paddingRight: 0,
        data: given_data,
        yAxes: [{
            type: "CategoryAxis",
            dataFields: {
                category: "age"
            },
            renderer: {
                grid: {
                    template: { location: 0 }
                },
                minGridDistance: 15,
            }
        }],
        xAxes: [{
            type: "ValueAxis",
            strictMinMax: true,
            renderer: {
                inversed: true,
            },
        }],
        series: [{
            type: "ColumnSeries",
            dataFields: {
                valueX: "male",
                categoryY: "age",
            },
            columns: {
                template: {
                    tooltipText: "男性{categoryY}: {valueX} "
                },
            },
        }]
    };
    const female_chart = {
        type: "XYChart",
        paddingRight: 0,
        data: given_data,
        yAxes: [{
            type: "CategoryAxis",
            dataFields: {
                category: "age"
            },
            renderer: {
                grid: {
                    template: { location: 0 }
                },
                minGridDistance: 15,
            }
        }],
        xAxes: [{
            type: "ValueAxis",
            strictMinMax: true,
            renderer: {
                inversed: false,
                minLabelPosition: 0.01
            },
        }],
        series: [{
            type: "ColumnSeries",
            dataFields: {
                valueX: "female",
                categoryY: "age",
            },
            columns: {
                template: {
                    tooltipText: "女性{categoryY}: {valueX}"
                },
            },
            fill: "pink",
            stroke: "pink"
        }]
    };
    return [ male_chart, female_chart ];
};

export default chart_config;