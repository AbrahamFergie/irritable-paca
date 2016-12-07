import React { Component } from 'react'
import ReactDOM from 'react-dom'

import board from "./board"
import { ContainerView } from "./go.js"

let board = new Board(19)

react.renderComponent(
  <ContainerView board = { board } />
  document.getElementById('app')
)
