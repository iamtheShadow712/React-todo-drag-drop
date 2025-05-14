import useTodoStore from "../store/todo.store"

const Todo = ({ todo }) => {
    const setCurrentTodo = useTodoStore(state => state.setCurrentTodo)
    const handleDragStart = () => {
        setCurrentTodo(todo)
    }

    return (
        <div className='w-[90%] h-[100px] bg-amber-50 flex flex-col justify-between p-2 pt-3 text-black rounded-2xl cursor-move' draggable onDragStart={handleDragStart} >
            <h1 className="font-bold truncate">{todo.title}</h1>
            <p className='text-xs text-gray-500 text-right'>CreatedAt: <strong>{todo.createdAt}</strong></p>
        </div>
    )
}

export default Todo