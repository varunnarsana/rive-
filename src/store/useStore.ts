import { create } from 'zustand';

interface Trend {
  id: number;
  category: string;
  title: string;
  description: string;
  imageUrl: string;
  popularity: number;
}

interface User {
  id: string;
  name: string;
  aesthetics: string[];
  matches: string[];
}

interface AppState {
  trends: Trend[];
  currentUser: User | null;
  selectedAesthetics: string[];
  setTrends: (trends: Trend[]) => void;
  setCurrentUser: (user: User | null) => void;
  setSelectedAesthetics: (aesthetics: string[]) => void;
  addAesthetic: (aesthetic: string) => void;
  removeAesthetic: (aesthetic: string) => void;
}

export const useStore = create<AppState>((set) => ({
  trends: [],
  currentUser: null,
  selectedAesthetics: [],
  
  setTrends: (trends) => set({ trends }),
  setCurrentUser: (user) => set({ currentUser: user }),
  setSelectedAesthetics: (aesthetics) => set({ selectedAesthetics: aesthetics }),
  
  addAesthetic: (aesthetic) =>
    set((state) => ({
      selectedAesthetics: [...state.selectedAesthetics, aesthetic],
    })),
    
  removeAesthetic: (aesthetic) =>
    set((state) => ({
      selectedAesthetics: state.selectedAesthetics.filter((a) => a !== aesthetic),
    })),
})); 