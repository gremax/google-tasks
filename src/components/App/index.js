import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin'
import './styles.css'

injectTapEventPlugin()

class App extends Component {
  render () {
    return (
      <MuiThemeProvider>
        <div className='container'>
          {this.props.children}
        </div>
      </MuiThemeProvider>
    )
  }
}

export default App
