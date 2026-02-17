import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './slices/uiSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      ui: uiReducer,
      // Tu ajouteras tes slices ici (ex: auth, courses, ui)
    },
  })
}

// Types inférés
export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
