import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { Text } from "rebass";

const AccountBar = () => {
  const [loggedin, setLoggedin] = useState(localStorage.getItem("email") !== null)
  const handleSignOut = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userName");
    localStorage.removeItem("email");

    setLoggedin(false)
  };
  return loggedin === false ? (
    <Fragment>
      <Link to="/signup">
        <Text px={1} color="primary">
          SignUp
        </Text>
      </Link>
      <Text color="primary">/</Text>
      <Link to="/login">
        <Text px={1} color="primary">
          Login
        </Text>
      </Link>
    </Fragment>
  ) : (
    <Fragment>
      <Link to="/urls">
        <Text px={1} color="primary">
          Urls
        </Text>
      </Link>
      <Text color="primary">/</Text>
      <Link to="/settings">
        <Text px={1} color="primary">
          Settings
        </Text>
      </Link>
      <Text color="primary">/</Text>
      <Text px={1} color="primary" onClick={handleSignOut} style={{ cursor: 'pointer' }}>
        Sign out
      </Text>
    </Fragment>
  );
};

export default AccountBar;
