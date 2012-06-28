var jsonUrl = {"Forbes Billionaires": "http://apify.heroku.com/api/billionaires.json?callback=?"};
var dataId = "Forbes Billionaires";
var data = [];

$(function(){
  $.getJSON(jsonUrl[dataId], function(dataString){
    data = JSON.parse(dataString);
    display(data[0]);
    bubbleChart(data);
  })
});

function display(d){
  $('.face img').attr('src', d.image);
  $('.rank .value').html(d.rank);
  $('.name').html(d.name);
  $('.country').html(d.country);
  $('.networth').html(d.networth);
}

function bubbleChart(data){
  var r = 1200,
      format = d3.format(",d"),
      fill = d3.scale.category20c();

  var bubble = d3.layout.pack()
      .sort(null)
      .size([r, r]);

  var vis = d3.select("#chart").append("svg")
      .attr("width", r)
      .attr("height", r)
      .attr("class", "bubble");

  var tooltip = d3.select("body")
    .append("div")
    .style("position", "absolute")
    .style("z-index", "10")
    .style("visibility", "hidden")
    .text("a simple tooltip");

  var node = vis.selectAll("g.node")
      .data(data)
      .enter()
      .append("g")
      .attr("class", "node")
      .attr("transform", function(d,i) { return "translate(" + d.networth.match(/[\d\.]+/)*15 + "," + (d.age > 0 ? d.age*5 : 50)+ ")"; });

  node.append("title")
      .text(function(d) { return "# " + d.rank + " " + d.name + " (" + d.networth + ")" });

  node.append("circle")
      .attr("r", function(d) { return d.networth.match(/[\d\.]+/); })
      .style("fill", function(d) { return fill(d.country); });

  node.append("text")
      .attr("text-anchor", "middle")
      .attr("dy", ".3em")
      .text(function(d) { return "# " + d.rank; });

  node.on('mouseover', function(d){
    display(d);
  });
}