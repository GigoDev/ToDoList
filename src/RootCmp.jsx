import React from 'react'
import { Routes, Route, Navigate } from 'react-router'
import { TodoIndex } from './pages/TodoIndex'
import { TodoEdit } from './pages/TodoEdit'
import { ToastContainer } from 'react-toastify'


export function RootCmp() {

  return (
    <main className="main-container">
      <Routes>
        <Route path="/" element={<Navigate to="/todo" />} />
        <Route path="/todo" element={<TodoIndex />} >
          <Route element={<TodoEdit />} path="/todo/edit" />
          <Route element={<TodoEdit />} path="/todo/edit/:todoId" />
        </Route>
      </Routes>
      <ToastContainer autoClose={1000} />
    </main>
  )
}

