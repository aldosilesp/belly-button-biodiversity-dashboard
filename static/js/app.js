const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

d3.json(url).then(function(data) {
    console.log(data);
    let samplesAll = data.samples;
    console.log(samplesAll);
    let metadataAll = data.metadata;
    console.log(metadataAll);

    let ids = samplesAll.map(function(idFunction) {
        return idFunction.id
    });
    console.log(ids);

    for (let i = 0; i < ids.length; i++) {
        var option = document.createElement("option");
        option.text = ids[i];
        option.value = ids[i];
        var select = document.getElementById("selDataset");
        select.appendChild(option);
    };

    function init () {

        function selectInitId (selected_id) {
            return selected_id.id == 940;
        }
        let selectedSampleInit = samplesAll.filter(selectInitId);
        console.log(selectedSampleInit);

            let sortedSampleInit = selectedSampleInit.sort((a, b) => (b.sample_values - a.sample_values))
            console.log(sortedSampleInit);

            let sortedInitValues = sortedSampleInit.map(function(initValuesFunction) {
                return initValuesFunction.sample_values
            });
            console.log(sortedInitValues); 

            let sortedInitOtuIds = sortedSampleInit.map(function(initOtuIdsFunction) {
                return initOtuIdsFunction.otu_ids
            });
            console.log(sortedInitOtuIds); 

            let sortedInitOtuLabels = sortedSampleInit.map(function(initOtuLabelsFunction) {
                return initOtuLabelsFunction.otu_labels
            });
            console.log(sortedInitOtuLabels); 

            slicedInitSampleValues = sortedInitValues[0].slice(0, 10);
            slicedInitOtuIds = sortedInitOtuIds[0].slice(0, 10);
            slicedInitOtuLabels = sortedInitOtuLabels[0].slice(0, 10);

            console.log(slicedInitSampleValues);
            console.log(slicedInitOtuIds);
            console.log(slicedInitOtuLabels);

            reversedInitSampleValues = slicedInitSampleValues.reverse();
            reversedInitOtuIds = slicedInitOtuIds.reverse();
            reversedInitOtuLabels = slicedInitOtuLabels.reverse();

            console.log(reversedInitSampleValues);

            function selectInitMetadata (selected_metadata_id) {
                return selected_metadata_id.id == 940;
            }
            let selectedMetadataInit = metadataAll.filter(selectInitMetadata);
            console.log(selectedMetadataInit);

            let metadataFrameInit = d3.select(".metadata-content");
            console.log(metadataFrameInit);

            metadataFrameInit.text(JSON.stringify(selectedMetadataInit, null, 2));

            let trace1 = {
                x: reversedInitSampleValues,
                y: reversedInitOtuIds,
                text: reversedInitOtuLabels,
                name: "Belly Button Biodiversity",
                type: "bar",
                orientation: "h"
            };
            
            // Data array
            // `data` has already been defined, so we must choose a new name here:
            let traceData = [trace1];
            
            // Apply a title to the layout
            let layout = {
                title: "Belly Button Biodiversity",
                margin: {
                l: 100,
                r: 100,
                t: 100,
                b: 100
                },
                height: 600,
                width: 1600
            };
            
            // Render the plot to the div tag with id "plot"
            // Note that we use `traceData` here, not `data`
            Plotly.newPlot("plot", traceData, layout);

            let bubbleTrace = {
                x: slicedInitOtuIds,
                y: slicedInitSampleValues,
                text: slicedInitOtuLabels,
                mode: 'markers',
                marker: {
                    color: slicedInitOtuIds,
                    size: slicedInitSampleValues
                }
                };
                
                let bubbleData = [bubbleTrace];
                
                let bubbleLayout = {
                title: 'Belly Button Biodiversity',
                showlegend: false,
                height: 600,
                width: 1600
                };
                
                Plotly.newPlot("bubble-plot", bubbleData, bubbleLayout);
    };

    d3.selectAll("#selDataset").on("change", updateChart);

    function updateChart(){

        let dropdownMenu = d3.select("#selDataset");
    
        let dataset = dropdownMenu.property("value");

        function selectId (selected_id) {
            return selected_id.id == dataset;
        }
        let selectedSample = samplesAll.filter(selectId);
        console.log(selectedSample);

        function selectMetadata (selected_metadata_id) {
            return selected_metadata_id.id == dataset;
        }
        let selectedMetadata = metadataAll.filter(selectMetadata);
        console.log(selectedMetadata);

        let metadataFrame = d3.select(".metadata-content");
        console.log(metadataFrame);
        metadataFrame.text(JSON.stringify(selectedMetadata, null, 2));

        let sortedSample = selectedSample.sort((a, b) => (b.sample_values - a.sample_values))
            console.log(sortedSample);

        let sortedValues = sortedSample.map(function(valuesFunction) {
            return valuesFunction.sample_values
        });
        console.log(sortedValues); 

        let sortedOtuIds = sortedSample.map(function(otuIdsFunction) {
            return otuIdsFunction.otu_ids
        });
        console.log(sortedOtuIds); 

        let sortedOtuLabels = sortedSample.map(function(otuLabelsFunction) {
            return otuLabelsFunction.otu_labels
        });
        console.log(sortedOtuLabels); 

        slicedSampleValues = sortedValues[0].slice(0, 10);
        slicedOtuIds = sortedOtuIds[0].slice(0, 10);
        slicedOtuLabels = sortedOtuLabels[0].slice(0, 10);

        console.log(slicedSampleValues);
        console.log(slicedOtuIds);
        console.log(slicedOtuLabels);

        reversedSampleValues = slicedSampleValues.reverse();
        reversedOtuIds = slicedOtuIds.reverse();
        reversedOtuLabels = slicedOtuLabels.reverse();

        console.log(reversedSampleValues);

        let trace1 = {
            x: reversedSampleValues,
            y: reversedOtuIds,
            text: reversedOtuLabels,
            name: "Belly Button Biodiversity",
            type: "bar",
            orientation: "h"
        };
        
        // Data array
        // `data` has already been defined, so we must choose a new name here:
        let traceData = [trace1];
        
        // Apply a title to the layout
        let layout = {
            title: "Belly Button Biodiversity",
            margin: {
            l: 100,
            r: 100,
            t: 100,
            b: 100
            },
            height: 600,
            width: 1600
        };
        
        // Render the plot to the div tag with id "plot"
        // Note that we use `traceData` here, not `data`
        Plotly.newPlot("plot", traceData, layout);

        let bubbleTrace = {
            x: slicedOtuIds,
            y: slicedSampleValues,
            text: slicedOtuLabels,
            mode: 'markers',
            marker: {
                color: slicedOtuIds,
                size: slicedSampleValues
            }
            };
            
            let bubbleData = [bubbleTrace];
            
            let bubbleLayout = {
            title: 'Belly Button Biodiversity',
            showlegend: false,
            height: 600,
            width: 1600
            };
            
            Plotly.newPlot("bubble-plot", bubbleData, bubbleLayout);


    }

    init();
});