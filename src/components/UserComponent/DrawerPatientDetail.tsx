import { CheckOutlined, ClearOutlined, CloseCircleOutlined, SettingOutlined } from "@ant-design/icons";
import { Affix, Button, Col, Divider, Drawer, Form, Grid, Input, Row, Typography } from "antd";
import { Theme } from "antd/lib/config-provider/context";
import Paragraph from "antd/lib/skeleton/Paragraph";
import _ from "lodash";
import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import { moveOrderThroughNestedObject } from "../../utils/func/moveOrderObject";
import './DrawerPatientDetail.less';

interface DrawerPatientDetailProps<T> {
  recordSelected?: T;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const { useBreakpoint } = Grid;
const DrawerPatientDetail = <T extends object>({ recordSelected, isOpen, setIsOpen }: DrawerPatientDetailProps<T>) => {
  const [record, setRecord] = useState<T>();
  const [fieldToChangeOrder, setFieldToChangeOrder] = useState<string[][]>([]);
  const [fieldCur, fieldTarget] = fieldToChangeOrder;
  const [form] = Form.useForm();

  const screens = useBreakpoint();

  const onCloseDrawer = (e: any) => {
    setIsOpen((prev) => !prev);
    setRecord(undefined as any);
  };

  const handleNestObject = useCallback((object: any, key: string, name: string[]): any => {
    if (typeof object === "object" && object) {
      return (
        <Col
          span={24}
          key={key}
          onClick={(e) => {
            if (e && e.stopPropagation) e.stopPropagation();
            setFieldToChangeOrder((prev) => (prev.length < 2 ? [...prev, name] : [prev[0], name]));
          }}
        >
          <Divider
            orientation={name.length == 1 ? "left" : "right"}
            style={{ textTransform: name.length == 1 ? "uppercase" : "capitalize", fontSize: 19 - name.length * 2 }}
          >
            {key}
          </Divider>
          <Row gutter={[2, 2]}>
            {Object.entries(object).map(([key, value], i) => handleNestObject(value, key, [...name, key]))}
          </Row>
        </Col>
      );
    } else if (key) {
      return (
        <Col
          xs={24}
          md={12}
          key={key}
          onClick={(e) => {
            if (e && e.stopPropagation) e.stopPropagation();
            setFieldToChangeOrder((prev) => (prev.length < 2 ? [...prev, name] : [prev[0], name]));
          }}
        >
          <Form.Item name={name} label={key} style={{ textTransform: "capitalize" }}>
            <Input type="text" />
          </Form.Item>
        </Col>
      );
    }
  }, []);
  useEffect(() => {
    if (recordSelected) {
      setRecord(recordSelected);
    }
  }, [recordSelected]);
  useEffect(() => {
    form.setFieldsValue(record);
  }, [form, record]);
  console.log("recordrender ", record);
  console.log("field selected  ", fieldToChangeOrder);
  return (
    <Drawer
      title={
        <Row justify="space-between" align="middle">
          <Col span={12}>
            <Typography>Thông tin chi tiết bệnh nhân</Typography>
          </Col>
          <Col span={2} offset={6}>
            <Button icon={<SettingOutlined />} />
          </Col>
        </Row>
      }
      placement="right"
      closable
      onClose={onCloseDrawer}
      open={isOpen}
      width={!screens.md ? "100%" : "70%"}
      destroyOnClose
    >
      <Affix offsetTop={0} target={() => document.querySelector('.ant-drawer-body') as any} >
        <Row gutter={4} justify='space-between' align="middle" className="affix-container" >
          <Col span={8}>
            <Input
              type="text"
              allowClear={{
                clearIcon: (
                  <CloseCircleOutlined onClick={() => setFieldToChangeOrder((prev) => prev.slice(1, prev.length))} />
                ),
              }}
              value={fieldCur && fieldCur.join("/")}
            />
          </Col>
          <Col span={4}>
            <Input
              type="text"
              allowClear={{
                clearIcon: (
                  <CloseCircleOutlined
                    onClick={() => setFieldToChangeOrder((prev) => prev.slice(0, prev.length - 1))}
                  />
                ),
              }}
              value={fieldTarget && fieldTarget.join("/")}
            />
          </Col>
          <Col span={8}>
            <Button
              icon={<CheckOutlined />}
              onClick={(e) => {
                setFieldToChangeOrder([]);
                fieldCur&& setRecord((prev) => moveOrderThroughNestedObject(fieldCur, fieldTarget || [], prev));
              }}
            >
              Apply
            </Button>
          </Col>
        </Row>
      </Affix>
     
        <Form
          layout="vertical"
          onFinish={(val: any) => {
            console.log(val);
          }}
          form={form}
          initialValues={record}
        >
          <Row gutter={[2, 2]}>
            {record &&
              Object.entries(record).map(([key, value], index) => {
                return handleNestObject(value, key, [key]);
              })}
          </Row>
          <Button type="primary" icon={<CheckOutlined />} htmlType="submit">
            Submit
          </Button>
        </Form>
    </Drawer>
  );
};

export default DrawerPatientDetail;
