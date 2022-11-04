import { Input, List } from 'antd'
import React, { FC, useEffect, useState } from 'react'
import { columns } from '../../config/tempApi';


interface ListColumnProps{
  keyItem:string;
}
const ListColumn :FC<ListColumnProps> = ({keyItem}) => {
  const [columnsOption, setColumnsOption] = useState<string[]>([])
  useEffect(() => {
    setColumnsOption(columns[keyItem as keyof typeof columns])
  }, [keyItem])
  console.log(keyItem);
  
  return (
    <List
    header={<div>Header</div>}
    footer={<div>Footer</div>}
    bordered
    dataSource={columnsOption}
    renderItem={item => (
      <List.Item key={item}>
        <Input value={item}></Input>
      </List.Item>
    )}
    
  />
  )
}

export default ListColumn