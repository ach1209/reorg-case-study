const graphWidth = 1000;
const graphHeight = 1500;
const games = document.getElementById('games');
const countries = document.getElementById('countries');
const graph = document.getElementById('graph');
const reset = document.getElementById('reset-btn');

d3.csv('./data/generic-dataset.csv').then((data) => {

  // Create initial graph
  createGraph();

  // Change data based on input from dropdown
  d3.select('#games').on('change', filterGames);
  d3.select('#countries').on('change', filterCountries);  
  d3.select('#reset-btn').on('click', reset);

  function createGraph(dataset = data) {
    dataset.sort((x, y) => d3.descending(x.Total, y.Total));

    const graph = d3.select('#graph');
    
    const title = graph.append('text')
      .classed('graph-title', true)
      .text('Total Earnings');

    const svg = graph.append('svg')
      .attr('width', '100%')
      .attr('height', graphHeight)
      .attr('viewbox', [0, 0, graphWidth, graphHeight])
      .attr('preserveAspectRatio','xMinYMin')
      .append('g')
        .attr('transform', 'translate(10, 0)');

    // X-Axis
    const x = d3.scaleLinear()
      .domain([0, graphWidth]) // Numbers across x-axis
      .range([0, graphWidth]);

    svg.append('g')
      .call(d3.axisBottom(x))
      .selectAll('text')
        .attr('font-size', 16);

    // Y-Axis
    const y = d3.scaleBand()  // Controls y attribute and positioning for bars
      .domain(d3.range(dataset.length))
      .range([0, dataset.length < 50 ? (50 * dataset.length) + 50 : graphHeight ])
      .padding(2);

    svg.append('g')
      .call(d3.axisLeft(y).tickFormat(d => '').tickSize(0));

    // Bars
    const bar = svg.selectAll('.bar')
      .data(dataset)
      .enter();

    bar.append('rect')
      .attr('x', 0)
      .attr('y', (d, i) => y(i))
      .attr('width', (d) => d.Total.slice(1, -3).split(',').join('') / graphWidth)
      .attr('height', 20)
      .style('fill', '#6e6f70')
      .classed('bar', true);

    bar.append('text')
      .attr('x', 20)
      .attr('y', (d, i) => y(i) + 15)
      .attr('font-weight', 'bold')
      .attr('font-size', 12)
      .style('fill', 'white')
      .text(d => `${d.First} ${d.Last} - ${d.Game} - ${d.Country} - ${d.Total}`);

  }

  function filterGames() {
    const selectedGame = this.value;
    let filteredValues = data.filter(d => d.Game.toLowerCase().replace(/\s+/g, '') === selectedGame); // Spaces are removed from filtered values 

    if (countries.selectedIndex >= 1) {
      countries.selectedIndex = 0;
    }

    graph.textContent = '';
    createGraph(filteredValues);
  }

  function filterCountries() {
    const selectedCountry = this.value;
    let filteredValues = data.filter(d => d.Country.toLowerCase().replace(/\s+/g, '') === selectedCountry);

    if (games.selectedIndex >= 1 ) {
      games.selectedIndex = 0;
    }
    
    graph.textContent = '';
    createGraph(filteredValues);
  }

  function reset() {
    games.selectedIndex = 0;
    countries.selectedIndex = 0;
    graph.textContent = '';
    createGraph();
  }

});