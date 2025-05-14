import React, { useEffect, useState } from 'react'
import Column from './Column'
import useTodoStore from '../store/todo.store'
import useModalStore from '../store/modal.store'

const TodoBoard = () => {
    const [column, setColumn] = useState({
        TODO: [],
        IN_PROGRESS: [],
        DONE: []
    })
    const todos = useTodoStore(state => state.todos)
    const setShowModal = useModalStore(state => state.setShowModal)

    useEffect(() => {
        setColumn({
            TODO: todos.filter(todo => todo.status === "TODO"),
            IN_PROGRESS: todos.filter(todo => todo.status === "IN_PROGRESS"),
            DONE: todos.filter(todo => todo.status === "DONE"),
        })
    }, [todos])

    const handleClick = () => {
        setShowModal(true, "CREATE_TODO")
    }

    return (
        <div className='pt-5'>
            <div className='flex justify-between items-center'>
                <h1 className='text-3xl font-semibold uppercase text-orange-400'>Todos</h1>
                <button className='w-[150px] py-1 rounded-lg bg-orange-500 hover:bg-orange-600 cursor-pointer font-semibold text-lg text-white' onClick={handleClick}>Create Todo</button>
            </div>
            <div className='flex justify-between gap-5'>
                <Column type="todo" todos={column.TODO} title="Todo" />
                <Column type="in_progress" todos={column.IN_PROGRESS} title="In Progress" />
                <Column type="done" todos={column.DONE} title="Done" />
            </div>
        </div>
    )
}

export default TodoBoard