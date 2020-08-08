import React, { useState, useEffect } from "react";
import { Flex, Box, Heading, Text } from "rebass";
import { Label } from "@rebass/forms";
import axios from "axios";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { FiX } from "react-icons/fi";

import { api } from "../constants";
import Template from "../components/Template";
import Input from "../components/Input";
import Button from "../components/Button";

import { dateFormat } from "../constants";

const EmailVerified = () => {
  return (
    <Template>
      <Flex flexDirection="column" alignItems="center" width={1}>
        <Heading color="primary" pb={3}>
          Email Verified
        </Heading>
      </Flex>
    </Template>
  );
};

export default EmailVerified;
