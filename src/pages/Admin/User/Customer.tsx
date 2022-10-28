import type { ColumnsType } from "antd/es/table";
import qs from "qs";
import React, { useState } from "react";
import TableCustom, { TableParams } from "../../../components/Custom/Template/TableCustom";
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

const columnsInit: ColumnsType<DataType> = [
  // Table.SELECTION_COLUMN,
  {
    title: "Name",
    dataIndex: "name",
    sorter: true,
    render: (name) => `${name.first} ${name.last}`,
    width: 100,
  },
  {
    title: "Gender",
    dataIndex: "gender",
    filters: [
      { text: "Male", value: "male" },
      { text: "Female", value: "female" },
    ],
    width: 200,
  },
  {
    title: "Email",
    dataIndex: "email",
    sorter: true,
    width: 200,
  },
];

const getRandomuserParams = (params: TableParams) => ({
  results: params.pagination?.pageSize,
  page: params.pagination?.current,
  field:params.sortField,
  order:params.sortOrder,
  gender:params.filters?.gender?.join(","),
});

const Customer: React.FC = () => {
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
    <TableCustom rowKey="login.uuid" resizable onRowSelection={handleRowSelection} columnsInit={columnsInit} data={data} getData={fetchData} />

  );
};

export default Customer;
