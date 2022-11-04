import { Button, Form, Input, Modal, Select } from "antd";
import React, { useState } from "react";

const dataOptions = [
  {
    label: "Number",
    type: "bigint",
  },
  {
    label: "String",
    type: "varchar",
  },
  {
    label: "Boolean",
    type: "byte",
  },
];
const ModelAddCol: React.FC<{
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setColumns: React.Dispatch<React.SetStateAction<any>>;
}> = ({ open, setOpen, setColumns }) => {
  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };
  const handleFinishAddCol = (val: any) => {
   setOpen(false);
    setColumns((prev: any) => {
      const newState = [...prev];
      newState.splice(newState.length-1,0, {
        title: val.label,
        dataIndex: val.name,
        sorter: true,
        width: 100,
        editable: true,
      })
      return newState;
    });
  };

  return (
    <>
      <Modal
        open={open}
        title="Title"
        onOk={handleFinishAddCol}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Return
          </Button>,
          <Button key="submit" htmlType="submit" type="primary" >
            Submit
          </Button>,
        ]}
        modalRender={(children)=><Form  layout="vertical" onFinish={handleFinishAddCol}>{children} </Form>}
      >
        
          <Form.Item wrapperCol={{ span: 24 }} name="name" label="Name">
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{ span: 24 }} name="label" label="Label">
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{ span: 24 }} name="type" label="DataType">
            <Select options={dataOptions.map((item) => ({ label: item.label, value: item.type }))} />
          </Form.Item>
      </Modal>
       
    </>
  );
};

export default ModelAddCol;
