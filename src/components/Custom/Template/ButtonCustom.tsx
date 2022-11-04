import { Button } from 'antd'
import React from 'react'
import "./Template.less";

const ButtonCustom : React.FC<any>= (props:any) => {
  return (
    <Button {...props} className={`${props.className} btn-custom`}>{props.children}</Button>
  )
}

export default ButtonCustom