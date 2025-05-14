import { create } from 'zustand'

const todos = [];

const useTodoStore = create((set) => ({
    todos: todos,
    currentTodo: null,
    createTodo: (todo) => set((state) => ({ todos: [...state.todos, todo] })),
    setCurrentTodo: (todo) => set((state) => ({ currentTodo: todo })),
    updateTodo: (status) => set((state) => ({ todos: state.todos.map(todo => todo.id === state.currentTodo?.id ? { ...todo, status } : todo), currentTodo: null }))
}))

export default useTodoStore