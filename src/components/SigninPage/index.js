import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import SessionActions from '../../actions/SessionActions'
import SessionStore from '../../stores/SessionStore'

function getFluxState () {
  return {
    isSignedIn: SessionStore.isSignedIn()
  }
}

class SigninPage extends Component {
  constructor () {
    super()
    getFluxState()
    this._onChange = this._onChange.bind(this)
  }

  componentDidMount () {
    SessionStore.addChangeListener(this._onChange)
  }

  componentWillUpdate (nextProps, nextState) {
    if (nextState.isSignedIn) {
      const { location } = this.props

      if (location.state && location.state.nextPathname) {
        this.context.router.replace(location.state.nextPathname)
      } else {
        this.context.router.replace('/projects')
      }
    }
  }

  componentWillUnmount () {
    SessionStore.removeChangeListener(this._onChange)
  }

  handleSignIn () {
    SessionActions.authorize()
  }

  render () {
    return (
      <div className='SigninPage'>
        <div className='SigninPage-banner'>
          <div className='SigninPage-text'>
            <h1>Simple TODO</h1>
            <RaisedButton label='Sign in'
              className='signin-button'
              onClick={this.handleSignIn}
            />
          </div>
        </div>
      </div>
    )
  }

  _onChange () {
    this.setState(getFluxState())
  }
}

SigninPage.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default SigninPage
