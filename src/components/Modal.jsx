import React from 'react'
import useModalStore from '../store/modal.store'
import CreateTodo from './form/CreateTodo'

const Modal = () => {
    const modalType = useModalStore(state => state.modalType)
    const setShowModal = useModalStore(state => state.setShowModal)
    let modalComponent = null
    switch (modalType) {
        case "CREATE_TODO":
            modalComponent = <CreateTodo />
            break;
        default:
            return
    }


    return (
        <div className="absolute inset-0 z-50">
            {/* Blurred Background */}
            <div className="absolute inset-0 bg-black/30 backdrop-blur-xs z-0" />

            {/* Modal Content */}
            <div className="absolute inset-0 flex items-center justify-center z-10" >
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    {modalComponent}
                </div>
            </div>
        </div>
    )
}

export default Modal