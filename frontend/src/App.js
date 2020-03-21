import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import TextareaAutosize from "react-textarea-autosize";

import constants from "./constants";
const { api, contentLimit } = constants

const App = props => {
  console.log(props);
  const { history, location } = props;
  const { pathname } = location
  const [user, setUser] = useState("");
  const [content, setContent] = useState("");
  const [notFoundPage, setNotFoundPage] = useState(false)
  const handleUserChange = e => {
    setUser(e.target.value);
  };
  const handleContentChange = e => {
    const content = e.target.value.slice(0, contentLimit)
    setContent(content);
  };
  const handleSubmit = async () => {
    try {
      const response = await axios({
        method: "post",
        url: api,
        data: {
          user: user,
          content: content
        }
      });
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
        url: api+pathname 
      });
      setNotFoundPage(false)
      setUser(response.data.user)
      setContent(response.data.content)
    } catch (err) {
      if (err.response.status === 404) {
        setNotFoundPage(true)
      } else {
        console.error("GetUrl error");
        console.error(err);
      }
    }
  };
  useEffect(() => {
    if (pathname !== '/') {
      handleGet();
    }
  }, []);
  return (
    <div>
      {pathname === "/" && !notFoundPage && (
        <React.Fragment>
          <input type="text" onChange={handleUserChange} value={user} />
          <TextareaAutosize onChange={handleContentChange} value={content} />
          <button onClick={handleSubmit}>Submit</button>
        </React.Fragment>
      )}
      {pathname !== "/" && !notFoundPage && (
        <React.Fragment>
          {`User:${user}`}
          {`Content:${content}`}
        </React.Fragment>
      )}
      {pathname !== '/' && notFoundPage && (
        <React.Fragment>
          Not found
        </React.Fragment>
      )}
    </div>
  );
};

export default withRouter(App);
