import React, { memo } from 'react'

import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table'

import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Badge,
} from '@chakra-ui/react'

import { Filter } from './Filter'
import { Link } from 'react-router-dom'
import { ArrowBackIcon, ArrowForwardIcon, ArrowUpDownIcon, DeleteIcon, EditIcon, TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons'


export const ReactTable = memo(function ReactTable({ data, onRemoveTodo }) {
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
                cell: ({ row }) => {
                    const assigneeName = row.original.assignee
                    return (
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <img className='avatar'
                                src={`https://api.dicebear.com/9.x/personas/svg?seed=${assigneeName}`}
                                alt="Assignee Avatar"
                            />
                            <span>{assigneeName}</span>
                        </div>
                    )
                },
                meta: {
                    filterVariant: 'select',
                },
            },
            {
                accessorKey: 'priority',
                header: () => 'Priority',
                cell: info => {
                    const priority = info.getValue();
                    let colorScheme = '';

                    // Define the logic to switch the badge color according to the priority level
                    switch (priority) {
                        case 'Low':
                            colorScheme = 'green';
                            break;
                        case 'Medium':
                            colorScheme = 'yellow';
                            break;
                        case 'High':
                            colorScheme = 'red';
                            break;
                        default:
                            colorScheme = 'gray';
                    }

                    return <Badge colorScheme={colorScheme}>{priority}</Badge>;
                },
                meta: {
                    filterVariant: 'select',
                }, sortingFn: (rowA, rowB) => {
                    const priorityOrder = { 'High': 3, 'Medium': 2, 'Low': 1 };
                    return priorityOrder[rowB.original.priority] - priorityOrder[rowA.original.priority];
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
        [onRemoveTodo]
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
        manualFiltering: false,
    })

    const displayedRows = table.getRowModel().rows

    return (
        <>
            <TableContainer>
                <Table>
                    <Thead>
                        {table.getHeaderGroups().map(headerGroup => (
                            <Tr key={headerGroup.id}>
                                {headerGroup.headers.map(header => (
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
                                ))}
                            </Tr>
                        ))}
                    </Thead>
                    <Tbody>
                        {table.getRowModel().rows.map(row => (
                            <Tr key={row.id}>
                                {row.getVisibleCells().map(cell => (
                                    <Td key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </Td>
                                ))}
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </>
    )
})
