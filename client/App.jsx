import React, { Component } from 'react'
import {ContainerView} from './go.jsx'
import ReactDOM from 'react-dom'
import {ChatApp} from './Chat.jsx'


const Htmlroot = document.getElementById( 'app' )

 class App extends Component {
  constructor(props){
    super(props)
  }
  render() {
    return ( <div>
              <ChatApp />
              <ContainerView />
             </div>
  )
 }
}
ReactDOM.render( <App />, Htmlroot )
