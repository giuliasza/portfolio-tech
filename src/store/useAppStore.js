import { create } from 'zustand';

export const useAppStore = create((set) => ({
  theme: 'light',
  profile: 'dev',
  toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
  toggleProfile: () => set((state) => ({ profile: state.profile === 'dev' ? 'data' : 'dev' })),
}));