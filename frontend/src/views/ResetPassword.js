import React, { useState } from "react";
import { Flex, Box, Heading, Text } from "rebass";
import { Label } from "@rebass/forms";
import axios from "axios";
import { useHistory } from "react-router-dom";

import { api } from "../constants";
import Template from "../components/Template";
import Input from "../components/Input";
import Button from "../components/Button";
import Loader from '../components/Loader'

import { AccountContextConsumer } from "../providers/AccountProvider";

const ResetPassword = ({ accountContext }) => {
  const history = useHistory();
  const [loading, setLoading] = useState(false)
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === "") {
      setMessage("Password can't be blank");
    } else if (password !== confirmPassword) {
      setMessage("Passwords don't match");
    } else {
      try {
        setLoading(true)
        const result = await axios({
          method: "post",
          url: api + "/resetpassword",
          data: {
            resetPasswordToken: window.location.href
              .replace(window.location.origin, "")
              .replace("/resetpassword/", ""),
            newPassword: confirmPassword,
          },
        });
        const { data } = result;
        localStorage.setItem("userToken", data.userToken);
        accountContext.setEmail(data.user.email);
        accountContext.setUserName(data.user.userName);
        accountContext.setEmailVerified(data.user.emailVerified);
        history.push("/");
        setLoading(false)
      } catch (err) {
        console.log(err);
        setLoading(false)
        setMessage("Reset password error");
      }
    }
  };
  
  return (
    <Template>
      <form onSubmit={handleSubmit}>
        <Flex flexDirection="column" alignItems="center" width={1}>
          <Heading color="primary" pb={3}>
            Reset Password
          </Heading>
          <Box width={0.75} pb={3}>
            <Label htmlFor="password1">Password (Enter twice to confirm)</Label>
            <Input
              id="password1"
              name="password1"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </Box>
          <Box width={0.75} pb={4}>
            <Input
              id="password2"
              name="password2"
              type="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
            />
          </Box>
          {loading ? (
            <Loader />
          ) : (
            <Button width={0.75} mb={2} type="submit">
              Submit
            </Button>
          )}
          <Text color="primary">{message}</Text>
        </Flex>
      </form>
    </Template>
  );
};

const WrappedResetPassword = () => (
  <AccountContextConsumer>
    {(accountContext) => <ResetPassword accountContext={accountContext} />}
  </AccountContextConsumer>
);

export default WrappedResetPassword;
