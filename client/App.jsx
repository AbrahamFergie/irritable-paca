import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import {ContainerView} from './go'

export default class App extends Component {
  constructor(props){
    super(props)
  }
  render() {
    return <div><ContainerView /></div>
  }
}

ReactDOM.render(<App />, document.getElementById('app'))
