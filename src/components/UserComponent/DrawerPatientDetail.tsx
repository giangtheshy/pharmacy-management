import { Col, Drawer, Input, Row, Typography } from 'antd';
import { Theme } from 'antd/lib/config-provider/context';
import Paragraph from 'antd/lib/skeleton/Paragraph';
import _ from 'lodash';
import React, { FC, useEffect, useState } from 'react'

interface DrawerPatientDetailProps<T>{
  recordSelected?:T;
  setRecordSelected:(data:T|undefined)=>void
}
const DrawerPatientDetail=<T extends object> ({recordSelected,setRecordSelected}:DrawerPatientDetailProps<T>) => {
  
  const [openDrawer, setOpenDrawer] = useState(false)

  
  const onCloseDrawer = (e: any)=>{
    setOpenDrawer(prev=>!prev)
    setRecordSelected(undefined)
  }
  useEffect(() => {
    if(recordSelected){
      setOpenDrawer(true);
    }
  }, [recordSelected])
//   const merged = recordSelected&&_.flatMap(Object.entries(recordSelected as any), ({superObjectName, subObject}:any) =>
//     _.map(Object.entries(subObject), ({subObjectName}:any) => ({
//         superObject: superObjectName,
//         subObject: subObjectName
//     }))
// );
const handleNestObject = (object:any,key?:string) :any=>{
  if(typeof object === "object"){
    return Object.entries(object).map(([key,value],i)=>handleNestObject(value,key))
  }else if(key){
    
    return <Col span={12} key={key}> {key} <Input type='text' value={object}  /></Col>
  }
}
console.log(recordSelected);

  return (
    <Drawer
        title="Thông tin chi tiết bệnh nhân"
        placement="right"
        closable
        onClose={onCloseDrawer}
        open={openDrawer}
    width="50%"
      >
    <Row gutter={[2,2]} >  {recordSelected&&Object.entries(recordSelected).map(([key,value],index)=>{
        return handleNestObject(value,key)
      })}</Row>
      </Drawer>
  )
}

export default DrawerPatientDetail