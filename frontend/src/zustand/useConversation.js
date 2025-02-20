import { create } from 'zustand'

const useConversation = create((set) => ({
    // first thing i need is the current user data
    selectedConversation: null,
    setSelectedConversation: (selectedConversation) => set({ selectedConversation }),
    messages: [],
    setMessages: (messages) => set({ messages }),
}))

export default useConversation;