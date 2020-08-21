import React, { useEffect } from "react";
import { Flex, Box, Heading, Text } from "rebass";

import Template from "../components/Template";
import { AccountContextConsumer } from '../providers/AccountProvider'

const EmailVerified = ({ accountContext }) => {
  useEffect(() => {
    accountContext.setEmailVerified(true)
  }, [0])
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

const WrappedEmailVerified = () => (
  <AccountContextConsumer>
    {(accountContext) => (<EmailVerified accountContext={accountContext} />)}
  </AccountContextConsumer>
)

export default EmailVerified;
