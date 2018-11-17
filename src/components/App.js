import React from 'react'
import { Router } from '@reach/router'

import Layout from './shared/layout'
import Dashboard from '../pages/dashboard/index'

import UserProvider from './shared/providers/user'

export default () => (
  <UserProvider>
    <Layout>
      <Router>
        <Dashboard path="/" />
      </Router>
    </Layout>
  </UserProvider>
)
