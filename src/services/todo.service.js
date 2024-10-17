
import { storageService } from './async-storage.service'
import { makeId, saveToStorage } from './util.service'

const STORAGE_KEY = 'todo'

export const todoService = {
    query,
    getById,
    save,
    remove,
    getEmptyTodo,
}


async function query() {
    let todos = await storageService.query(STORAGE_KEY)

    if (!todos) {
        todos = createDemoData()
        saveToStorage(STORAGE_KEY, todos)
    }

    return todos
}

function getById(todoId) {
    return storageService.get(STORAGE_KEY, todoId)
}

async function remove(todoId) {
   return await storageService.remove(STORAGE_KEY, todoId)
}

async function save(todo) {
    let savedTodo
    if (todo._id) {
        const todoToSave = {
            _id: todo._id,
            task: todo.task,
            assignee: todo.assignee,
            priority: todo.priority
        }
        savedTodo = await storageService.put(STORAGE_KEY, todoToSave)
    } else {
        const todoToSave = {
            task: todo.task,
            assignee: todo.assignee,
            priority: todo.priority
        }
        savedTodo = await storageService.post(STORAGE_KEY, todoToSave)
    }
    return savedTodo
}

function getEmptyTodo() {
    return {
        task: '',
        assignee: '',
        priority: 'High'
    }
}

function createDemoData() {
    return [
        {
            _id: makeId(),
            task: 'Fix login page bug',
            assignee: 'Jane Smith',
            priority: 'Medium'
        },
        {
            _id: makeId(),
            task: 'Update dependencies',
            assignee: 'Alex Johnson',
            priority: 'Low'
        },
        {
            _id: makeId(),
            task: 'Design new homepage layout',
            assignee: 'Emily Davis',
            priority: 'High'
        },
        {
            _id: makeId(),
            task: 'Refactor authentication module',
            assignee: 'Michael Brown',
            priority: 'Medium'
        },
        {
            _id: makeId(),
            task: 'Create new API documentation',
            assignee: 'Rachel Green',
            priority: 'High'
        },
        {
            _id: makeId(),
            task: 'Optimize database queries',
            assignee: 'Ross Geller',
            priority: 'Low'
        },
        {
            _id: makeId(),
            task: 'Conduct user research',
            assignee: 'Monica Geller',
            priority: 'High'
        },
        {
            _id: makeId(),
            task: 'Test new UI components',
            assignee: 'Chandler Bing',
            priority: 'Medium'
        },
        {
            _id: makeId(),
            task: 'Implement email notifications',
            assignee: 'Joey Tribbiani',
            priority: 'Low'
        },


 
    ]
}



