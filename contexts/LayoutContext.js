import { createContext } from 'react';

const LayoutContext = createContext();

export const LayoutProvider = LayoutContext.Provider;
export const LayoutConsumer = LayoutContext.Consumer;

export default LayoutContext;