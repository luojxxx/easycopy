import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";

import AppDisplay from "./AppDisplay";
import { sleep } from "../lib";
import constants from "../constants";
const { api, contentLimit } = constants;

const App = props => {
  const { history, location } = props;
  const { pathname } = location;
  const [user, setUser] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");
  const [zeroContentFlag, setZeroContentFlag] = useState(false);
  const [submissionProcessing, setSubmissionProcessing] = useState(false);
  const [notFoundPage, setNotFoundPage] = useState(false);
  const handleUserChange = e => {
    setUser(e.target.value);
  };
  const handleContentChange = e => {
    const content = e.target.value.slice(0, contentLimit);
    setContent(content);
  };
  const handleClear = () => {
    setUser("");
    setContent("");
  };
  const handleBack = () => {
    // setUser("");
    // setContent("");
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
      const response = await axios({
        method: "post",
        url: api + '/create',
        data: {
          user: user,
          content: content
        }
      });
      sleep(300);
      setSubmissionProcessing(false);
      const url = response.data.url;
      history.push(url);
    } catch (err) {
      console.error("CreateUrl error");
      console.error(err);
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
      notFoundPage={notFoundPage}
      handleUserChange={handleUserChange}
      handleContentChange={handleContentChange}
      handleClear={handleClear}
      handleBack={handleBack}
      handleSubmit={handleSubmit}
      user={user}
      content={content}
      date={date}
    />
  );
};

export default withRouter(App);
