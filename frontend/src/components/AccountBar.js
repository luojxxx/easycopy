import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { Text } from "rebass";
import axios from 'axios'
import { useHistory } from "react-router-dom";

import { api } from '../constants'

const AccountBar = () => {
  const history = useHistory();
  const [loggedin, setLoggedin] = useState(localStorage.getItem("email") !== null)
  const handleSignOut = async () => {
    try {
      const result = await axios({
        method: "post",
        url: api + "/signout",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
        data: {},
      });
    } catch (err) {
      console.log(err)
    }
    localStorage.removeItem("userToken");
    localStorage.removeItem("userName");
    localStorage.removeItem("email");
    setLoggedin(false)
    history.push('/')
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
