import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { router } from './app.routes'
import './shared/styles/global.scss'
import { AuthProvider } from './features/auth/context/auth.context'
import { SongProvider } from './features/home/context/song.context'


const App = () => {
  return (
    <AuthProvider>
      <SongProvider>
        <RouterProvider router={router} />
      </SongProvider>
    </AuthProvider>
  )
}

export default App