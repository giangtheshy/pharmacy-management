import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Avatar, Button, Col, Image, Row } from "antd";
import { ColumnType } from "antd/lib/table";
import qs from "qs";
import React, { Suspense, useEffect, useState } from "react";
import TableCustom, { TableParams } from "../../../components/Custom/Template/TableCustom";
import { ColumnsType } from "../../../types/common";
import "./User.less";

interface DataType {
  name: {
    first: string;
    last: string;
  };
  gender: string;
  email: string;
  login: {
    uuid: string;
  };
}

const columnsInit:ColumnsType<DataType>= [
  {
    title: "Avatar",
    dataIndex: "picture",
    render: (picture) => (
      <Avatar
        size={"default"}
        alt="avatar"
        src={<Image src={picture.medium} preview={false} style={{ width: 32 }} />}
      />
    ),
    width: 50,
    editable:true,
  },
  {
    title: "Name",
    dataIndex: "name",
    sorter: true,
    render: (name) => `${name.first} ${name.last}`,
    width: 100,
    editable:true,
  },
  {
    title: "Phone",
    dataIndex: "phone",
    width: 100,
    editable:true,
  },
  {
    title: "Email",
    dataIndex: "email",
    sorter: true,
    width: 100,
    editable:true,
  },
  {
    title: "Action",
    dataIndex: "action",
    width: 100,
    fixed:'right',
    render: (value, record, index) => <></>,
  },
];

const getRandomuserParams = (params: TableParams) => ({
  results: params.pagination?.pageSize,
  page: params.pagination?.current,
  field: params.sortField,
  order: params.sortOrder,
  gender: params.filters?.gender?.join(","),
});

let recordSelected:any = undefined;
const Patient: React.FC = () => {
  const [data, setData] = useState();
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);

  const DrawerPatientDetailLazy = React.lazy(()=>import( "../../../components/UserComponent/DrawerPatientDetail"));

  const fetchData = async (tableParams: TableParams, callback: (total: number) => void) => {
    fetch(`https://randomuser.me/api?${qs.stringify(getRandomuserParams(tableParams))}`)
      .then((res) => res.json())
      .then(({ results }) => {
        setData(results);
        callback(200);
      });
  };
  const handleRowSelection = (selectedRows: any, selectedRowKeys?: string) => {
    console.log(selectedRows, selectedRowKeys);
  };
  
  console.log("customer render");
  useEffect(() => {
    columnsInit[columnsInit.length - 1].render = (value, record, index) => (
      <Row align="middle" justify="space-evenly" gutter={2}>
        <Col>
          <Button type="ghost" shape="circle" icon={<EditOutlined />} onClick={() => {recordSelected=record;setIsOpenDrawer(true)}} />
        </Col>
        <Col>
          {" "}
          <Button shape="circle" danger icon={<DeleteOutlined />} />
        </Col>
      </Row>
    );
  }, []);

  return (
    <>
    
      <TableCustom
        rowKey="login.uuid"
        onRowSelection={handleRowSelection}
        columnsInit={columnsInit}
        data={data}
        getData={fetchData}

      />{isOpenDrawer&&
       <Suspense fallback={<p>Loading</p>}>
       <DrawerPatientDetailLazy recordSelected={recordSelected} isOpen={isOpenDrawer} setIsOpen={setIsOpenDrawer} />
       </Suspense>
      }
    </>
  );
};

export default Patient;
