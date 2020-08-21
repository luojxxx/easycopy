import React, { useState } from "react";
import { Flex, Box, Heading, Text } from "rebass";
import { Label } from "@rebass/forms";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";

import { api } from "../constants";
import Template from "../components/Template";
import Input from "../components/Input";
import Button from "../components/Button";
import { AccountContextConsumer } from "../providers/AccountProvider";

const Login = ({ accountContext }) => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios({
        method: "post",
        url: api + "/login",
        data: {
          email: email,
          password: password,
        },
      });
      const { data } = result;
      localStorage.setItem("userToken", data.userToken);
      accountContext.setEmail(data.user.email);
      accountContext.setUserName(data.user.userName);
      accountContext.setEmailVerified(data.user.emailVerified);
      history.push("/urls");
    } catch (err) {
      console.log(err);
      setMessage(err.response.data);
    }
  };
  return (
    <Template>
      <form onSubmit={handleSubmit}>
        <Flex flexDirection="column" alignItems="center" width={1}>
          <Heading color="primary" pb={3}>
            Login
          </Heading>
          <Box width={0.75} pb={3}>
            <Label htmlFor="user">Email</Label>
            <Input
              id="user"
              name="user"
              type="text"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </Box>
          <Box width={0.75} pb={4}>
            <Flex flexDirection="row" justifyContent="flex-start">
              <Text color="primary">Password</Text>
              &nbsp;
              <Link to="sendpasswordreset">
                <Text color="primary">(Reset password)</Text>
              </Link>
            </Flex>
            <Input
              id="user"
              name="user"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </Box>
          <Button width={0.75} mb={2} type="submit">
            Submit
          </Button>
          <Text color="primary">{message}</Text>
        </Flex>
      </form>
    </Template>
  );
};

const WrappedLogin = () => (
  <AccountContextConsumer>
    {(accountContext) => <Login accountContext={accountContext} />}
  </AccountContextConsumer>
);

export default WrappedLogin;
