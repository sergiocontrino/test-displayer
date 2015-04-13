var width = 420,
    barHeight = 20;

var x = d3.scale.linear()
    .range([0, width]);

var chart = d3.select(".chart")
    .attr("width", width);

// var QUERY = "http://intermine.modencode.org/thalemineval/service/query/results?query=%3Cquery%20model=%22genomic%22%20view=%22Protein.proteinDomainRegions.start%20Protein.proteinDomainRegions.end%20Protein.proteinDomainRegions.originalDb%20Protein.proteinDomainRegions.originalId%20Protein.proteinDomainRegions.proteinDomain.primaryIde\
// ntifier%22%20%3E%20%3Cconstraint%20path=%22Protein.primaryIdentifier%22%20op=%22=%22%20value=%22Q93V56_ARATH%22%20code=%22A%22%20/%3E%20%3C/query%3E"

var QUERY = "http://intermine.modencode.org/thalemineval/service/query/results?query=%3Cquery%20name=%22%22%20model=%22genomic%22%20view=%22Protein.proteinDomainRegions.start%20Protein.proteinDomainRegions.end%22%20longDescription=%22%22%3E%20%3Cconstraint%20path=%22Protein.primaryIdentifier%22%20op=%22=%22%20value=%22Q93V56_ARATH%22/%3E%20%3C/query%3E"

d3.json(QUERY, function(data) {
console.log(data)
d=data.results[0];
var begin= d[0];
var end=d[1];


//x.domain([0, d3.max(data.results, function(d) { return d[1]; })]);
  chart.attr("height", barHeight * data.results.length);

  var bar = chart.selectAll("g")
      .data(data.results)
      .enter().append("g")
      // .attr("transform", function(d, i) { return "translate(0," + i * barHeight + ")"; });
      .attr("transform", function(d, i) { return "translate("+ d[0] + "," + i * barHeight + ")"; });

console.log("BB " + bar)

 bar.append("rect")
      .attr("width", function(d) { return d[1] })
      //.attr("width", end - begin)
      .attr("height", barHeight - 1);

  bar.append("text")
      .attr("x", function(d) { return d[0]})
      .attr("y", barHeight / 2)
      .attr("dy", ".35em")
      // .text(function(d) { return (d[1] - d[0])});
      .text(function(d) { return (d[0] + " --> " + d[1])});


});




// d3.json("http://intermine.modencode.org/thalemineval/service/query/results?query=%3Cquery%20model=%22genomic%22%20view=%22Protein.proteinDomainRegions.start%20Protein.proteinDomainRegions.end%20Protein.proteinDomainRegions.originalDb%20Protein.proteinDomainRegions.originalId%20Protein.proteinDomainRegions.proteinDomain.primaryIde\
// ntifier%22%20%3E%20%3Cconstraint%20path=%22Protein.primaryIdentifier%22%20op=%22=%22%20value=%22Q93V56_ARATH%22%20code=%22A%22%20/%3E%20%3C/query%3E", type, function(error, data) {

// d3.json(QUERY, type, function(error, data) {
d3.json(QUERY, function(error, data) {

console.log("CCC");

  x.domain([0, d3.max(data.results, function(d) { return d.value; })]);
  chart.attr("height", barHeight * data.results.length);
console.log("AA " + barHeight * data.results.length);

  var bar = chart.selectAll("g")
      .data(data.results)
      .enter().append("g")
      .attr("transform", function(d, i) { return "translate(0," + i * barHeight + ")"; });

console.log("BB " + bar)
console.log("BBB " + x.domain);

  bar.append("rect")
      .attr("width", 5 )
      .attr("height", barHeight - 1);

  bar.append("rect")
      .attr("width", function(d) { return x(d.value); })
      .attr("height", barHeight - 1);


  bar.append("text")
      .attr("x", 3 )
      .attr("y", barHeight / 2)
      .attr("dy", ".35em")
      .text(27);



  // bar.append("rect")
  //     .attr("width", function(d) { return x(d.value); })
  //     .attr("height", barHeight - 1);

  // bar.append("text")
  //     .attr("x", function(d) { return x(d.value) - 3; })
  //     .attr("y", barHeight / 2)
  //     .attr("dy", ".35em")
  //     .text(function(d) { return d.value; });
});

function type(d) {
  d.value = +d.value; // coerce to number
  return d;
}




/*

var width = 420,
    barHeight = 20;

// var x = d3.scale.linear()
//     .domain([0, d3.max(data)])
//     .range([0, width]);

// var chart = d3.select(".chart")
//     .attr("width", width)
//     .attr("height", barHeight * data.length);

// var bar = chart.selectAll("g")
//     .data(data)
//   .enter().append("g")
//     .attr("transform", function(d, i) { return "translate(0," + i * barHeight + ")"; });


// NO
// var data = d3.json("http://intermine.modencode.org/thalemineval/service/query/results?query=%3Cquery%20model=%22genomic%22%20view=%22Protein.proteinDomainRegions.start%20Protein.proteinDomainRegions.end%20Protein.proteinDomainRegions.originalDb%20Protein.proteinDomainRegions.originalId%20Protein.proteinDomainRegions.proteinDomain.primaryIde\
// ntifier%22%20%3E%20%3Cconstraint%20path=%22Protein.primaryIdentifier%22%20op=%22=%22%20value=%22Q93V56_ARATH%22%20code=%22A%22%20/%3E%20%3C/query%3E");
// console.log(data);


d3.json("http://intermine.modencode.org/thalemineval/service/query/results?query=%3Cquery%20model=%22genomic%22%20view=%22Protein.proteinDomainRegions.start%20Protein.proteinDomainRegions.end%20Protein.proteinDomainRegions.originalDb%20Protein.proteinDomainRegions.originalId%20Protein.proteinDomainRegions.proteinDomain.primaryIde\
ntifier%22%20%3E%20%3Cconstraint%20path=%22Protein.primaryIdentifier%22%20op=%22=%22%20value=%22Q93V56_ARATH%22%20code=%22A%22%20/%3E%20%3C/query%3E", 
function(response) {
console.log(response);
}


//,
// function(d) {
// return {
// begin: d[0],
// end: d[1]
// }},


// bar.append("rect")
//     .attr("width", x)
//     .attr("height", barHeight - 1);

// bar.append("text")
//     .attr("x", function(d) { return x(d) - 3; })
//     .attr("y", barHeight / 2)
//     .attr("dy", ".35em")
//     .text(function(d) { return d; });

);
*/
