import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin'

injectTapEventPlugin()

class App extends Component {
  render () {
    return (
      <MuiThemeProvider>
        <div>
          <h1>Hello world!</h1>
          <div>
            {this.props.children}
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default App
