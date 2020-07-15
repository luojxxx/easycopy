import React from "react";
import PropTypes from "prop-types";
import { Flex, Text } from "rebass";

const MessageField = ({ isCreatePage, copied, submissionError }) => {
  let msg
  if (isCreatePage && !submissionError) {
    msg = "";
  }
  if (isCreatePage && submissionError) {
    msg = "Sorry there was an error, we'll be fixing it soon";
  }
  if (!isCreatePage && !copied) {
    msg = "Expires after a month";
  }
  if (!isCreatePage && copied) {
    msg = "copied url";
  } 
  return (
    <Flex width={1} justifyContent="center" style={{ textAlign: "center" }}>
      <Text color="primary">
        { msg || <span>&nbsp;</span>}
      </Text>
    </Flex>
  );
};

MessageField.propTypes = {
  isCreatePage: PropTypes.bool.isRequired,
  copied: PropTypes.bool.isRequired,
  submissionError: PropTypes.bool.isRequired,
};

export default MessageField;