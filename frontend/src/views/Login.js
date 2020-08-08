import React, { useState } from "react";
import { Flex, Box, Heading, Text } from "rebass";
import { Label } from "@rebass/forms";
import axios from "axios";
import { Redirect } from 'react-router-dom'

import { api } from "../constants";
import Template from "../components/Template";
import Input from "../components/Input";
import Button from "../components/Button";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [redirect, setRedirect] = useState(false);
  const handleSubmit = async () => {
    try {
      const result = await axios({
        method: "post",
        url: api + "/login",
        data: {
          email: email,
          password: password,
        },
      });
      localStorage.setItem("userToken", result.data.userToken);
      localStorage.setItem("userName", result.data.user.userName);
      localStorage.setItem("email", result.data.user.email);
      localStorage.setItem("emailVerified", result.data.emailVerified);

      setRedirect(true)
    } catch (err) {
      console.log(err);
      setMessage("Bad login");
    }
  };
  return (
    <Template>
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
          <Label htmlFor="user">Password</Label>
          <Input
            id="user"
            name="user"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </Box>
        <Button width={0.75} onClick={handleSubmit} mb={2}>
          Submit
        </Button>
        <Text color="primary">{message}</Text>
      </Flex>
      {redirect && (
        <Redirect to='urls' />
      )}
    </Template>
  );
};

export default Login;
