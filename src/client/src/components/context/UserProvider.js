import React, { useState, useEffect } from "react";
import { eTokenStatus } from "../../constants/tokenStatus";
import { checkAuth, getUserInfo } from "../../Api";

export const UserContext = React.createContext();

export function UserProvider({ children }) {
  const [tokenStatus, setTokenStatus] = useState(eTokenStatus.NOTOKEN);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});

  const refetch = async () => {
    console.log("inside refetch");
    const { auth } = await checkAuth();
    console.log({ auth });
    setTokenStatus(auth);
    setLoading(false);
  };

  useEffect(() => {
    console.log("inside useEffect");
    refetch();
  }, []);

  useEffect(() => {
    if (tokenStatus !== eTokenStatus.OK) return;
    (async () => {
      const userInfo = await getUserInfo();
      setUser(userInfo);
    })();
  }, [tokenStatus]);

  return (
    <UserContext.Provider value={[loading, tokenStatus, user, refetch]}>
      {children}
    </UserContext.Provider>
  );
}
