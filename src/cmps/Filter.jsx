import { Select } from "@chakra-ui/react";

export function Filter({ column, todos, displayedRowsLength }) {
    const columnFilterValue = column.getFilterValue()
    const { filterVariant } = column.columnDef.meta ?? {}


    if (!filterVariant) return null
    if (!displayedRowsLength && columnFilterValue) column.setFilterValue('')

    function getUniqueValues(data, accessorKey) {
        const values = data.map(item => item[accessorKey]);
        return [...new Set(values)];
    }

    // Get unique values for the select filter
    const uniqueValues = getUniqueValues(todos, column.columnDef.accessorKey)
    return (
        <Select
            className="filter"
            size='sm'
            onChange={e => column.setFilterValue(e.target.value)}
            value={columnFilterValue?.toString()}
        >
            <option value="">All</option>
            {uniqueValues.map((value, idx) => (
                <option key={`${value}-${idx}`} value={value}>
                    {value}
                </option>
            ))}
        </Select>
    );
}
