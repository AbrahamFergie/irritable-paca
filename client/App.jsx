import React, { Component } from 'react'
import {ContainerView} from './go'
import ReactDOM from 'react-dom'
import {ChatApp} from './Chat'


const Htmlroot = document.getElementById( 'app' )



 class App extends Component {
  constructor(props){
    super(props)
  }
  render() {
    return ( <div>
              <ChatApp/>
              <ContainerView/>
             </div>
  )
 }
}
ReactDOM.render( <App />, Htmlroot )
