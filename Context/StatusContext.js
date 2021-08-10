import { createContext, useContext, useState } from 'react';

const StatusContext = createContext()

const StatusContextProvider = StatusContext.Provider;

function StatusProvider({ children }) {
  const [connected, setConnected] = useState(false);
  
  return (
    <StatusContextProvider value={{connected,setConnected}}>{ children }</StatusContextProvider>
  )
}

function useStatus() {
  const all = useContext(StatusContext)
  return all;
}

export { StatusProvider , useStatus};