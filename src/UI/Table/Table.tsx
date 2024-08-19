import React, { useEffect } from 'react'

import { DataGrid, DataGridProps, GridColDef, GridValueGetter} from '@mui/x-data-grid'

export interface ColumnProps {
  title: string,
  link: string,
  width?: number,
  editable?: boolean,
  sortable?: boolean,
  filterable?: boolean,
  type?: 'number' | 'string' | 'date' | 'dateTime' | 'boolean',
  valueFormatter?: (value: any) => any,
  valueGetter?: (row: any) => any,
  content?: (row: any) => React.ReactNode
}

const setDefaultColumnPropsValues = (props: ColumnProps): ColumnProps => {
  return {
    title: props.title,
    link: props.link,
    width: props.width ?? 150,
    editable: props.editable ?? false,
    sortable: props.sortable ?? false,
    filterable: props.filterable ?? false,
    type: props.type ?? 'string'
  }
}

export const newColumn = (props: ColumnProps): GridColDef => {
  const defaultProps = setDefaultColumnPropsValues(props)

  let valueGetter: GridValueGetter|undefined = undefined
  if (props.valueGetter) {
    valueGetter = (value, row) => props.valueGetter!(row)
  }

  return {
    headerName: defaultProps.title,
    field: defaultProps.link,
    width: defaultProps.width,
    editable: defaultProps.editable,
    sortable: defaultProps.sortable,
    filterable: defaultProps.filterable,
    type: defaultProps.type,
    valueFormatter: props.valueFormatter,
    valueGetter: valueGetter,
    renderCell: props.content ? (params) => props.content!(params.row) : undefined
  }
}

interface TableProps extends Omit<DataGridProps, 'rows' | 'columns' | 'processRowUpdate' | 'onProcessRowUpdateError'> {
  columns: GridColDef[]
  data: any[] & { id: string | number }[],
  UpdateData?: (newData: any) => void,
}

export const Table: React.FC<TableProps> = ({ 
  columns,
  data,
  UpdateData,
  disableRowSelectionOnClick = true,
  ...props
}) => {

  return ( 
    <div className="kit-table">
      <DataGrid
        rows={data}
        columns={columns}
        disableRowSelectionOnClick={disableRowSelectionOnClick}
        processRowUpdate={(newRow, _) => {
          if (UpdateData) {
            UpdateData(newRow)
          }
          return newRow    
        }}
        onProcessRowUpdateError={(error) => {
          console.log(error)
        }}
        {...props}
      />        
    </div>
  )
}
