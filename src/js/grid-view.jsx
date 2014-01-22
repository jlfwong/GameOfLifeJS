/** @jsx React.DOM */
var React = require("react");
var _ = require("lodash");

var Grid = require("./grid.js");

var GridView = React.createClass({
  getInitialState: function() {
    return {
      grid: this.props.initialGrid
    };
  },
  render: function() {
    var grid = this.state.grid;
    return (
      <div className='grid-view'>
        {_.range(grid.height).map(function(row) {
          return (
            <div className='grid-row' key={'r' + row}>
              {_.range(grid.width).map(function(col) {
                var className = 'cell';
                if (grid.isAlive(row, col)) {
                  className += ' live' + grid.numLiveNeighbours(row, col);
                } else {
                  className += ' dead';
                }

                return (
                  <div className={className} key={'c' + row + ',' + col}>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  }
});

module.exports = GridView;
