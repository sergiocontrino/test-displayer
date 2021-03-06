/* script used by the report page of thalemine (report.jsp), if protein
//
// INPUT:   the protein id (primaryIdentifier)
// OUTPUT:  bar chart displaying the various domains associated with the protein
//
*/

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

var colors = d3.scale.category20();
//var colors = d3.scale.category10();

// Will hold our data
//var alldata = null

// margins
var margin = {top: 40, right: 20, bottom: 30, left: 40}

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

// when no results don't display anything
svg.attr("height", 0);

if (data.length > 0) {

// Build the report header
head = svg.append('foreignObject')
                        .attr('x', 0)
                        .attr('y', 0)
                        .attr('width', width)
                        .attr('height', 200)
                        //.attr('fill', )
                        .append("xhtml:body")
                        .html('<h3 class="goog"> ' + data.length + ' Protein Domain Regions - source: InterPro</h3>\
                               <p> <p>');

svg.attr("height", margin.top + (barHeight * data.length) + margin.bottom);

}

  // Size our SVG tall enough so that it fits each bar.
  // Width was already defined when we loaded.
  //svg.attr("height", barHeight * data.length);

  // Draw our elements!!
  var bar = svg.selectAll("g")
      .data(data)

  // New bars:
  bar.enter().append("g")
      .attr("transform", function(d, i) {
        return "translate(" + x(d[0]) + "," + (margin.top + (i * barHeight)) + ")";
      });

  bar.append("a")
    .on("mouseover", function(d, i){
      d3.select(this)
          .attr({"xlink:href": MINEURL + PORTAL + d[4]});
    })
   .append("rect")
     .attr("width", function(d) { return range(d)})
     .attr("height", barHeight - 1)
     .style("fill", function(d, i) { console.log("index is", i); return colors(d[4])});

  bar.append("a")
      .on("mouseover", function(d){
        d3.select(this)
            .attr({"xlink:href": MINEURL + PORTAL + d[4]});
      })
     .append("text")
      .attr("x", function(d) { return range(d) - 3; })
      .attr("y", barHeight / 2)
      .attr("dy", ".35em")
      .text(function(d) { return (d[0] + "..." + d[1] + " " + d[2]+": "+ d[3])});

}

var range = function(d) {
  var beginning = x(d[0]);
  var end = x(d[1]);
  var range = end - beginning;
  //console.log("range", end - beginning);
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
        return "translate(" + x(d[0]) + "," + (margin.top + (i * barHeight)) + ")";
      });

  // For each bar group, select the rect and resposition it using the new scale.
  bar.select("rect")
      .attr("width", function(d) { return range(d); })
      .attr("height", barHeight - 1)
      .style("fill", function(d, i) { return colors(d[4])});

  // Also reposition the bars using the new scales.
  bar.select("text")
      .attr("x", function(d) { return range(d) - 3; })
      .attr("y", barHeight / 2)
      .attr("dy", ".35em")
      .text(function(d) { return (d[0] + "..." + d[1] + " " + d[2]+": "+ d[3]) });

head = svg.append('foreignObject')
                        .attr('x', 0)
                        .attr('y', 0)
                        .attr('width', newwidth)
                        .attr('height', 200)
                        .append("xhtml:body")
                        .html('<h3 class="goog"> ' + data.length + ' Protein Domain Regions - source: InterPro</h3>\
                               <p> <p>');
}

// Fetch our JSON and feed it to the draw function

// d3.json("data.json", function(returned) {
//   data = returned.results;
//   render();
// });

d3.json(QUERY, function(returned) {
  data = returned.results;
  render();
});



// Rescale it when the window resizes:
d3.select(window).on("resize", rescale);

