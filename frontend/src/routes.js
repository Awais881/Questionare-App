import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Typography = React.lazy(() => import('./views/theme/typography/Typography'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/theme/typography', name: 'Typography', element: Typography },
  // Add your other routes here
]
export default routes
