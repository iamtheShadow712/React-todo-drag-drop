import { create } from "zustand";

const useModalStore = create((set) => ({
    showModal: false,
    modalType: null,
    setShowModal: (state, type) => set((state) => ({ showModal: state, modalType: type }))
}))

export default useModalStore