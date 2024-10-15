import React from 'react'
import { Routes, Route, Navigate } from 'react-router'
import { TodoIndex } from './pages/TodoIndex'


export function RootCmp() {

  return (
    <div className="main-container">
      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/todo" />} />
          <Route path="/todo" element={<TodoIndex />} />
        </Routes>
      </main>
    </div>
  )
}

