import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useLocation } from "react-router-dom";

import { api } from "../constants";

const { Provider, Consumer } = React.createContext();

const AccountProvider = ({ children }) => {
  const history = useHistory();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState(null);
  const [userName, setUserName] = useState(null);
  const [emailVerified, setEmailVerified] = useState(null);

  useEffect(() => {
    const updateUserData = async () => {
      try {
        const result = await axios({
          method: "post",
          url: api + "/checkUser",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
          data: {},
        });
        const { data } = result;
        setEmail(data.user.email);
        setUserName(data.user.userName);
        setEmailVerified(data.user.emailVerified);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setUserName("");
        setLoading(false);
        localStorage.removeItem("userToken");
        if (['/urls', '/settings'].includes(location.pathname)) {
          history.push("/");
        }
      }
    };
    updateUserData();
  }, [0]);
  
  return (
    <Provider
      value={{
        email: email,
        setEmail: setEmail,
        userName: userName,
        setUserName: setUserName,
        emailVerified: emailVerified,
        setEmailVerified: setEmailVerified,
      }}
    >
      {!loading && children}
    </Provider>
  );
};

export { AccountProvider, Consumer as AccountContextConsumer };
