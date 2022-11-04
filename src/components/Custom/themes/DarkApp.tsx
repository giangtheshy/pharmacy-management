import React, { FC, PropsWithChildren } from "react";
import "antd/dist/antd.dark.less";
import "../../../less/index.less";

const DarkApp: FC<PropsWithChildren> = ({ children }) => {
  console.log('dark');
  
  return <>{children}</>;
};

export default DarkApp;
