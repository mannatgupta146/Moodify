import React from 'react'
import FaceExpression from './features/expression/component/FaceExpression'
import { RouterProvider } from 'react-router-dom'
import { router } from './app.routes'
import './shared/styles/global.scss'

const App = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default App