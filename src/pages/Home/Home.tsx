import { Typography } from "antd";
import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <Typography.Title level={1} type="success">
        Home wer wer
      </Typography.Title>
      <Link to="/products" type="success">
        products page werwe
      </Link>
    </div>
  );
};

export default Home;
