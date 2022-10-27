import React, { FC, PropsWithChildren } from 'react'
// import "antd/dist/antd.light.less";

const LightApp : FC<PropsWithChildren> = ({ children }) => {
  console.log('light');
  return (
    <>{children}</>
  )
}

export default LightApp