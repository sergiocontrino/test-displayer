var width = 420,
    barHeight = 20;

var x = d3.scale.linear()
    .range([0, width]);

var chart = d3.select(".chart")
    .attr("width", width);

// var QUERY = "http://intermine.modencode.org/thalemineval/service/query/results?query=%3Cquery%20model=%22genomic%22%20view=%22Protein.proteinDomainRegions.start%20Protein.proteinDomainRegions.end%20Protein.proteinDomainRegions.originalDb%20Protein.proteinDomainRegions.originalId%20Protein.proteinDomainRegions.proteinDomain.primaryIde\
// ntifier%22%20%3E%20%3Cconstraint%20path=%22Protein.primaryIdentifier%22%20op=%22=%22%20value=%22Q93V56_ARATH%22%20code=%22A%22%20/%3E%20%3C/query%3E"

//var QUERY = "http://intermine.modencode.org/thalemineval/service/query/results?query=%3Cquery%20name=%22%22%20model=%22genomic%22%20view=%22Protein.proteinDomainRegions.start%20Protein.proteinDomainRegions.end%22%20longDescription=%22%22%3E%20%3Cconstraint%20path=%22Protein.primaryIdentifier%22%20op=%22=%22%20value=%22Q93V56_ARATH%22/%3E%20%3C/query%3E"
var BASEURL= "http://intermine.modencode.org/thalemineval/service/query/results?query=";
    var QUERYSTART = "%3Cquery%20name=%22%22%20model=%22genomic%22%20view=%22Protein.proteinDomainRegions.start%20Protein.proteinDomainRegions.end%22%20longDescription=%22%22%3E%20%3Cconstraint%20path=%22Protein.primaryIdentifier%22%20op=%22=%22%20value=%22";
//    var ID="Q93V56_ARATH";
    var QUERYEND="%22/%3E%20%3C/query%3E";
    var queryId = '<%=QUERYID%>';
var QUERY= BASEURL + QUERYSTART + queryId + QUERYEND;

d3.json(QUERY, function(data) {

x.domain([0, d3.max(data.results, function(d) { return d[1]; })]);

  chart.attr("height", barHeight * data.results.length);

  var bar = chart.selectAll("g")
      .data(data.results)
      .enter().append("g")
      // .attr("transform", function(d, i) { return "translate(0," + i * barHeight + ")"; });
      .attr("transform", function(d, i) { return "translate("+ d[0] + "," + i * barHeight + ")"; });

 bar.append("rect")
      .attr("width", function(d) { return (d[1] -d[0]) })
      //.attr("width", end - begin)
      .attr("height", barHeight - 1);

  bar.append("text")
      .attr("x", function(d) { return d[0]})
      .attr("y", barHeight / 2)
      .attr("dy", ".35em")
      // .text(function(d) { return (d[1] - d[0])});
      .text(function(d) { return (d[0] + " --> " + d[1])});


});


function type(d) {
  d.value = +d.value; // coerce to number
  return d;
}

