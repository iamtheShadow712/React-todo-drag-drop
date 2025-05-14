import React, { useRef, useState } from 'react'
import useTodoStore from '../../store/todo.store'
import useModalStore from '../../store/modal.store'

const CreateTodo = () => {
    const titleRef = useRef()
    const [todo, setTodo] = useState({
        id: '',
        title: '',
        status: '',
        createdAt: ''
    })
    const todos = useTodoStore(state => state.todos)
    const createTodo = useTodoStore(state => state.createTodo)
    const setShowModal = useModalStore(state => state.setShowModal)

    const formatDate = () => {
        const date = new Date()
        const day = String(date.getDate()).padStart(2, '0')
        const month = String(date.getMonth()).padStart(2, '0')
        const year = date.getFullYear()
        return `${day}/${month}/${year}`
    }
    const handleCreateTodo = () => {
        const newTodo = {
            id: `${todos.length + 1}`,
            title: titleRef.current.value,
            status: "TODO",
            createdAt: formatDate()
        }
        setTodo(newTodo)
        createTodo(newTodo)
        setShowModal(false, null)
        setTodo({
            id: '',
            title: '',
            status: '',
            createdAt: ''
        })
    }
    return (
        <div className='w-[300px]'>
            <h1 className='text-center text-2xl font-bold mb-3'>Create Todo</h1>
            <div className='flex flex-col'>
                <textarea ref={titleRef} type="text" name="title" id='title' placeholder='Enter Title' className='border-2 p-2 rounded-lg ' />
            </div>
            <div className='mt-5 flex justify-around'>
                <button className='w-[120px] py-1 text-md text-white bg-amber-500 hover:bg-amber-600 rounded-lg cursor-pointer' onClick={handleCreateTodo}>Create</button>
                <button className='w-[120px] py-1 text-md text-white bg-amber-500 hover:bg-amber-600 rounded-lg cursor-pointer' onClick={() => { setShowModal(false, null) }}>Cancel</button>
            </div>
        </div>
    )
}

export default CreateTodo