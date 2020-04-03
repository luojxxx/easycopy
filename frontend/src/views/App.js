import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import axios from "axios";

import AppDisplay from "./AppDisplay";
import { sleep } from "../lib";
import constants from "../constants";
const { api, contentLimit, userLimit, acceptedTypes } = constants;

const App = props => {
  const { history, location } = props;
  const { pathname } = location;
  const [user, setUser] = useState("");
  const [content, setContent] = useState("");
  const [type, setType] = useState("text");
  const [date, setDate] = useState("");
  const [zeroContentFlag, setZeroContentFlag] = useState(false);
  const [submissionProcessing, setSubmissionProcessing] = useState(false);
  const [submissionError, setSubmissionError] = useState(false);
  const [notFoundPage, setNotFoundPage] = useState(false);
  const handleUserChange = e => {
    const user = e.target.value.slice(0, userLimit);
    setUser(user);
  };
  const handleContentChange = e => {
    const content = e.target.value.slice(0, contentLimit);
    setContent(content);
  };
  const handleTypeChange = rawType => {
    const type = acceptedTypes.includes(rawType) ? rawType : "text";
    setType(type);
  };
  const handleClear = () => {
    setUser("");
    setContent("");
  };
  const handleBack = () => {
    setZeroContentFlag(false);
    history.push("/");
  };
  const handleSubmit = async () => {
    try {
      setNotFoundPage(false);
      if (content.length === 0) {
        return setZeroContentFlag(true);
      }
      setSubmissionProcessing(true);
      setSubmissionError(false);
      const response = await axios({
        method: "post",
        url: api + "/create",
        data: {
          user: user.toString(10),
          content: content.toString(10),
          type: type
        }
      });
      sleep(300);
      setSubmissionProcessing(false);
      const url = response.data.url;
      history.push(url);
    } catch (err) {
      console.error("CreateUrl error");
      console.error(err);
      setSubmissionProcessing(false);
      setSubmissionError(true);
    }
  };
  const handleGet = async () => {
    try {
      const response = await axios({
        method: "get",
        url: api + pathname
      });
      setNotFoundPage(false);
      setUser(response.data.user);
      setContent(response.data.content);
      setType(response.data.type);
      setDate(response.data.createdAt);
    } catch (err) {
      if (err.response.status === 404) {
        setNotFoundPage(true);
      } else {
        console.error("GetUrl error");
        console.error(err);
      }
    }
  };
  useEffect(() => {
    if (pathname !== "/") {
      handleGet();
    }
  }, [pathname]);
  return (
    <AppDisplay
      pathname={pathname}
      zeroContentFlag={zeroContentFlag}
      submissionProcessing={submissionProcessing}
      submissionError={submissionError}
      notFoundPage={notFoundPage}
      handleUserChange={handleUserChange}
      handleContentChange={handleContentChange}
      handleTypeChange={handleTypeChange}
      handleClear={handleClear}
      handleBack={handleBack}
      handleSubmit={handleSubmit}
      user={user}
      content={content}
      type={type}
      date={date}
    />
  );
};

App.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export default withRouter(App);
