import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";

const Clock = ({ format }) => {
  const [date, setDate] = useState(dayjs().valueOf());
  useEffect(() => {
    const clearIntervalId = setInterval(() => {
      setDate(dayjs().valueOf());
    }, 1000);
    return function cleanUp() {
      clearInterval(clearIntervalId);
    };
  }, []);
  return `${dayjs(date).format(format)}`;
};

Clock.propTypes = {
  format: PropTypes.string.isRequired
};

export default Clock;
