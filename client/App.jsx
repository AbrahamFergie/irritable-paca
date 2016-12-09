import React, { Component } from 'react'
import {ContainerView} from './go'
import ReactDOM from 'react-dom'


const Htmlroot = document.getElementById( 'app' )



 class App extends Component {
  constructor(props){
    super(props)
  }
  render() {
    return ( <div><ContainerView/></div>

  )
 }
}
ReactDOM.render( <App />, Htmlroot )
