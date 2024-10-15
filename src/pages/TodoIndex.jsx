import { useState } from "react"
import { useEffect } from "react"
import { ReactTable } from "../cmps/ReactTable"
import { todoService } from "../services/todo.service"

import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


export function TodoIndex() {

    const [todos, setTodos] = useState(null)

    useEffect(() => {
        loadTodos()
    }, [])

    async function loadTodos() {
        try {
            const todosToLoad = await todoService.query()
            setTodos(todosToLoad)
        } catch (err) {
            console.log(err)
        }
    }

    async function onRemoveTodo(todoId) {
        try {
            await todoService.remove(todoId)
            setTodos(todos => todos.filter(todo => todo._id !== todoId))
            toast('Success')
        } catch (err) {
            console.log(err)
        }
    }



    if (!todos) return <span>Loading...</span>
    return (
        <section className="todo-index">
            TodoIndex
            <ReactTable data={todos} onRemoveTodo={onRemoveTodo} />
            <ToastContainer />
        </section>
    )
}