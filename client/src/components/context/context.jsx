import { createContext, useState } from "react";

export const GlobalContext = createContext({
  singleProjectData: [],
  setSingleProjectData: () => {},
  userEmail: "",
  setUserEmail: () => {},
});

function GlobalState({ children }) {
  const [singleProjectData, setSingleProjectData] = useState([]);
  const [userEmail, setUserEmail] = useState("");

  return (
    <GlobalContext.Provider
      value={{
        singleProjectData,
        setSingleProjectData,
        userEmail,
        setUserEmail,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export default GlobalState;
