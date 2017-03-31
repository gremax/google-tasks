import React from 'react'
import Paper from 'material-ui/Paper'
import './styles.css'

const AboutPage = () => (
  <div className='AboutPage'>
    <Paper className='AboutPage__content' zDepth={3}>
      <h2>About</h2>
      <p>This is an example application based on Google Tasks API</p>
    </Paper>
  </div>
)

export default AboutPage
