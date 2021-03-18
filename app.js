let chartData = [];

d3.csv('./data/generic-dataset.csv', (data) => {
  chartData.push(data)

  const barWidth = data.Total.slice(1, -3).split(',').join(''); // Remove currency symbol and comma
  const graphWidth = 1000;
  const graphHeight = 1000;

  d3.select('#graph')
    .attr('viewbox', [0, 0, graphWidth, graphHeight])
    .selectAll('.bar')
    .data(chartData)
    .enter()
    .append('svg')
    .attr('width', barWidth / graphWidth) // Divide width by 1000 to fit the dimensions of the graphs container
    .attr('height', 30)
    .classed('bar', true)
    .sort((x, y) => d3.descending(x.Total, y.Total))
    .append('text')
    .attr('x', 20)
    .attr('y', 20)
    .attr('fill', 'white')
    .attr('font-weight', 'bold')
    .text(d => `${d.First} ${d.Last} ${d.Total}`)
})

// console.log(chartData)