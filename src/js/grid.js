var _ = require("lodash");

var Grid = function(state) {
  this.state = state;

  this.width = this.state[0].length;
  this.height = this.state.length;
};

Grid.LIVE = '#';
Grid.DEAD = '.';

Grid.random = function(width, height) {
  return new Grid(_.range(height).map(function() {
    return _.range(width).map(function() {
      return (_.random(0, 1) === 1) ? Grid.LIVE : Grid.DEAD;
    });
  }));
};

Grid.prototype.isAlive = function(row, col) {
  if (row < 0 || row >= this.height) {
    return false;
  }
  if (col < 0 || col >= this.width) {
    return false;
  }
  return (this.state[row][col] === Grid.LIVE);
};

Grid.prototype.numLiveNeighbours = function(row, col) {
  var count = 0;
  var self = this;

  _.range(row - 1, row + 2).forEach(function(nextRow) {
    _.range(col - 1, col + 2).forEach(function(nextCol) {
      if (nextRow === row && nextCol === col) {
        return;
      }
      if (self.isAlive(nextRow, nextCol)) {
        count += 1;
      }
    });
  });
  return count;
};

Grid.prototype.nextGeneration = function() {
  var self = this;
  return new Grid(_.range(self.height).map(function(row) {
    return _.range(self.width).map(function(col) {
      var n = self.numLiveNeighbours(row, col);
      if (self.isAlive(row, col)) {
        if (n < 2 || n > 3) {
          return Grid.DEAD;
        } else {
          return Grid.LIVE;
        }
      } else {
        if (n === 3) {
          return Grid.LIVE;
        } else {
          return Grid.DEAD;
        }
      }
    }).join('');
  }));
};

module.exports = Grid;
