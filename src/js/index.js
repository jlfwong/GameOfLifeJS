var React = require("react");

var Grid = require("./grid.js");
var GridView = require("./grid-view.jsx");

var grid = Grid.random(100, 100);

var gridView = new GridView({
  initialGrid: grid
});

React.renderComponent(gridView, document.body);

var nextGen = function() {
  grid = grid.nextGeneration();
  gridView.setState({grid: grid});
  window.setTimeout(nextGen, 50);
};
window.setTimeout(nextGen, 50);
