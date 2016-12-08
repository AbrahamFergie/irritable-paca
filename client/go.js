import React from 'react'
import Board from "./board"

let GRID_SIZE = 40

let BoardIntersection = React.createClass({

  handleClick () {
    if ( this.props.board.play( this.props.row, this.props.col ))
      this.props.onPlay()
  },
  render () {

    let style = {
      top: this.props.row * GRID_SIZE,
      left: this.props.col * GRID_SIZE
    }
    let classes = "intersection "
    if( this.props.color !== Board.EMPTY )
      classes += this.props.color === Board.BLACK ? "black" : "white"

    return (
      <div onClick={ this.handleClick }
        className={classes} style={style}></div>
    )
  }
})

let BoardView = React.createClass({
  render () {

    let intersections = []
    for( let i = 0; i < this.props.board.size; i++ )
      for( let j = 0; j < this.props.board.size; j++ )
        intersections.push(
          <BoardIntersection
          board={ this.props.board }
          color={ this.props.board.board[i][j] }
          row={i}
          col={j}
          onPlay={ this.props.onPlay } />
        )
    let style = {
      width: this.props.board.size * GRID_SIZE,
      height: this.props.board.size * GRID_SIZE
    }
   return <div style={ style } id="board">{intersections}</div>
  }
})

let AlertView = React.createClass({
  render () {
    let text = ""
    if( this.props.board.in_atari )
      text = "ATARI!"
    else if( this.props.board.attempted_suicide )
      text = "SUICIDE"

    return ( <div id="alerts">{text}</div> )
  }
})

let PassView = React.createClass({
  handleClick (e) {
    this.props.board.pass()
  },
  render () {
    return ( <input id="pass-btn" type="button" value="Pass"
      onClick={ this.handleClick } /> )
  }
})

export const ContainerView = React.createClass({
  getInitialState () {
    return { "board":  new Board(19) }
  },
  onBoardUpdate () {

    this.setState({ "board": this.state.board })
  },
  render () {
    const {state} = this
    return (
      <div>
        <AlertView board={ state.board } />
        <PassView board={ state.board } />
        <BoardView board={ state.board }
          onPlay={ this.onBoardUpdate } />
      </div>
    )
  }
})
