import React, { useState } from "react";
import { Flex, Box, Heading, Text } from "rebass";
import { Label } from "@rebass/forms";
import axios from "axios";

import { api } from "../constants";
import Template from "../components/Template";
import Input from "../components/Input";
import Button from "../components/Button";

const Settings = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
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
      localStorage.setItem("email", result.data.user.email)
    } catch (err) {
      console.log(err);
      setMessage('Bad login')
    }
  };
  return (
    <Template>
      <Flex flexDirection="column" alignItems="center" width={1}>
        <Heading color="primary" pb={3}>
          Settings
        </Heading>
      </Flex>
    </Template>
  );
};

export default Settings;
