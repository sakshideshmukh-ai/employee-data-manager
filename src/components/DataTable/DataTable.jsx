// src/components/DataTable/DataTable.jsx
// Main data table component using TanStack Table v8 for sorting, filtering, and pagination.
// Reads data from Redux store and supports Excel export of filtered data.

import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import {
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    flexRender,
} from '@tanstack/react-table';
import * as XLSX from 'xlsx';
import './DataTable.css';

// Column definitions for the employee table
const columnDefs = [
    { accessorKey: 'id', header: 'ID', size: 60 },
    { accessorKey: 'name', header: 'Name' },
    { accessorKey: 'email', header: 'Email' },
    { accessorKey: 'department', header: 'Department' },
    { accessorKey: 'role', header: 'Role' },
    {
        accessorKey: 'salary',
        header: 'Salary (₹)',
        // Format salary with Indian number formatting
        cell: ({ getValue }) => `₹${Number(getValue()).toLocaleString('en-IN')}`,
    },
    {
        accessorKey: 'status',
        header: 'Status',
        // Render status as a colored badge
        cell: ({ getValue }) => (
            <span className={`status-badge status-${getValue().toLowerCase().replace(' ', '-')}`}>
                {getValue()}
            </span>
        ),
    },
    { accessorKey: 'joinDate', header: 'Join Date' },
];

export default function DataTable() {
    // Read the full dataset from Redux store
    const data = useSelector((state) => state.table.data);

    // Local state for global filter text and column sorting
    const [globalFilter, setGlobalFilter] = useState('');
    const [sorting, setSorting] = useState([]);

    // Memoize columns to avoid re-creating on every render
    const columns = useMemo(() => columnDefs, []);

    // Initialize TanStack Table with all required features
    const table = useReactTable({
        data,
        columns,
        state: { globalFilter, sorting },
        onGlobalFilterChange: setGlobalFilter,
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: {
            pagination: { pageSize: 10 }, // Show 10 rows per page
        },
    });

    /**
     * Exports the currently filtered (and sorted) rows to an Excel (.xlsx) file.
     * Uses SheetJS to create the workbook and trigger a browser download.
     */
    const handleExportExcel = () => {
        // Get only the currently visible filtered rows (not paginated — all filtered rows)
        const filteredRows = table.getFilteredRowModel().rows;

        // Build plain objects from each row's visible cells
        const exportData = filteredRows.map((row) => {
            const obj = {};
            row.getAllCells().forEach((cell) => {
                obj[cell.column.columnDef.header] = cell.getValue();
            });
            return obj;
        });

        // Create workbook, append sheet, and trigger download
        const worksheet = XLSX.utils.json_to_sheet(exportData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Employees');
        XLSX.writeFile(workbook, `employees_${globalFilter ? 'filtered' : 'all'}.xlsx`);
    };

    const { pageIndex, pageSize } = table.getState().pagination;
    const totalFilteredRows = table.getFilteredRowModel().rows.length;

    return (
        <section className="table-section" aria-label="Employee Data Table">
            {/* ── Toolbar: Search + Export ── */}
            <div className="table-toolbar">
                <div className="search-wrapper">
                    <span className="search-icon" aria-hidden="true">🔍</span>
                    <input
                        id="global-filter"
                        type="text"
                        placeholder="Search all columns…"
                        value={globalFilter}
                        onChange={(e) => setGlobalFilter(e.target.value)}
                        className="search-input"
                        aria-label="Global search filter"
                    />
                    {globalFilter && (
                        <button
                            className="clear-btn"
                            onClick={() => setGlobalFilter('')}
                            aria-label="Clear search"
                        >
                            ✕
                        </button>
                    )}
                </div>
                <button className="export-btn" onClick={handleExportExcel} aria-label="Download Excel">
                    <span aria-hidden="true">📥</span>
                    Download Excel {globalFilter ? '(Filtered)' : '(All)'}
                </button>
            </div>

            {/* ── Result Count ── */}
            <p className="result-count" aria-live="polite">
                Showing <strong>{Math.min(pageSize, totalFilteredRows - pageIndex * pageSize)}</strong> of{' '}
                <strong>{totalFilteredRows}</strong> {globalFilter ? 'filtered ' : ''}entries
            </p>

            {/* ── Table ── */}
            <div className="table-wrapper" role="region" aria-label="Employee table" tabIndex={0}>
                <table className="data-table">
                    <thead>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <th
                                        key={header.id}
                                        style={{ width: header.column.columnDef.size }}
                                        onClick={header.column.getToggleSortingHandler()}
                                        className={header.column.getCanSort() ? 'sortable' : ''}
                                        aria-sort={
                                            header.column.getIsSorted() === 'asc'
                                                ? 'ascending'
                                                : header.column.getIsSorted() === 'desc'
                                                    ? 'descending'
                                                    : 'none'
                                        }
                                    >
                                        <span className="th-content">
                                            {flexRender(header.column.columnDef.header, header.getContext())}
                                            {/* Sort indicators */}
                                            <span className="sort-icon" aria-hidden="true">
                                                {header.column.getIsSorted() === 'asc'
                                                    ? ' ▲'
                                                    : header.column.getIsSorted() === 'desc'
                                                        ? ' ▼'
                                                        : header.column.getCanSort()
                                                            ? ' ⇅'
                                                            : ''}
                                            </span>
                                        </span>
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.length === 0 ? (
                            <tr>
                                <td colSpan={columns.length} className="no-results">
                                    No results found. Try a different search term.
                                </td>
                            </tr>
                        ) : (
                            table.getRowModel().rows.map((row) => (
                                <tr key={row.id}>
                                    {row.getVisibleCells().map((cell) => (
                                        <td
                                            key={cell.id}
                                            // data-label is used by mobile CSS to show column name above the value
                                            data-label={cell.column.columnDef.header}
                                        >
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* ── Pagination Controls ── */}
            <div className="pagination" role="navigation" aria-label="Table pagination">
                <button
                    onClick={() => table.setPageIndex(0)}
                    disabled={!table.getCanPreviousPage()}
                    aria-label="First page"
                    className="page-btn"
                >
                    «
                </button>
                <button
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                    aria-label="Previous page"
                    className="page-btn"
                >
                    ‹ Prev
                </button>

                <span className="page-info" aria-current="page">
                    Page <strong>{pageIndex + 1}</strong> of <strong>{table.getPageCount()}</strong>
                </span>

                <button
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                    aria-label="Next page"
                    className="page-btn"
                >
                    Next ›
                </button>
                <button
                    onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                    disabled={!table.getCanNextPage()}
                    aria-label="Last page"
                    className="page-btn"
                >
                    »
                </button>
            </div>
        </section>
    );
}
