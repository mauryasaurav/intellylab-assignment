import { createContext, useMemo, useState } from "react";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const values = useMemo(() => {
    return {
      loggedInUser,
      setLoggedInUser,
    };
  }, [loggedInUser, setLoggedInUser]);

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
}

export default AppContext;
