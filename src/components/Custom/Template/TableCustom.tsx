import { CloseOutlined, DeleteOutlined, EditOutlined, PlusCircleOutlined, SaveOutlined } from "@ant-design/icons";
import { Button, Col, Form, Popconfirm, Row, Table, TablePaginationConfig, Typography } from "antd";
import { ColumnType, FilterValue, SorterResult } from "antd/lib/table/interface";
import _ from "lodash";
import { get } from "lodash";
import React, { useEffect, useMemo, useState } from "react";
import { ResizeCallbackData } from "react-resizable";
import { ColumnsType } from "../../../types/common";
import ResizableTitle from "../Func/ResizableTitle";
import EditableCell from "./EditableCell";
import ModelAddCol from "./ModelAddCol";

export interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue | null>;
}
export enum TypeActionTable {
  ADD_ROW = "ADD_ROW",
}
interface TableCustomProps<T, K> {
  columnsInit: ColumnsType<T>;
  data: any;
  defaultPageSize?: number;
  rowKey: string;
  resizable?: boolean;
  editable?: boolean;
  setData?: React.Dispatch<React.SetStateAction<any>>;
  getData: (tableParams: TableParams, callback: (total: number) => void) => Promise<void>;
  onRowSelection?: (selectedRows: T, selectedRowKeys?: string) => void;
}
const TableCustom = <T extends object, K extends object>({
  columnsInit,
  data,
  defaultPageSize = 10,
  rowKey,
  resizable,
  editable,
  setData = () => {},
  getData,
  onRowSelection,
}: TableCustomProps<T, K>) => {
  const [loading, setLoading] = useState(false);
  const [columns, setColumns] = useState(columnsInit);
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: defaultPageSize,
    },
  });
  const [editingKey, setEditingKey] = useState("");
  const [openModelAddCol, setOpenModelAddCol] = useState(false);

  const [form] = Form.useForm();

  const isEditing = (record: T) => get(record, rowKey) === editingKey;
  const fetchData = () => {
    setLoading(true);

    getData(tableParams, (total: number) => {
      setTableParams((prev) => ({ ...prev, pagination: { ...prev.pagination, total } }));
      setLoading(false);
    });
  };
  const handleResize =
    (index: number) =>
    (_: React.SyntheticEvent<Element>, { size }: ResizeCallbackData) => {
      setColumns((prev: ColumnsType<T>) =>
        prev.map((item: any, i: number) => (i === index ? { ...item, width: size.width } : item)),
      );
    };
  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<T> | SorterResult<T>[],
  ): void => {
    setTableParams({
      pagination,
      filters,
      sortOrder: (sorter as any).order,
      sortField: (sorter as any).field,
    });
  };
  const edit = (record: T) => {
    form.setFieldsValue({ ...record });
    setEditingKey(get(record, rowKey));
  };

  const cancel = () => {
    setEditingKey("");
    form.resetFields();
    if (editingKey === TypeActionTable.ADD_ROW) {
      remove(_.set({},rowKey,editingKey) as T);
    }
  };

  const save = async (record: T) => {
    try {
      const row = (await form.validateFields()) as T;
      console.log(setData);

      const newData = [...data];
      const index = newData.findIndex((item) => get(record, rowKey) === get(item, rowKey));
      if (index > -1) {
        newData.splice(index, 1, _.merge(record, row));
        setData(newData);
        setEditingKey("");
      } else {
        newData.push(_.merge(record, row));
        setData(newData);
        setEditingKey("");
      }
      form.resetFields();
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };
  const remove = async (record: T) => {
    setData((prev: any) =>
      prev.filter((item: any) => {
        console.log(item);
        return _.get(item, rowKey) !== _.get(record, rowKey);
      }),
    );
  };
  const handleAddRow = () => {
    const newRow = _.set({}, rowKey, TypeActionTable.ADD_ROW);
    setData((prev: any) => [newRow, ...prev.slice(0, defaultPageSize - 1)]);
    setEditingKey(TypeActionTable.ADD_ROW);
    form.resetFields();
  };
  const handleAddCol = () => {
    setOpenModelAddCol((prev) => !prev);
  };
  const mergeColumns: ColumnsType<T> = useMemo(
    () =>
      columns?.map((col: any, index: number) => {
        let tempCol = { ...col };
        if (editable && col.editable) {
          tempCol = {
            ...tempCol,
            onCell: (record: T) => ({
              record,
              inputType: col.dataIndex === "age" ? "number" : "text",
              dataIndex: col.dataIndex,
              title: col.title,
              editing: isEditing(record),
            }),
          };
        }
        if (resizable) {
          tempCol = {
            ...tempCol,
            onHeaderCell: (column: ColumnType<T>) => ({
              width: (column as ColumnType<T>).width,
              onResize: handleResize(index),
            }),
          };
        }
        if (editable && !col.editable && index == columns.length - 1) {
          tempCol = {
            ...tempCol,
            render: (_: any, record: T) => {
              const isEdit = isEditing(record);

              return (
                <Row gutter={[4, 4]} justify="center" align="middle">
                  {isEdit ? (
                    <>
                      <Col>
                        <Button type="primary" shape="circle" icon={<SaveOutlined />} onClick={() => save(record)} />
                      </Col>
                      <Col>
                          <Button type="ghost" style={{ color: "red" }} shape="circle" icon={<CloseOutlined />} onClick={cancel} />
                      </Col>
                    </>
                  ) : (
                    <>
                      {" "}
                      <Col>
                        <Button type="primary" shape="circle" icon={<EditOutlined />} onClick={() => edit(record)} />
                      </Col>
                      <Col>
                        <Popconfirm
                          title="Sure to remove?"
                          onConfirm={() => {
                          
                            remove(record);
                          }}
                        >
                          <Button type="ghost" danger shape="circle" icon={<DeleteOutlined />} />
                        </Popconfirm>
                      </Col>
                      {col.render && col.render()}
                    </>
                  )}
                </Row>
              );
            },
          };
        }
        return tempCol;
      }),
    [JSON.stringify(columns), editingKey],
  );

  const mergeComponent = () => {
    let tempComponent = {};
    if (resizable) {
      tempComponent = {
        ...tempComponent,
        header: {
          cell: ResizableTitle,
        },
      };
    }
    if (editable) {
      tempComponent = {
        ...tempComponent,
        body: {
          cell: EditableCell,
        },
      };
    }
    return tempComponent;
  };

  useEffect(() => {
    fetchData();
  }, [
    JSON.stringify(tableParams.filters),
    JSON.stringify(tableParams.sortField),
    JSON.stringify(tableParams.sortOrder),
    JSON.stringify({ ...tableParams.pagination, total: 0 }),
  ]);
  console.log(mergeColumns);

  return (
    <>
      <Form form={form} component={false}>
        <Row gutter={[4, 4]} justify="start">
          <Col>
            <Button
              onClick={handleAddRow}
              type="primary"
              htmlType="button"
              style={{ marginBottom: 16 }}
              icon={<PlusCircleOutlined />}
            >
              Add row
            </Button>
          </Col>
          <Col>
            <Button
              onClick={handleAddCol}
              type="primary"
              htmlType="button"
              style={{ marginBottom: 16 }}
              icon={<PlusCircleOutlined />}
            >
              Add column
            </Button>
          </Col>
        </Row>
        <Table
          bordered
          columns={mergeColumns}
          rowKey={(record: any) => get(record, rowKey)}
          dataSource={_.cloneDeep(data)}
          pagination={tableParams.pagination}
          loading={loading}
          onChange={handleTableChange}
          rowSelection={
            onRowSelection && {
              onChange: (selectedRowKeys: any, selectedRows: any, info: any) => {
                onRowSelection && onRowSelection(selectedRows, selectedRowKeys);
              },
            }
          }
          components={mergeComponent()}
        />
      </Form>
      <ModelAddCol open={openModelAddCol} setColumns={setColumns} setOpen={setOpenModelAddCol} />
    </>
  );
};

export default TableCustom;
