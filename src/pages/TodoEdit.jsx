import { Link, useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { todoService } from "../services/todo.service.js"

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function TodoEdit() {

    const [todoToEdit, setTodoToEdit] = useState(todoService.getEmptyTodo())
    const navigate = useNavigate()
    const { todoId } = useParams()

    useEffect(() => {
        if (todoId) loadTodo()
    }, [])

    async function loadTodo() {
        try {
            const todo = await todoService.getById(todoId)
            setTodoToEdit(todo)
        } catch (err) {
            console.log('err:', err)
        }
    }

    async function onSaveTodo(ev) {
        try {
            ev.preventDefault()

            await todoService.save(todoToEdit)
            const actionType = todoId ? 'saved' : ' added'
            toast.success(`Todo was successfully ${actionType}`)
            navigate('/todo')
        } catch (err) {
            console.log('err:', err)
        }
    }

    function handleChange({ target }) {
        const field = target.name
        const value = target.value

        setTodoToEdit(prevTodo => ({ ...prevTodo, [field]: value }))
    }


    const { task, assignee } = todoToEdit
    return (
        <section className="todo-edit">
            <h1>{todoId ? 'Edit' : 'Add'} Todo</h1>
            <form onSubmit={onSaveTodo}>
                <label htmlFor="task">Task</label>
                <input onChange={handleChange} value={task} type="text" name="task" id="task" />

                <label htmlFor="assignee">Assignee</label>
                <input onChange={handleChange} value={assignee} type="text" name="assignee" id="assignee" />

                <label htmlFor="priority">Choose a priority</label>
                <select onChange={handleChange} name="priority" id="priority">
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                </select>

                <div>
                    <button>{todoId ? 'Save' : 'Add'}</button>
                    <Link to="/todo">Cancel</Link>
                </div>

            </form>
        </section>
    )

}