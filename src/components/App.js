import React, { Component } from 'react'
import { Router } from '@reach/router'

import Layout from './shared/layout'
import Dashboard from '../pages/dashboard/index'

import UserProvider from './shared/providers/user'

class App extends Component {
  render() {
    return (
      <UserProvider>
        <Layout>
          <Router>
            <Dashboard path="/" />
          </Router>
        </Layout>
      </UserProvider>
    )
  }
}

export default App
