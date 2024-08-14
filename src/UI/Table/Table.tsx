import React, { useEffect } from 'react'

import { DataGrid, DataGridProps, GridColDef} from '@mui/x-data-grid'

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
  return {
    headerName: defaultProps.title,
    field: defaultProps.link,
    width: defaultProps.width,
    editable: defaultProps.editable,
    sortable: defaultProps.sortable,
    filterable: defaultProps.filterable,
    type: defaultProps.type
  }
}

interface TableProps extends Omit<DataGridProps, 'rows' | 'columns' | 'processRowUpdate' | 'onProcessRowUpdateError'> {
  columns: GridColDef[]
  data: any[] & { id: string | number }[],
  setData?: (rows: any[]) => void,
}

export const Table: React.FC<TableProps> = ({ 
  columns,
  data,
  setData,
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
          if (setData) {
            setData(data.map(row => row.id === newRow.id ? newRow : row))
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
