var MINEURL = "http://intermine.modencode.org/thalemineval/";
var BASEURL= MINEURL + "service/query/results?query=";
var QUERYSTART = "%3Cquery%20model=%22genomic%22%20view=%22" +
"Protein.proteinDomainRegions.start%20Protein.proteinDomainRegions.end%20" +
"Protein.proteinDomainRegions.originalDb%20Protein.proteinDomainRegions.originalId%20" +
"Protein.proteinDomainRegions.proteinDomain.primaryIdentifier%22%20%3E%20%3C" +
// "Protein.proteinDomainRegions.proteinDomain.primaryIdentifier%20" +
// "Protein.proteinDomainRegions.id%22%20%3E%20%3C" +
"constraint%20path=%22Protein.primaryIdentifier%22%20op=%22=%22%20value=%22";
var QUERYEND="%22/%3E%20%3C/query%3E";
var QUERY= BASEURL + QUERYSTART + queryId + QUERYEND;
var PORTAL = "portal.do?class=ProteinDomain&externalids=";


var svg = d3.select("#mychart");

var colors = d3.scale.category20b();

// Will hold our data
var alldata = null

// Original Width
var width = parseInt(svg.style("width"));

// Store our scale so that it's accessible by all:
var x= null;

// Static bar type:
var barHeight = 20;

var render = function() {

  x = d3.scale.linear()
  .domain([0, d3.max(data, function(d) {return d[1]})])
  .range([0, width]);


  // Size our SVG tall enough so that it fits each bar.
  // Width was already defined when we loaded.
  svg.attr("height", barHeight * data.length);

  // Draw our elements!!
  var bar = svg.selectAll("g")
      .data(data)

  // New bars:
  bar.enter().append("g")
      .attr("transform", function(d, i) {
        return "translate(" + x(d[0]) + "," + i * barHeight + ")";
      });

  bar.append("rect")
      .attr("width", function(d) { return range(d)})
      .attr("height", barHeight - 1)
      .style("fill", function(d, i) { console.log("index is", i); return colors(i)});

  bar.append("text")
      .attr("x", function(d) { return range(d) - 3; })
      .attr("y", barHeight / 2)
      .attr("dy", ".35em")
      .text(function(d) { return d[1]; });

}

var range = function(d) {
  var beginning = x(d[0]);
  var end = x(d[1]);
  var range = end - beginning;
  console.log("range", end - beginning);
  return range;
}

var rescale = function() {

  // The new width of the SVG element
  var newwidth = parseInt(svg.style("width"));

  // Our input hasn't changed (domain) but our range has. Rescale it!
  x.range([0, newwidth]);

  // Use our existing data:
  var bar = svg.selectAll("g").data(data)

  bar.attr("transform", function(d, i) {
        return "translate(" + x(d[0]) + "," + i * barHeight + ")";
      });

  // For each bar group, select the rect and resposition it using the new scale.
  bar.select("rect")
      .attr("width", function(d) { return range(d); })
      .attr("height", barHeight - 1)
      .style("fill", function(d, i) { return colors(i)});

  // Also reposition the bars using the new scales.
  bar.select("text")
      .attr("x", function(d) { return range(d) - 3; })
      .attr("y", barHeight / 2)
      .attr("dy", ".35em")
      .text(function(d) { return d[1]; });
}



// Fetch our JSON and feed it to the draw function
// d3.json("data.json", function(returned) {
//   data = returned.results;
//   render();
// });

d3.json(QUERY, function(returned) {
  data = returned.results;
  console.log("JH->" + data);
  render();
});



// Rescale it when the window resizes:
d3.select(window).on("resize", rescale);
