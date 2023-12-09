import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Todo from '../components/Todo'
import AddTodo from '../components/AddTodo'
import EditTodo from '../components/EditTodo'

const AllRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<Todo/>}/>
        <Route path="/add" element={<AddTodo/>}/>
        <Route path="/edit" element={<EditTodo/>}/>
    </Routes>
  )
}

export default AllRoutes
