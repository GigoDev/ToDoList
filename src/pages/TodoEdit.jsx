import { Link, useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { todoService } from "../services/todo.service.js"
import { Button, ButtonGroup, Input, Select, Spinner, Text } from '@chakra-ui/react'

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
            toast.error('Something went wrong, cannot load todo')

        }
    }

    async function onSaveTodo(ev) {
        const actionType = todoId ? 'saved' : ' added'

        try {
            ev.preventDefault()

            await todoService.save(todoToEdit)
            toast.success(`Todo was ${actionType} successfully `)
            navigate('/todo')
        } catch (err) {
            console.log('err:', err)
            toast.error(`Something went wrong, todo was not ${actionType}`)

        }
    }

    // Controled form:
    function handleChange({ target }) {
        const field = target.name
        const value = target.value

        setTodoToEdit(prevTodo => ({ ...prevTodo, [field]: value }))
    }


    const { task, assignee, priority } = todoToEdit
    if (!task && todoId) return <Spinner className="spinner" thickness='4px' speed='0.65s' emptyColor='gray.200' color='blue.500' size='xl' />
    return (
        <>
            <section className="todo-edit flex column">
                <h1>{todoId ? 'Edit' : 'Add'} Task</h1>
                <form className="flex column" onSubmit={onSaveTodo}>

                    <div className="input-container">
                        <Text mb='8px'>Task: </Text>
                        <Input onChange={handleChange} value={task} type="text" name="task" isRequired />
                    </div>

                    <div className="input-container">
                        <Text mb='8px'>Assignee: </Text>
                        <Input onChange={handleChange} value={assignee} type="text" name="assignee" isRequired />
                    </div>

                    <div className="input-container">
                        <Text mb='8px'>Select priority: </Text>
                        <Select onChange={handleChange} name="priority" value={priority}>
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                        </Select>
                    </div>

                    <ButtonGroup spacing='6'>
                        <Button type="submit" colorScheme='blue'>{todoId ? 'Save' : 'Add'}</Button>
                        <Link to="/todo"> <Button>Cancel</Button></Link>
                    </ButtonGroup>

                </form>
            </section>
            <div className="modal-overlay"></div>
        </>
    )

}
