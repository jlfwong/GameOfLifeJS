var Grid = function(state) {
  this.state = state;

  this.width = this.state[0].length;
  this.height = this.state.length;
};

Grid.prototype.isAlive = function(row, col) {
  return false;
};

Grid.prototype.numLiveNeighbours = function(row, col) {
  return 0;
};

Grid.prototype.nextGeneration = function(row, col) {
  return new Grid(this.state);
};

module.exports = Grid;
