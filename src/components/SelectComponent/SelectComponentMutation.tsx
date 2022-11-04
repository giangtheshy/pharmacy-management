import { Col, Input, List, Row, Select } from 'antd'
import React, { FC, useEffect, useState } from 'react'
import { masterdata,columns } from '../../config/tempApi';
import ListColumn from './ListColumn';

const { Option } = Select;

interface SelectComponentMutationProps{
  path:string;
}
const SelectComponentMutation :FC<SelectComponentMutationProps>= ({path}) => {
  const [dataOptions, setDataOptions] = useState<typeof masterdata>([])
  const [value, setValue] = useState<any>(undefined)
  useEffect(() => {
    setDataOptions(masterdata.filter(item=>item.path==path))
    setValue(undefined)
  }, [path])

  
  return (
  <Row gutter={[4,4]} align="middle" justify='center'>
    <Col span={24}>  <Select
    showSearch
    style={{ width: 200 }}
    placeholder="Search to Select"
    optionFilterProp="children"
    filterOption={(input, option) => (option!.label as unknown as string).includes(input)}
    filterSort={(optionA, optionB) =>
      (optionA!.label as unknown as string)
        .toLowerCase()
        .localeCompare((optionB!.label as unknown as string).toLowerCase())
    }
    onChange={(e)=>{
      setValue(path?`${path}/${e}`:e);
      
    }}
    value={value!==undefined?value.split('/')[value.split('/').length-1]:null}
    options={dataOptions.map(item=>({label:item.label, value:item.key}))}
  >
    {/* {dataOptions.map((item,index)=>(<Option key={index} value={item.key}>{item.label}</Option>))} */}

  </Select></Col>
  <Col span={24}>
  {value!==undefined&& <ListColumn keyItem={path===""?"cn":value.split('/')[value.split('/').length-1]}/>}
  </Col>
{ value!==undefined&& <Col span={24} offset={6}>
    <SelectComponentMutation path={value} />
  </Col>}
  </Row>
  )
}

export default SelectComponentMutation