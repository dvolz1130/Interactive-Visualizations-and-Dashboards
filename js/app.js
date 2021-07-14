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

