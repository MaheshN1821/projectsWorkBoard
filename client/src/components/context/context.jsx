import { createContext, useState } from "react";

export const GlobalContext = createContext({
  singleProjectData: [],
  setSingleProjectData: () => {},
});

function GlobalState({ children }) {
  const [singleProjectData, setSingleProjectData] = useState([]);
  return (
    <GlobalContext.Provider value={{ singleProjectData, setSingleProjectData }}>
      {children}
    </GlobalContext.Provider>
  );
}

export default GlobalState;
