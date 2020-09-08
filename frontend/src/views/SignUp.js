import React, { useState } from "react";
import { Flex, Box, Heading, Text } from "rebass";
import { Label } from "@rebass/forms";
import axios from "axios";
import { useHistory } from "react-router-dom";

import { api, recaptchaSiteKeyV3, recaptchaSiteKeyV2 } from "../constants";
import Template from "../components/Template";
import Input from "../components/Input";
import Button from "../components/Button";
import { AccountContextConsumer } from "../providers/AccountProvider";

const SignUp = ({ accountContext }) => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [message, setMessage] = useState("");
  const [showRecaptcha, setShowRecaptcha] = useState(false);
  let threshold = 1;
  
  const handleSubmit = async (e) => {
    if (e instanceof Object) {
      e.preventDefault();
    }
    setMessage("");
    if (email === "") {
      setMessage("Email can't be blank");
    } else if (password === "") {
      setMessage("Password can't be blank");
    } else if (password !== confirmPassword) {
      setMessage("Passwords don't match");
    } else {
      try {
        window.grecaptcha.ready(async function () {
          const token = await window.grecaptcha.execute(recaptchaSiteKeyV3, {
            action: "submit",
          });
          const recaptchaResult = await axios({
            method: "post",
            url: api + "/verifyRecaptcha",
            data: {
              token: token,
            },
          });
          const score = recaptchaResult.data.data.score;
          const recaptchaToken = recaptchaResult.data.recaptchaToken;

          threshold = threshold * 0.5;
          if (score >= threshold) {
            setShowRecaptcha(false);
            const result = await axios({
              method: "post",
              url: api + "/signup",
              data: {
                recaptchaToken: recaptchaToken,
                email: email,
                password: password,
                userName: userName,
              },
            });
            const { data } = result;
            localStorage.setItem("userToken", data.userToken);
            accountContext.setEmail(data.user.email);
            accountContext.setUserName(data.user.userName);
            accountContext.setEmailVerified(data.user.emailVerified);
            history.push("/");
            threshold = 1;
          } else {
            setShowRecaptcha(true);
            const recaptchaContainer = document.getElementById(
              "recaptchaContainer"
            );
            const id = window.grecaptcha.render(recaptchaContainer, {
              sitekey: recaptchaSiteKeyV2,
              callback: handleSubmit,
            });
          }
        });
      } catch (err) {
        console.log(err);
        setMessage(err.response.data);
      }
    }
  };

  return (
    <Template>
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
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
          {showRecaptcha && (
            <Flex width={1} justifyContent="center" alignItems="center">
              <Box id="recaptchaContainer" />
            </Flex>
          )}
        </Flex>
      </form>
    </Template>
  );
};

const WrappedSignUp = () => (
  <AccountContextConsumer>
    {(accountContext) => <SignUp accountContext={accountContext} />}
  </AccountContextConsumer>
);

export default WrappedSignUp;
