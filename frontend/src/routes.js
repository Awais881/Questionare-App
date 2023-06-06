import React from 'react'

// const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Typography = React.lazy(() => import('./views/theme/typography/Typography'))
const Colors = React.lazy(() => import('./views/theme/colors/Colors'))
import AddQuestions from './views/theme/addQuestion/AddQuestion'
import Dashboard from './views/dashboard/Dashboard'
const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/theme/typography', name: 'Typography', element: Typography },
  { path: '/theme/colors', name: 'Color', element: Colors },
  { path: '/theme/addQuestion', name: 'AddQuestion', element: AddQuestions },
  // Add your other routes here
]
export default routes
