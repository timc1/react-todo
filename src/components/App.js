import React from 'react'
import { Router } from '@reach/router'

import Layout from './shared/layout'
import Dashboard from '../pages/dashboard/index'

import NotificationProvider from './shared/providers/global-notifications'
import UserProvider from './shared/providers/user'

export default () => (
  <UserProvider>
    <NotificationProvider>
      <Layout>
        <Router>
          <Dashboard path="/" />
        </Router>
      </Layout>
    </NotificationProvider>
  </UserProvider>
)
