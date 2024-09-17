import React, { useEffect, useState } from 'react'

import { DataGrid, DataGridProps, GridColDef, GridValueGetter, GRID_CHECKBOX_SELECTION_COL_DEF, useGridApiRef} from '@mui/x-data-grid'

interface ColumnProps {
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


interface TableProps extends Omit<DataGridProps, 'rows' | 'columns' | 'processRowUpdate' | 'onProcessRowUpdateError' | 'onRowSelectionModelChange' | 'getRowId'> {
  height?: React.CSSProperties["height"],
  columns: GridColDef[]
  data: any[],
  GridId?: string,
  UpdateData?: (newData: any) => void,
  onSelect?: (selected: any) => void,
}

export const Table: React.FC<TableProps> = ({ 
  height = 300,
  columns,
  data,
  GridId = '_GridId',
  UpdateData,
  onSelect,
  disableRowSelectionOnClick = true,
  checkboxSelection = false,
  ...props
}) => {

  const apiRef = useGridApiRef();

  const [GridData, setGridData] = useState<any[]>([])

  useEffect(() => {
    const newData = [...data]
    if (GridId === '_GridId') {
      newData.forEach((d, i) => {
        d._GridId = i
      })
    }
    setGridData(newData)
  }, [data])

  useEffect(() => {
    // if row has _selected property to true, then select it
    const selected = GridData.filter(d => d._selected).map(d => d[GridId])
    apiRef.current.setRowSelectionModel(selected)
  }, [GridData])

  return ( 
    <div className="kit-table" style={{ height: height, width: '100%' }}>
      <DataGrid
        apiRef={apiRef}
        getRowId={(row) => row[GridId]}
        rows={GridData}
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
        checkboxSelection={checkboxSelection}
        onRowSelectionModelChange={(selected) => {
          if (onSelect) {
            onSelect(GridData.filter(d => selected.includes(d[GridId])))
          }
        }}
        
        pageSizeOptions={[100]}
        {...props}
      />        
    </div>
  )
}
