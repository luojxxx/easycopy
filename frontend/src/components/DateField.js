import React from "react";
import PropTypes from "prop-types";
import { Box, Text } from "rebass";

import Clock from "../components/Clock";

const DateField = ({dateFormat, dateDisplay, isCreatePage}) => {
  return (
    <Box width={1} pb={3}>
      <Text color="primary">
        Date: {isCreatePage ? <Clock format={dateFormat} /> : dateDisplay}
      </Text>
    </Box>
  );
};

DateField.propTypes = {
  dateFormat: PropTypes.string.isRequired,
  dateDisplay: PropTypes.string.isRequired,
  isCreatePage: PropTypes.bool.isRequired,
};

export default DateField;