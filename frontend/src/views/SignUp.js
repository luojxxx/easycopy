import React, { useState } from "react";
import { Flex, Box, Heading, Text } from "rebass";
import { Label } from "@rebass/forms";
import axios from "axios";
import { useHistory } from "react-router-dom";

import { api } from "../constants";
import Template from "../components/Template";
import Input from "../components/Input";
import Button from "../components/Button";

const SignUp = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [message, setMessage] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    if (email === "") {
      setMessage("Email can't be blank");
    } else if (password === "") {
      setMessage("Password can't be blank");
    } else if (password !== confirmPassword) {
      setMessage("Passwords don't match");
    } else {
      try {
        const result = await axios({
          method: "post",
          url: api + "/signup",
          data: {
            email: email,
            password: password,
            userName: userName,
          },
        });
        const { data } = result;
        localStorage.setItem("userToken", data.userToken);
        localStorage.setItem("userName", data.user.userName);
        localStorage.setItem("email", data.user.email);
        localStorage.setItem("emailVerified", data.user.emailVerified);
        history.push("/");
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <Template>
      <form onSubmit={handleSubmit}>
        <Flex flexDirection="column" alignItems="center" width={1}>
          <Heading color="primary" pb={3}>
            SignUp
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
          <Box width={0.75} pb={3}>
            <Label htmlFor="user">Password (repeat twice to confirm)</Label>
            <Box pb={2}>
              <Input
                id="user"
                name="user"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </Box>
            <Input
              id="user"
              name="user"
              type="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
            />
          </Box>
          <Box width={0.75} pb={4}>
            <Label htmlFor="user">UserName (can be blank and changed)</Label>
            <Input
              id="user"
              name="user"
              type="text"
              onChange={(e) => setUserName(e.target.value)}
              value={userName}
            />
          </Box>
          <Button width={0.75} onClick={handleSubmit} mb={2} type="submit">
            Submit
          </Button>
          <Text color="primary">{message}</Text>
        </Flex>
      </form>
    </Template>
  );
};

export default SignUp;
