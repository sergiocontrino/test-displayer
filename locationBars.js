//======================
// 
// bar chart, no axis
// 
// note: to pass the parameter (queryId) you need to define the variable on the jsp.
//
// TODO: text
//       same source all in a row?
//       add axis?
//       bring displayer styling inside (from jsp)
//
// ======================

var margin = {top: 40, right: 20, bottom: 30, left: 40},
    width = 830,
    barHeight = 20;

// var width = 830,
//     barHeight = 20;

var x = d3.scale.linear()
    .range([0, width]);

var chart = d3.select(".chart")
    .attr("width", width +140);  // for the text

colors = d3.scale.category10();

var BASEURL= "http://intermine.modencode.org/thalemineval/service/query/results?query=";
var QUERYSTART = "%3Cquery%20model=%22genomic%22%20view=%22Protein.proteinDomainRegions.start%20Protein.proteinDomainRegions.end%20Protein.proteinDomainRegions.originalDb%20Protein.proteinDomainRegions.originalId%20Protein.proteinDomainRegions.proteinDomain.primaryIdentifier%22%20%3E%20%3Cconstraint%20path=%22Protein.primaryIdentifier%22%20op=%22=%22%20value=%22";
var QUERYEND="%22/%3E%20%3C/query%3E";
var QUERY= BASEURL + QUERYSTART + queryId + QUERYEND;

d3.json(QUERY, function(data) {

var maxValue = d3.max(data.results, function(d) { return d[1]; });
var minValue = d3.min(data.results, function(d) { return d[0]; });
var scaling = width / [maxValue - minValue];

// styling
// TODO dimensions, background color and line
text = chart.append('foreignObject')
                        .attr('x', 5)
                        .attr('y', 0)
                        .attr('width', width)
                        .attr('height', 200)
                        //.attr('fill', )
                        .append("xhtml:body")
    .html('<font color="#049"><hr noshade></hr>\
      <h3>Protein Domain Regions - source: InterPro</font></h3>\
      <p><i>' + data.results.length + ' regions found.</i><p>')


x.domain([0, width]);

  chart.attr("height", margin.top + (barHeight * data.results.length) + margin.bottom);

  var bar = chart.selectAll("g")
      .data(data.results)
      .enter().append("g")
      // .attr("transform", function(d, i) { return "translate(0," + i * barHeight + ")"; });
      .attr("transform", function(d, i) \
        { return "translate("+ ((d[0] - minValue)*scaling) + ","\
         + (margin.top + i * barHeight) + ")"; });

 bar.append("rect")
      .style("fill", function(d,i){return colors(d[2])})
      .attr("width", function(d) { return ((d[1] -d[0])*scaling) })
      .attr("height", barHeight - 1);

  bar.append("text")
      .attr("x", 2)
      .attr("y", barHeight / 2)
      .attr("dy", ".35em")
      .text(function(d) { return (d[0] + "..." + d[1] + " " + d[2]+": "+ d[3])});


