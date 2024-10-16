import { Link, useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { todoService } from "../services/todo.service.js"
import { Button, ButtonGroup, Input, Select, Text } from '@chakra-ui/react'

import { toast } from 'react-toastify';
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
        <section className="todo-edit flex column">
            <h1>{todoId ? 'Edit' : 'Add'} Todo</h1>
            <form className="flex column" onSubmit={onSaveTodo}>

                <div className="input-container">
                    <Text mb='8px'>Task: </Text>
                    <Input onChange={handleChange} value={task} type="text" name="task" />
                </div>

                <div className="input-container">
                    <Text mb='8px'>Assignee: </Text>
                    <Input onChange={handleChange} value={assignee} type="text" name="assignee" id="assignee" />
                </div>

                <div className="input-container">
                    <Text mb='8px'>Select priority: </Text>
                    <Select onChange={handleChange} name="priority">
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </Select>
                </div>

                <ButtonGroup  spacing='6'>
                    <Button colorScheme='blue'>{todoId ? 'Save' : 'Add'}</Button>
                    <Button><Link to="/todo">Cancel</Link></Button>
                </ButtonGroup>

            </form>
        </section>
    )

}