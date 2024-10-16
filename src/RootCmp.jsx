import React from 'react'
import { Routes, Route, Navigate } from 'react-router'
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
          <Route path="/todo" element={<TodoIndex />} />
          <Route element={<TodoEdit />} path="/todo/edit" />
          <Route element={<TodoEdit />} path="/todo/edit/:todoId" />

        </Routes>
        <ToastContainer autoClose={1500} />
      </main>
    </ChakraProvider>
  )
}

