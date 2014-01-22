var expect = require("chai").expect;

var Grid = require("./grid.js");

describe('Grid', function() {
  it('has width and height properties', function() {
    var grid1 = new Grid([
      '.#'
    ]);

    var grid2 = new Grid([
      '.',
      '#'
    ]);

    var grid3 = new Grid([
      '.#',
      '#.'
    ]);

    expect(grid1.width).to.equal(2);
    expect(grid1.height).to.equal(1);
    expect(grid2.width).to.equal(1);
    expect(grid2.height).to.equal(2);
    expect(grid3.width).to.equal(2);
    expect(grid3.height).to.equal(2);
  });

  describe('isAlive', function() {
    var grid = new Grid([
      '.#',
      '#.'
    ]);

    it('returns true if the (row, col) passed contains a live cell', function() {
      expect(grid.isAlive(0, 0)).to.equal(false);
      expect(grid.isAlive(0, 1)).to.equal(true);
      expect(grid.isAlive(1, 0)).to.equal(true);
      expect(grid.isAlive(1, 1)).to.equal(false);
    });

    it('always returns false if (row, col) is out of bounds', function() {
      expect(grid.isAlive(-1, 0)).to.equal(false);
      expect(grid.isAlive(0, -1)).to.equal(false);
      expect(grid.isAlive(0, 3)).to.equal(false);
      expect(grid.isAlive(3, 0)).to.equal(false);
    });
  });

  describe('numLiveNeighbours', function() {
    var grid = new Grid([
      '.#.',
      '#.#',
      '##.'
    ]);

    it('returns the number of live neighbours at (row, col)', function() {
      expect(grid.numLiveNeighbours(0, 0)).to.equal(2, '0, 0');
      expect(grid.numLiveNeighbours(0, 1)).to.equal(2, '0, 1');
      expect(grid.numLiveNeighbours(0, 2)).to.equal(2, '0, 2');
      expect(grid.numLiveNeighbours(1, 0)).to.equal(3, '1, 0');
      expect(grid.numLiveNeighbours(1, 1)).to.equal(5, '1, 1');
      expect(grid.numLiveNeighbours(1, 2)).to.equal(2, '1, 2');
      expect(grid.numLiveNeighbours(2, 0)).to.equal(2, '2, 0');
      expect(grid.numLiveNeighbours(2, 1)).to.equal(3, '2, 1');
      expect(grid.numLiveNeighbours(2, 2)).to.equal(2, '2, 2');
    });
  });

  describe('nextGeneration', function() {
    var gen0 = new Grid([
      '.#...',
      '..#..',
      '###..',
      '.....',
      '.....'
    ]);

    it('returns a grid containing the next generation of life', function() {
      var gen1 = gen0.nextGeneration();
      var gen2 = gen1.nextGeneration();

      expect(gen1.state).to.deep.equal([
        ".....",
        "#.#..",
        ".##..",
        ".#...",
        "....."
      ]);
      expect(gen2.state).to.deep.equal([
        ".....",
        "..#..",
        "#.#..",
        ".##..",
        "....."
      ]);
    });
  });
});
