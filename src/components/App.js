import React, { Component } from 'react'
import { Router } from '@reach/router'

import Layout from './shared/layout'
import Dashboard from '../pages/dashboard/index'

class App extends Component {
  render() {
    return (
      <Layout>
        <Router>
          <Dashboard path="/" />
        </Router>
      </Layout>
    )
  }
}

export default App
