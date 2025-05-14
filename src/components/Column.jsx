import { useState } from 'react';
import useTodoStore from '../store/todo.store';
import Todo from './Todo'

const Column = ({ type, todos, title }) => {
    const [isDragOver, setIsDragOver] = useState(false);
    const updateTodo = useTodoStore(state => state.updateTodo)
    const handleDragLeave = (e) => {
        e.preventDefault()
        setIsDragOver(false)
    }

    const handleDragOver = (e) => {
        e.preventDefault()
        setIsDragOver(true)
    }

    const handleDrop = (e) => {
        e.preventDefault()
        updateTodo(type.toUpperCase())
        setIsDragOver(false)
    }

    return (
        <div className={`min-h-[600px] text-white bg-gray-700 w-[300px] p-2 mt-2 border-2 ${isDragOver ? "border-purple-600" : "border-transparent"}`} onDrop={handleDrop} onDragLeave={handleDragLeave} onDragOver={handleDragOver}>
            <h1 className='text-center text-2xl'>{title}</h1>
            <div className='grid place-items-center gap-4 mt-2'>
                {todos ? todos.map(todo => (
                    <Todo key={todo.id} todo={todo} />
                )) : <h1>No Todo in this bucket</h1>}
            </div>
        </div>
    )
}

export default Column