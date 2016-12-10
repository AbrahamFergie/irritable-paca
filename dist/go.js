"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ContainerView = undefined;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _board = require("./board");

var _board2 = _interopRequireDefault(_board);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GRID_SIZE = 40;

var BoardIntersection = _react2.default.createClass({
  displayName: "BoardIntersection",
  handleClick: function handleClick() {
    if (this.props.board.play(this.props.row, this.props.col)) this.props.onPlay();
  },
  render: function render() {

    var style = {
      top: this.props.row * GRID_SIZE,
      left: this.props.col * GRID_SIZE
    };
    var classes = "intersection ";
    if (this.props.color !== _board2.default.EMPTY) classes += this.props.color === _board2.default.BLACK ? "black" : "white";

    return _react2.default.createElement("div", { onClick: this.handleClick,
      className: classes, style: style });
  }
});

var BoardView = _react2.default.createClass({
  displayName: "BoardView",
  render: function render() {

    var intersections = [];
    for (var i = 0; i < this.props.board.size; i++) {
      for (var j = 0; j < this.props.board.size; j++) {
        intersections.push(_react2.default.createElement(BoardIntersection, {
          board: this.props.board,
          color: this.props.board.board[i][j],
          row: i,
          col: j,
          onPlay: this.props.onPlay }));
      }
    }var style = {
      width: this.props.board.size * GRID_SIZE,
      height: this.props.board.size * GRID_SIZE
    };
    return _react2.default.createElement(
      "div",
      { style: style, id: "board" },
      intersections
    );
  }
});

var AlertView = _react2.default.createClass({
  displayName: "AlertView",
  render: function render() {
    var text = "";
    if (this.props.board.in_atari) text = "ATARI!";else if (this.props.board.attempted_suicide) text = "SUICIDE";

    return _react2.default.createElement(
      "div",
      { id: "alerts" },
      text
    );
  }
});

var PassView = _react2.default.createClass({
  displayName: "PassView",
  handleClick: function handleClick(e) {
    this.props.board.pass();
  },
  render: function render() {
    return _react2.default.createElement("input", { id: "pass-btn", type: "button", value: "Pass",
      onClick: this.handleClick });
  }
});

var ContainerView = exports.ContainerView = _react2.default.createClass({
  displayName: "ContainerView",
  getInitialState: function getInitialState() {
    return { "board": new _board2.default(19) };
  },
  onBoardUpdate: function onBoardUpdate() {

    this.setState({ "board": this.state.board });
  },
  render: function render() {
    var state = this.state;

    return _react2.default.createElement(
      "div",
      null,
      _react2.default.createElement(AlertView, { board: state.board }),
      _react2.default.createElement(PassView, { board: state.board }),
      _react2.default.createElement(BoardView, { board: state.board,
        onPlay: this.onBoardUpdate })
    );
  }
});