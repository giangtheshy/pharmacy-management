import React from "react";
import { useNavigate } from "react-router-dom";
import "./Custom.less";

import logo from '../../images/logo.png';

interface Props {
  onClick: (value: string) => void;
}
const Logo: React.FC<Props> = ({ onClick }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
    onClick("/");
  };
  return (
    <div className="logo">
      <img
        src={logo}
        alt="logo"
        onClick={handleClick}
      />
    </div>
  );
};

export default Logo;
