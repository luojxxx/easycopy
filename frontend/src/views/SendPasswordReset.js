import React, { useState } from "react";
import { Flex, Box, Heading, Text } from "rebass";
import { Label } from "@rebass/forms";
import axios from "axios";
import { useHistory } from "react-router-dom";

import { api } from "../constants";
import Template from "../components/Template";
import Input from "../components/Input";
import Button from "../components/Button";

const SendResetPassword = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email === "") {
      setMessage("Email can't be blank");
    } else {
      try {
        const result = await axios({
          method: "post",
          url: api + "/sendresetpasswordemail",
          data: {
            email: email,
          },
        });
        setMessage("Successfully sent password reset, please check email");
      } catch (err) {
        console.log(err);
        setMessage("Error");
      }
    }
  };
  return (
    <Template>
      <form onSubmit={handleSubmit}>
        <Flex flexDirection="column" alignItems="center" width={1}>
          <Heading color="primary" pb={3}>
            Forgotten Password
          </Heading>
          <Box width={0.75} pb={3}>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="text"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
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

export default SendResetPassword;
