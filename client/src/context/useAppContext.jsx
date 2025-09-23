import { useContext } from 'react';
import { AppContext } from './AppContext'; // Correctly imports the named export from AppContext.jsx

export const useAppContext = () => {
  return useContext(AppContext);
};