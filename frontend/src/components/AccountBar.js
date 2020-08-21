import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Text } from "rebass";
import axios from "axios";
import { useHistory } from "react-router-dom";

import { api } from "../constants";
import { AccountContextConsumer } from "../providers/AccountProvider";

const AccountBar = ({ accountContext }) => {
  const history = useHistory();
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
      console.log(err);
    }
    localStorage.removeItem("userToken");
    accountContext.setEmail(null);
    accountContext.setUserName(null);
    accountContext.setEmailVerified(null);
    history.push("/");
  };
  return !accountContext.email ? (
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
      {/* <Link to="/premium">
        <Text px={1} color="primary">
          Premium
        </Text>
      </Link>
      <Text color="primary">/</Text> */}
      <Link to="/settings">
        <Text px={1} color="primary">
          Settings
        </Text>
      </Link>
      <Text color="primary">/</Text>
      <Text
        px={1}
        color="primary"
        onClick={handleSignOut}
        style={{ cursor: "pointer" }}
      >
        Sign out
      </Text>
    </Fragment>
  );
};

const WrappedAccountBar = () => (
  <AccountContextConsumer>
    {(accountContext) => <AccountBar accountContext={accountContext} />}
  </AccountContextConsumer>
);

export default WrappedAccountBar;
