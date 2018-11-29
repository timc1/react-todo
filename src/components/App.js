import React from 'react'
import { Router } from '@reach/router'

import Layout from './shared/layout'
import Dashboard from '../pages/dashboard/index'
import Terms from '../pages/static/terms'

import GlobalUIProvider from './shared/providers/global-ui-settings'
import NotificationProvider from './shared/providers/global-notifications'
import UserProvider from './shared/providers/user'

export default () => (
  <GlobalUIProvider>
    <UserProvider>
      <NotificationProvider>
        <Layout>
          <Router>
            <Dashboard path="/" />
            <Terms path="/privacy-and-terms" />
          </Router>
        </Layout>
      </NotificationProvider>
    </UserProvider>
  </GlobalUIProvider>
)
