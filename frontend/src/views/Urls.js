import React, { useState, useEffect, Fragment } from "react";
import { Flex, Box, Heading, Text } from "rebass";
import { Label } from "@rebass/forms";
import axios from "axios";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { FiX } from "react-icons/fi";

import { api, pageSize } from "../constants";
import Template from "../components/Template";
import Input from "../components/Input";
import Button from "../components/Button";
import Pagination from "../components/Pagination";

import { dateFormat } from "../constants";

const Urls = () => {
  const [loading, setLoading] = useState(false)
  const [urls, setUrls] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);

  useEffect(() => {
    setLoading(true)
    const getUrls = async () => {
      try {
        const result = await axios({
          method: "post",
          url: api + "/getuserurls",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
          params: {
            page: page,
          },
        });
        setUrls(result.data.list);
        setTotal(result.data.total);
      } catch (err) {
        console.log(err);
      }
      setLoading(false)
    };
    getUrls();
  }, [page]);

  const handleDelete = async (urlId) => {
    try {
      await axios({
        method: "post",
        url: api + "/deleteuserurl",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
        data: {
          urlId: urlId,
        },
      });
      setUrls(urls.filter((ele) => ele.urlId !== urlId));
    } catch (err) {
      console.log(err);
    }
  };
  
  return (
    <Template>
      <Flex flexDirection="column" alignItems="center" width={1}>
        <Heading color="primary" pb={3}>
          Urls
        </Heading>
        <Flex flexDirection="column" alignItems="center" width={1}>
          {!loading && urls.length === 0 && (
            <Heading color="primary" fontSize={3}>
              [New links you create will show up here]
            </Heading>
          )}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "auto auto auto",
              gridGap: "3px 10px",
            }}
          >
            {urls.map((ele, idx) => (
              <Fragment key={ele.url}>
                <div
                  style={{
                    gridColumnStart: 1,
                    gridColumnEnd: 2,
                    gridRowStart: idx + 1,
                    gridRowEnd: idx + 2,
                  }}
                >
                  <Link to={ele.url}>
                    <Text color="primary">{ele.url} </Text>
                  </Link>
                </div>
                <div
                  style={{
                    gridColumnStart: 2,
                    gridColumnEnd: 3,
                    gridRowStart: idx + 1,
                    gridRowEnd: idx + 2,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  <Text color="primary">{ele.content} </Text>
                </div>
                <div
                  style={{
                    gridColumnStart: 3,
                    gridColumnEnd: 4,
                    gridRowStart: idx + 1,
                    gridRowEnd: idx + 2,
                  }}
                >
                  <Text color="primary">
                    <FiX
                      size={20}
                      style={{ cursor: "pointer" }}
                      onClick={() => handleDelete(ele.urlId)}
                    />
                  </Text>
                </div>
              </Fragment>
            ))}
          </div>
          {total !== 0 && <Pagination total={total} pageSize={pageSize} setPage={setPage} page={page} />}
        </Flex>
      </Flex>
    </Template>
  );
};

export default Urls;
