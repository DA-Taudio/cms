import { create } from 'zustand';

export interface SliderStore {
  sliderId: string;
  setSliderId: (sliderId: string) => void;
}

const useSliderStore = create((set, get) => ({
  sliderId: null,
  setSliderId: (sliderId: string) => {
    set({
      sliderId
    });
  }
}));
export default useSliderStore;
