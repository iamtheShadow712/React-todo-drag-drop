import './App.css'
import TodoBoard from './components/TodoBoard'
import Modal from './components/Modal'
import useModalStore from './store/modal.store'

function App() {
  const showModal = useModalStore(state => state.showModal)

  return (
    <div className='bg-amber-100 text-black h-screen relative'>

      <div className='w-[80%] xl:w-[60%] h-full mx-auto'>
        <TodoBoard />
      </div>
      {showModal && <Modal />}
    </div>
  )
}

export default App
