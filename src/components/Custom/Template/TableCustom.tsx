import { Table, TablePaginationConfig } from "antd";
import { ColumnsType, ColumnType, FilterValue, SorterResult } from "antd/lib/table/interface";
import { get } from "lodash";
import React, { useEffect, useState } from "react";
import { ResizeCallbackData } from "react-resizable";
import ResizableTitle from "../Func/ResizableTitle";

export interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue | null>;
}
interface TableCustomProps<T, K> {
  columnsInit: ColumnsType<T>;
  data: any;
  defaultPageSize?: number;
  rowKey: string;
  resizable?: boolean;
  getData: (tableParams: TableParams, callback: (total: number) => void) => Promise<void>;
  onRowSelection?: (selectedRows: T,selectedRowKeys?:string) => void;
}
const TableCustom = <T extends object, K extends object>({
  columnsInit,
  data,
  defaultPageSize = 10,
  rowKey,resizable,
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
  const mergeColumns: ColumnsType<T> = columns?.map((col: any, index: number) => ({
    ...col,
    onHeaderCell: (column: ColumnType<T>) => ({
      width: (column as ColumnType<T>).width,
      onResize: handleResize(index),
    }),
  }));
  useEffect(() => {
    fetchData();
  }, [
    JSON.stringify(tableParams.filters),
    JSON.stringify(tableParams.sortField),
    JSON.stringify(tableParams.sortOrder),
    JSON.stringify({ ...tableParams.pagination, total: 0 }),
  ]);

  return (
    <Table
      bordered
      columns={resizable?mergeColumns:columns}
      rowKey={(record: any) =>get(record,rowKey)}
      dataSource={data}
      pagination={tableParams.pagination}
      loading={loading}
      onChange={handleTableChange}
      rowSelection={onRowSelection&&{
        onChange: (selectedRowKeys: any, selectedRows: any, info: any) => {
          onRowSelection && onRowSelection(selectedRows,selectedRowKeys);
        },
      }}
      components={resizable?{
        header: {
          cell: ResizableTitle,
        },
      }:undefined}
    />
  );
};

export default TableCustom;
