const graphWidth = 1000;
const graphHeight = 1500;

const graph = d3.select('#graph')
  .append('svg')
    .attr('width', '100%')
    .attr('height', graphHeight)
    .attr('viewbox', [0, 0, graphWidth, graphHeight])
    .attr('preserveAspectRatio','xMinYMin')
  .append('g')
    .attr('transform', 'translate(10, 0)')

d3.csv('./data/generic-dataset.csv').then((data) => {
  
  data.sort((x, y) => d3.descending(x.Total, y.Total));

  // X-Axis
  const x = d3.scaleLinear()
    .domain([0, graphWidth]) // Numbers across x-axis
    .range([0, graphWidth]);

  graph.append('g')
    .call(d3.axisBottom(x))
    .selectAll('text')
      .attr('font-size', 16);

  // Y-Axis
  const y = d3.scaleBand()  // Controls y attribute and positioning for bars
    .domain(d3.range(data.length))
    .range([0, graphHeight])
    .padding(2);

  graph.append('g')
    .call(d3.axisLeft(y).tickFormat(d => '').tickSize(0));

  // Bars
  const bar = graph.selectAll('.bar')
    .data(data)
    .enter();

  bar.append('rect')
    .attr('x', 0)
    .attr('y', (d, i) => y(i))
    .attr('width', (d) => d.Total.slice(1, -3).split(',').join('') / graphWidth)
    .attr('height', 20)
    .style('fill', 'royalblue')
    .classed('bar', true);

  bar.append('text')
    .attr('x', 20)
    .attr('y', (d, i) => y(i) + 15)
    .attr('font-weight', 'bold')
    .attr('font-size', 12)
    .style('fill', 'white')
    .text(d => `${d.First} ${d.Last} - ${d.Game} - ${d.Country} - ${d.Total}`);

});