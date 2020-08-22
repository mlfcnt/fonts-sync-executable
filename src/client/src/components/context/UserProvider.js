import React, { useState, useEffect } from "react";
import { eTokenStatus } from "../../constants/tokenStatus";
import { checkAuth, getUserInfo } from "../../Api";

export const UserContext = React.createContext();

export function UserProvider({ children }) {
  const [tokenStatus, setTokenStatus] = useState(eTokenStatus.NOTOKEN);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});

  useEffect(() => {
    (async () => {
      const { auth } = await checkAuth();
      setTokenStatus(auth);
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    if (tokenStatus !== eTokenStatus.OK) return;
    (async () => {
      const userInfo = await getUserInfo();
      setUser(userInfo);
    })();
  }, [tokenStatus]);

  return (
    <UserContext.Provider value={[loading, tokenStatus, user]}>
      {children}
    </UserContext.Provider>
  );
}
