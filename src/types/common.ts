import { ColumnType } from "antd/lib/table";

export type ColumnsType<T> = (ColumnType<T> & {editable?:boolean})[];