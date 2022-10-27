import { Menu, Switch } from "antd";
import { Header } from "antd/lib/layout/layout";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { get } from "../../apis";
import { Theme } from "../../config/constant/enum";
import theme from "../../config/theme";
import { setTheme } from "../../store/actions/common.action";
import { setLogin, setUser } from "../../store/actions/user.action";
import { RootState } from "../../store/reducers";
import store from "../../store/store";
import Logo from "../Custom/Logo";
import "./Header.less";

const menuItems = [
  {
    key: "/posts",
    icon: <></>,
    label: "Posts",
  },
  {
    key: "/products",
    icon: <></>,
    label: "Products",
  },
  {
    key: "/admin",
    icon: <></>,
    label: "Admin",
  },
  {
    key: "/login",
    icon: <></>,
    label: "Login",
  },
];
const HeaderCustomAdmin = () => {
  const [tab, setTab] = useState<string>("");
  const [menuItem, setMenuItem] = useState(menuItems);
  const username = useSelector((state: RootState) => state.user.user.username);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setMenuItem((prev) =>
      prev.map((item: any) =>
        item.key === "/login"
          ? username
            ? {
                label: username,
                key: "/login",
                children: [{ label: "Logout", key: "logout" }],
              }
            : {
                label: "Login",
                key: "/login",
                icon: <></>,
              }
          : item,
      ),
    );
  }, [username]);
  useEffect(() => {
    setTab(`/${location.pathname.split("/")[1]}`);
  }, []);
  const handleClickTab = (value: string) => {
    if (value === "logout") {
      handleLogout();
    } else {
      navigate(value);
      setTab(value);
    }
  };
  const handleLogout = async () => {
    try {
      await get("/user/logout");
      localStorage.removeItem("firstLogin");
      dispatch(setLogin(false));
      dispatch(setUser({ username: "" }));
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  function toggleTheme(isChecked: boolean) {
    const themeValue = isChecked ? Theme.DARK : Theme.LIGHT;
    localStorage.setItem("theme", themeValue);
    location.reload();
  }
  return (
    <Header className={`header ${theme}`}>
      <Menu
        className="menu"
        theme={theme}
        mode="horizontal"
        defaultSelectedKeys={[tab]}
        selectedKeys={[tab]}
        onClick={(e) => handleClickTab(e.key)}
        items={menuItem}
      />
      <Switch checkedChildren="🌜" unCheckedChildren="🌞" checked={theme == Theme.DARK} onChange={toggleTheme} />
    </Header>
  );
};

export default HeaderCustomAdmin;
