import React, { FC, PropsWithChildren, useState } from "react";
import "./LayoutAdmin.less";

import { DesktopOutlined, FileOutlined, PieChartOutlined, TeamOutlined, UserOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Layout, Menu } from "antd";
import theme from "../../config/theme";
import HeaderCustomAdmin from "../Header/HeaderCustomAdmin";
import Logo from "../Custom/Logo";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/reducers";

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(label: React.ReactNode, key: React.Key, icon?: React.ReactNode, children?: MenuItem[]): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}



const LayoutAdmin:FC<PropsWithChildren> = ({children}) => {


  return (
    <Layout   style={{ minHeight: "100vh" }}>
      
      <Layout className="site-layout">
        <HeaderCustomAdmin/>
        <Content style={{ margin: "0 5px" }}>
          
          <div className="site-layout-background" style={{padding:16,  minHeight: "100%" }}>
           {children}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>HPT Corporation©2022 Created by HAS</Footer>
      </Layout>
    </Layout>
  );
};

export default LayoutAdmin;
