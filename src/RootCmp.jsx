import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom' // Corrected import
import { TodoIndex } from './pages/TodoIndex'
import { TodoEdit } from './pages/TodoEdit'
import { ToastContainer } from 'react-toastify'
import { ChakraProvider } from '@chakra-ui/react'

export function RootCmp() {
  return (
    <ChakraProvider>
      <main className="main-container">
        <Routes>
          <Route path="/" element={<Navigate to="/todo" />} />
          <Route path="/todo" element={<TodoIndex />} >
            <Route path="edit" element={<TodoEdit />} />
            <Route path="edit/:todoId" element={<TodoEdit />} />
          </Route>
        </Routes>
        <ToastContainer autoClose={1500} />
      </main>
    </ChakraProvider>
  )
}

