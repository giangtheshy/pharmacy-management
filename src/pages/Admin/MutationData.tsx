import { DeleteOutlined, PlusCircleOutlined, SyncOutlined } from "@ant-design/icons";
import { Button, Col } from "antd";
import type { ColumnType } from "antd/es/table";
import qs from "qs";
import React, { useState } from "react";
import TableCustom, { TableParams } from "../../components/Custom/Template/TableCustom";
import { ColumnsType } from "../../types/common";

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

const columnsInit: ColumnsType<DataType>= [
  // Table.SELECTION_COLUMN,
  {
    title: "Email",
    dataIndex: "email",
    sorter: true,
    width: 100,
    editable:true,
  },  {
    title: "First Name",
    dataIndex: ['name','first'],
    sorter: true,
    width: 100,
    editable:true,
  },
  {
    title: "Gender",
    dataIndex: "gender",
    filters: [
      { text: "Male", value: "male" },
      { text: "Female", value: "female" },
    ],
    width: 200,
    editable:true,
  },
  {
    title: "Action",
    dataIndex: "action",
    sorter: true,
    width: 200,
    editable:false,
    render: (value, record, index) => <Col>
    <Button shape="circle" icon={<SyncOutlined />} />
  </Col>,
  },
];

const getRandomuserParams = (params: TableParams) => ({
  results: params.pagination?.pageSize,
  page: params.pagination?.current,
  field:params.sortField,
  order:params.sortOrder,
  gender:params.filters?.gender?.join(","),
});

const MutationData: React.FC = () => {
  const [data, setData] = useState();


  const fetchData = async(tableParams:TableParams,callback:(total:number)=>void) => {
    fetch(`https://randomuser.me/api?${qs.stringify(getRandomuserParams(tableParams))}`)
      .then((res) => res.json())
      .then(({ results }) => {
        setData(results);
       callback(200);
      });
  };
  const handleRowSelection = (selectedRows:any,selectedRowKeys?:string)=>{
  console.log(selectedRows,selectedRowKeys);
  
  }
  console.log('customer render');
  
  return (
    <div>

<TableCustom rowKey="login.uuid" resizable editable onRowSelection={handleRowSelection} columnsInit={columnsInit} data={data} getData={fetchData} setData={setData}/>
    </div>

  );
};

export default MutationData;
