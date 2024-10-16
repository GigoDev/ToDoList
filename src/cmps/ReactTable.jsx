import React from 'react'

import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table'

import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Input,
} from '@chakra-ui/react'

import { Filter } from './Filter'
import { Link } from 'react-router-dom'
import { ArrowUpDownIcon, DeleteIcon, EditIcon, TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons'


export function ReactTable({ data, onRemoveTodo }) {

    const [columnFilters, setColumnFilters] = React.useState([])

    const columns = React.useMemo(
        () => [
            {
                accessorKey: 'task',
                header: () => 'Task',
                cell: info => info.getValue(),
                enableSorting: false,
            },
            {
                accessorKey: 'assignee',
                header: () => 'Assignee',
                meta: {
                    filterVariant: 'select',
                },
            },
            {
                accessorKey: 'priority',
                header: () => 'Priority',
                meta: {
                    filterVariant: 'select',
                },
            },
            {
                id: 'delete',
                cell: ({ row }) => (

                    <DeleteIcon onClick={() => onRemoveTodo(row.original._id)} style={{ cursor: 'pointer' }} />
                ),
            },
            {
                id: 'edit',
                cell: ({ row }) => (
                    <Link to={`/todo/edit/${row.original._id}`}>< EditIcon /></Link>
                ),
            },

        ],
        []
    )

    const table = useReactTable({
        data,
        columns,
        state: {
            columnFilters,
        },
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        manualFiltering: false,
        debugTable: false,
        debugHeaders: false,
        debugColumns: false,
    })

    const displayedRows = table.getRowModel().rows

    return (
        <div >
            <TableContainer>
                <Table>
                    <Thead>
                        {table.getHeaderGroups().map(headerGroup => (
                            <Tr key={headerGroup.id}>
                                {headerGroup.headers.map(header => {
                                    return (
                                        <Th key={header.id} colSpan={header.colSpan} className='table-header'>
                                            {header.isPlaceholder ? null : (
                                                <>
                                                    <div
                                                        className={header.column.getCanSort() ? 'sort-header' : ''}
                                                        onClick={header.column.getToggleSortingHandler()}
                                                    >
                                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                                        {{
                                                            asc: <TriangleUpIcon />,
                                                            desc: <TriangleDownIcon />,
                                                        }[header.column.getIsSorted()] ?? null}
                                                        {(header.column.getCanSort() && !header.column.getIsSorted()) && <ArrowUpDownIcon />}
                                                    </div>
                                                    {header.column.getCanFilter() ? (
                                                        <Filter column={header.column} todos={data} displayedRowsLength={displayedRows.length} />
                                                    ) : null}
                                                </>
                                            )}
                                        </Th>
                                    )
                                })}
                            </Tr>
                        ))}
                    </Thead>
                    <Tbody>
                        {table.getRowModel().rows.map(row => {
                            return (
                                <Tr key={row.id}>
                                    {row.getVisibleCells().map(cell => {
                                        return (
                                            <Td key={cell.id}>
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </Td>
                                        )
                                    })}
                                </Tr>
                            )
                        })}
                    </Tbody>
                </Table>
            </TableContainer>

            {/* <div className="flex ">
                <button
                    className="border rounded p-1"
                    onClick={() => table.setPageIndex(0)}
                    disabled={!table.getCanPreviousPage()}
                >
                    {'<<'}
                </button>
                <button
                    className="border rounded p-1"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    {'<'}
                </button>
                <button
                    className="border rounded p-1"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    {'>'}
                </button>
                <button
                    className="border rounded p-1"
                    onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                    disabled={!table.getCanNextPage()}
                >
                    {'>>'}
                </button>
                <span className="flex">
                    <div>Page</div>
                    <strong>
                        {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                    </strong>
                </span>
                <span className="flex items-center gap-1">
                    | Go to page:
                    <Input
                        type="number"
                        min="1"
                        max={table.getPageCount()}
                        defaultValue={table.getState().pagination.pageIndex + 1}
                        onChange={e => {
                            const page = e.target.value ? Number(e.target.value) - 1 : 0
                            table.setPageIndex(page)
                        }}
                    />
                </span>
                <select
                    value={table.getState().pagination.pageSize}
                    onChange={e => {
                        table.setPageSize(Number(e.target.value))
                    }}
                >
                    {[10, 20, 30, 40, 50].map(pageSize => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
                </select>
            </div> */}
        </div>
    )
}



