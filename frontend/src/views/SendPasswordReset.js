import React, { useState } from "react";
import { Flex, Box, Heading, Text } from "rebass";
import { Label } from "@rebass/forms";
import axios from "axios";
import { useHistory } from "react-router-dom";

import { api, recaptchaSiteKeyV3, recaptchaSiteKeyV2 } from "../constants";
import Template from "../components/Template";
import Input from "../components/Input";
import Button from "../components/Button";

const SendResetPassword = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [showButton, setShowButton] = useState(true);
  const [showRecaptcha, setShowRecaptcha] = useState(false);
  let threshold = 0.5;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email === "") {
      setMessage("Email can't be blank");
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

          if (score >= threshold) {
            setShowRecaptcha(false);
            const result = await axios({
              method: "post",
              url: api + "/sendresetpasswordemail",
              data: {
                recaptchaToken: recaptchaToken,
                email: email,
              },
            });
            setMessage("Successfully sent password reset, please check email");
            setShowButton(false);
            threshold = 0.5;
          } else {
            threshold = 0;
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
      <form onSubmit={handleSubmit} style={{ width: "100%" }}>
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
          {showButton && (
            <Button width={0.75} mb={2} type="submit">
              Submit
            </Button>
          )}
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

export default SendResetPassword;
