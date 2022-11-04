import React, { FC, PropsWithChildren, useState } from "react";
import "./Layout.less";

import { DatabaseOutlined, DesktopOutlined, EditOutlined, FileOutlined, PieChartOutlined, TeamOutlined, UserOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Layout, Menu } from "antd";
import theme from "../../config/theme";
import HeaderCustomAdmin from "../Header/HeaderCustomAdmin";
import Logo from "../Custom/Logo";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/reducers";
import { MenuInfo } from "rc-menu/lib/interface";

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

const items: MenuItem[] = [
  getItem("Thống kê", "/analytics", <PieChartOutlined />),
  getItem("Liệt kê", "/view", <DesktopOutlined />),
  getItem("Dữ liệu", "/mutation",<DatabaseOutlined />),
  getItem("Người dùng", "/user", <UserOutlined />, [getItem("Bệnh nhân", "/user/patient"), getItem("Đối tác", "/user/partner"), getItem("Khách hàng", "/user/customer")]),
  getItem("Nhân viên", "/employee", <TeamOutlined />, [getItem("Bác sĩ", "/employee/doctor"), getItem("Y tá", "/employee/nurse")]),
  getItem("Tài liệu", "/document", <FileOutlined />),
];

const LayoutAdmin:FC<PropsWithChildren> = ({children}) => {
  const [collapsed, setCollapsed] = useState(false);
  const [collapsedWidth, setCollapsedWidth] = useState(10)
  const [tabBar, setTabBar] = useState(location.pathname.replace("/admin",""))
  const navigate = useNavigate(); 
  
  const handleOnClickItem = (e: MenuInfo)=>{
    setTabBar(e.key)
    navigate(`/admin${e.key}`)
  }
  return (
    <Layout   style={{ minHeight: "100vh" }} hasSider>
      <Sider className="sidebar-admin" theme={theme} collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} collapsedWidth={collapsedWidth} breakpoint={"md"} onBreakpoint={e=>e?setCollapsedWidth(0):setCollapsedWidth(100)}>
          <Logo onClick={()=>navigate('/')} />
        <Menu theme={theme} defaultSelectedKeys={[tabBar]} selectedKeys={[tabBar]} defaultOpenKeys={[`/${tabBar.split('/')[1]}`]}  mode="inline" items={items}  onClick={(e)=>handleOnClickItem(e)}/>
      </Sider>
      <Layout  className="site-layout">
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
