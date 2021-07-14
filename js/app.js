// Get metadata from the samples.json file
function metadata(s) {
    d3.json("data/samples.json").then((d) => {
      var metadata= d.metadata;
      var setArray= metadata.filter(sObject => sObject.id == s);
      var result= setArray[0]

      // console.log(result);

      var demographic = d3.select("#sample-metadata");
      demographic.html("");
      Object.entries(result).forEach(([key, value]) => {
        demographic.append("h6").text(`${key}: ${value}`);
      });
    });
}

function buildGraphs(s) {

  // Building graphs with the selected sample
  d3.json("data/samples.json").then((d) => {
    var samples = d.samples;
    var setArray = samples.filter(b => b.id == s);
    var result = setArray[0]

    var ids = result.otu_ids;
    var labels = result.otu_labels;
    var values = result.sample_values;

    // console.log(ids);
    // console.log(labels);
    // console.log(values);
    
    //  Bar Chart
    var trace1 = [
      {
        x: values.slice(0, 10).reverse(),
        y: ids.slice(0, 10).map(otu => `OTU ${otu}`).reverse(),
        text: labels.slice(0, 10).reverse(),
        type: "bar",
        orientation: "h"
      }
    ];

    var barData = [trace1];

    var barLayout = {
      title: "Top 10 Bacteria Cultures Found",
      margin: { t: 40, l: 200 }
    };

    Plotly.newPlot("bar", trace1, barLayout);
  });
}

function init() {
  // dropdown select element
  var selector = d3.select("#selDataset");

  // fill in the selDataset
  d3.json("data/samples.json").then((d) => {
    var sNames = d.names;
    sNames.forEach((s) => {
      selector
        .append("option")
        .text(s)
        .property("value", s);
    });

    // Pass in the first sample to create the graph and demographic info
    const initalSample = sNames[0];
    metadata(initalSample);
    buildGraphs(initalSample);
  });
}

function optionChanged(nSample) {
  // Pass in the new sample once selected in the dropdown
  metadata(nSample);
  buildGraphs(nSample);
}

// Initialize the dashboard
init();
