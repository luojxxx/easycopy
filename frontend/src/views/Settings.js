import React, { useState } from "react";
import { Flex, Box, Heading, Text } from "rebass";
import { Label } from "@rebass/forms";
import axios from "axios";
import { Redirect } from 'react-router-dom'

import { api } from "../constants";
import Template from "../components/Template";
import Input from "../components/Input";
import Button from "../components/Button";

const Settings = () => {
  const [email, setEmail] = useState(localStorage.getItem('email'));
  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userName, setUserName] = useState(localStorage.getItem('userName'));
  const [deleteAccountPassword, setDeleteAccountPassword] = useState("");
  const [message, setMessage] = useState("");
  const [redirect, setRedirect] = useState(false);
  const handleChangeEmail = async () => {
    setMessage("");
    if (email === "") {
      setMessage("Email can't be blank");
    } else {
      try {
        const result = await axios({
          method: "post",
          url: api + "/changeemail",
          data: {
            userToken: localStorage.getItem('userToken'),
            newEmail: email,
          },
        });
        setMessage('Successfully changed email')
      } catch (err) {
        console.log(err);
      }
    }
  };
  const handleChangePassword = async () => {
    setMessage("");
     if (password === "") {
      setMessage("Password can't be blank");
    } else if (password !== confirmPassword) {
      setMessage("Passwords don't match");
    } else {
      try {
        const result = await axios({
          method: "post",
          url: api + "/changepassword",
          data: {
            userToken: localStorage.getItem("userToken"),
            oldPassword: oldPassword,
            newPassword: password,
          },
        });
        setMessage("Successfully changed password");
      } catch (err) {
        console.log(err);
      }
    }
  };
  const handleChangeUserName = async () => {
    setMessage("");
    try {
      const result = await axios({
        method: "post",
        url: api + "/changeusername",
        data: {
          userToken: localStorage.getItem("userToken"),
          newUserName: userName,
        },
      });
      setMessage("Successfully changed username");
    } catch (err) {
      console.log(err);
    }
  };
  const handleDeleteAcount = async () => {
    setMessage("");
    try {
      const result = await axios({
        method: "post",
        url: api + "/deleteaccount",
        data: {
          userToken: localStorage.getItem("userToken"),
          password: deleteAccountPassword,
        },
      });
      localStorage.removeItem("userToken");
      localStorage.removeItem("userName");
      localStorage.removeItem("email");
      setRedirect(true)
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Template>
      <Flex flexDirection="column" alignItems="center" width={1}>
        <Heading color="primary" pb={3}>
          Settings
        </Heading>
        <Box width={0.75} pb={3}>
          <Label htmlFor="user">Email Verification</Label>
          <Text color="primary">
            {localStorage.getItem("emailVerified") === true
              ? "verified"
              : "unverified"}
          </Text>
          <Button mt={2} onClick={handleChangeEmail}>
            Send verification email
          </Button>
        </Box>
        <Box width={0.75} pb={3}>
          <Label htmlFor="user">Email</Label>
          <Input
            id="user"
            name="user"
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <Button mt={2} onClick={handleChangeEmail}>
            Change Email
          </Button>
        </Box>
        <Box width={0.75} pb={3}>
          <Label htmlFor="user">Old Password</Label>
          <Input
            id="user"
            name="user"
            type="password"
            onChange={(e) => setOldPassword(e.target.value)}
            value={oldPassword}
          />
        </Box>
        <Box width={0.75} pb={3}>
          <Label htmlFor="user">New Password (twice to confirm)</Label>
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
          <Button mt={2} onClick={handleChangePassword}>
            Change Password
          </Button>
        </Box>
        <Box width={0.75} pb={3}>
          <Label htmlFor="user">UserName (can be blank)</Label>
          <Input
            id="user"
            name="user"
            type="text"
            onChange={(e) => setUserName(e.target.value)}
            value={userName}
          />
          <Button mt={2}>Change Username</Button>
        </Box>
        <Box width={0.75} pb={3}>
          <Label htmlFor="user">Delete Account (enter password)</Label>
          <Input
            id="user"
            name="user"
            type="text"
            onChange={(e) => setDeleteAccountPassword(e.target.value)}
            value={deleteAccountPassword}
          />
          <Button mt={2} onClick={handleDeleteAcount}>
            Delete Account
          </Button>
        </Box>
        <Text color="primary" onClick={handleChangeUserName}>
          {message}
        </Text>
        {redirect && <Redirect to="/" />}
      </Flex>
    </Template>
  );
};

export default Settings;
