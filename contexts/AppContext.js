import { createContext } from 'react';

const AppContext = createContext();

export const AppProvider = AppContext.Provider;
export const AppConsumer = AppContext.Consumer;

export default AppContext;