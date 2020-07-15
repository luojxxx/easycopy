import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Flex, Text } from "rebass";
import { Label } from "@rebass/forms";

import constants from "./../constants";
import Input from "../components/Input";

const UserField = ({user, handleUserChange, isCreatePage}) => {
  return (
    <Fragment>
      <Flex
        flexDirection="row"
        justifyContent="space-between"
        style={{ userSelect: "None" }}
      >
        <Label htmlFor="user">User (optional)</Label>
        <span>
          <Text color="primary">{`${constants.userLimit - user.length}`}</Text>
        </span>
      </Flex>
      <Input
        id="user"
        name="user"
        type="text"
        onChange={handleUserChange}
        value={user}
        readOnly={!isCreatePage}
      />
    </Fragment>
  );
};

UserField.propTypes = {
  handleUserChange: PropTypes.func.isRequired,
  user: PropTypes.string.isRequired,
  isCreatePage: PropTypes.bool.isRequired,
};

export default UserField;