import { useState, useEffect } from "react"
import { ReactTable } from "../cmps/ReactTable"
import { todoService } from "../services/todo.service"
import { Link, Outlet, useLocation } from "react-router-dom";

import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import { Button, Spinner } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import ApprovedOrderImage from '../assets/imgs/ApprovedOrder.png';


export function TodoIndex() {
    const [todos, setTodos] = useState(null)
    const { pathname } = useLocation()

    useEffect(() => {
        loadTodos()
    }, [pathname])   // pathname is added to useEffect dependencies to reload todos when navigating


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

            // Delete confirmation
            const result = await Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            })
            if (!result.isConfirmed) return

            await todoService.remove(todoId)

            // Update local state after service removal
            setTodos(todos => todos.filter(todo => todo._id !== todoId))
            toast.success('Todo was successfully removed!')
        } catch (err) {
            console.log(err)
            toast.error('Something went wrong, cannot remove todo')
        }
    }

    if (!todos) return <Spinner className="spinner" thickness='4px' speed='0.65s' emptyColor='gray.200' color='blue.500' size='xl' />

    return (
        <section className="todo-index">
            <div className="index-header flex">
                <h1>TODO LIST</h1>
                <div><img src={ApprovedOrderImage} /></div>
            </div>
            <Link className="add-btn" to="/todo/edit">
                <Button size='lg' leftIcon={<AddIcon />} colorScheme='pink' variant='solid'>New Task</Button>
            </Link>
            <ReactTable
                data={todos}
                onRemoveTodo={onRemoveTodo}
            />
            <Outlet />
        </section>
    )
}
