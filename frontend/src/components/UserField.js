import React from "react";
import PropTypes from "prop-types";
import { Box, Flex, Text } from "rebass";
import { Label } from "@rebass/forms";

import { userNameLimit } from "./../constants";
import Input from "../components/Input";

const UserField = ({ userName, handleUserNameChange, isCreatePage }) => {
  return (
    <Box width={1} pb={3}>
      <Flex
        flexDirection="row"
        justifyContent="space-between"
        style={{ userSelect: "None" }}
      >
        <Label htmlFor="user">User (optional)</Label>
        <span>
          <Text color="primary">{`${userNameLimit - userName.length}`}</Text>
        </span>
      </Flex>
      <Input
        id="user"
        name="user"
        type="text"
        onChange={handleUserNameChange}
        value={userName}
        readOnly={!isCreatePage}
      />
    </Box>
  );
};

UserField.propTypes = {
  handleUserChange: PropTypes.func.isRequired,
  userName: PropTypes.string.isRequired,
  isCreatePage: PropTypes.bool.isRequired,
};

export default UserField;
