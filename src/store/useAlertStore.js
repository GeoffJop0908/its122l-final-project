import { create } from 'zustand';

const useMessageStore = create((set) => ({
  messages: [],

  addMessage: (message, type) => {
    const id = Date.now(); // Unique ID for each message

    set((state) => ({
      messages: [...state.messages, { id, message, type }],
    }));

    // Remove message after 3 seconds
    setTimeout(() => {
      set((state) => ({
        messages: state.messages.filter((msg) => msg.id !== id),
      }));
    }, 3000);
  },
}));

export default useMessageStore;
