import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AppState {
  currentModel: string;
  isExtensionActive: boolean | null;
  setCurrentModel: (model: string) => void;
  setExtensionStatus: (isActive: boolean) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      currentModel: '',
      isExtensionActive: null,
      setCurrentModel: (model) => set({ currentModel: model }),
      setExtensionStatus: (isActive) => set({ isExtensionActive: isActive }),
    }),
    {
      name: 'app-storage',
      partialize: (state) => ({ currentModel: state.currentModel }),
    }
  )
); 