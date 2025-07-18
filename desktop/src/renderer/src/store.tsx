import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ModelState {
  currentModel: string;
  setCurrentModel: (model: string) => void;
}

export const useModelStore = create<ModelState>()(
  persist(
    (set) => ({
      currentModel: '',
      setCurrentModel: (model) => set({ currentModel: model }),
    }),
    {
      name: 'ollama-current-model',
    }
  )
); 