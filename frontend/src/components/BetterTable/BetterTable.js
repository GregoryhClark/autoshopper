import React, { useEffect, useState } from 'react';
import { useTable, usePagination } from 'react-table';
import axios from 'axios';
import styles from './BetterTable.module.css';
// import TableFilters from './components/TableFilters';

function Table({
    columns,
    data,
    fetchData,
    loading,
    pageCount: controlledPageCount,
    rowCount,
    // queryParams
}) {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        // setPageSize,
        state: { pageIndex, pageSize },
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0 },
            manualPagination: true,
            pageCount: controlledPageCount,
        },
        usePagination
    )


    // Listen for changes in pagination and use the state to fetch new data
    useEffect(() => {
        fetchData({ pageIndex, pageSize, rowCount })
    }, [pageIndex]);

    return (
        <>
            {/* <button onClick={}>Test Fetch</button> */}

            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()}>
                                    {column.render('Header')}
                                    <span>
                                        {column.isSorted
                                            ? column.isSortedDesc
                                                ? ' 🔽'
                                                : ' 🔼'
                                            : ''}
                                    </span>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map((row, i) => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                })}
                            </tr>
                        )
                    })}
                    <tr>
                        {loading ? (
                            <td colSpan="10000">Loading...</td>
                        ) : (
                                <td colSpan="10000">
                                    {`Showing ${page.length} of ${rowCount} results.`}
                                </td>
                            )}
                    </tr>
                </tbody>
            </table>

            <div className={styles.pagination}>
                <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                    {'<<'}
                </button>{' '}
                <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                    {'<'}
                </button>{' '}
                <button onClick={() => nextPage()} disabled={!canNextPage}>
                    {'>'}
                </button>{' '}
                <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                    {'>>'}
                </button>{' '}
                <span>
                    Page{' '}
                    <strong>
                        {pageIndex + 1} of {pageOptions.length}
                    </strong>{' '}
                </span>
                <span>
                    | Go to page:{' '}
                    <input
                        type="number"
                        min={1}
                        defaultValue={pageIndex + 1}
                        onChange={e => {
                            const page = e.target.value ? Number(e.target.value) : 0
                            gotoPage(page - 1)
                        }}
                        style={{ width: '100px' }}
                    />
                </span>{' '}
                {/* This could be added later, but it would need to be added as a parameter in the viewset. */}
                {/* <select
                    value={pageSize}
                    onChange={e => {
                        setPageSize(Number(e.target.value))
                    }}
                >
                    {[10, 20, 30, 40, 50].map(pageSize => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
                </select> */}
            </div>
        </>
    )
}

function BetterTable({columns, reqURL, setTableData}) {

    const [data, setData] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [pageCount, setPageCount] = React.useState(0);
    const fetchIdRef = React.useRef(0);
    const [rowCount, setRowCount] = React.useState(0);
    // const [filterSelection, setFilterSelection] = useState({});
    
    useEffect(() => {
        setTimeout(() => {
            console.log('firing useEffect in BetterTable because url changed', reqURL);
        }, 500);
        filterData({pageIndex:0, reqURL})
    }, [reqURL]);

    const fetchData = React.useCallback(async ({ pageIndex, pageSize, rowCount }) => {

        // Give this fetch an ID
        const fetchId = ++fetchIdRef.current
        console.log("ID", fetchId, "INDEX", pageIndex)

        setLoading(true)
        //Only update the data if this is the latest fetch
        let res = await axios.get(`${reqURL}/?page=${pageIndex + 1}`);
        setTimeout(() => {
            console.log('reqURL: ', reqURL);
            console.log('req data: ', res);
        }, 500);

        if (fetchId === fetchIdRef.current) {
            setPageCount(Math.ceil(res.data.count / res.data.page_size))
            setData(setTableData(res.data.results))
            setRowCount(res.data.count)
            setLoading(false)
        }
    }, []);
    const filterData = async ({ pageIndex, pageSize, rowCount }) => {

        // Give this fetch an ID
        const fetchId = ++fetchIdRef.current
        console.log("ID", fetchId, "INDEX", pageIndex)

        setLoading(true);
        // setPageIndex(0);
        //Only update the data if this is the latest fetch
        let res = await axios.get(`${reqURL}/?page=1`);

        if (fetchId === fetchIdRef.current) {
            setPageCount(Math.ceil(res.data.count / res.data.page_size))
            setData(setTableData(res.data.results))
            setRowCount(res.data.count)
            setLoading(false)
        }
    };
    // const setFilter = (key, val) => {
    //     console.log("MAH KEY N VAl:", key, val)
    //     let newFilters = { ...filterSelection };
    //     newFilters[key] = val;
    //     setFilterSelection(newFilters);
    // }
    // const getQueryParams = () => {
    //     var params = '/';
    //     for (var key in filterSelection) {
    //         params = params + `?${key}=${filterSelection[key]}`
    //     }
    //     return params !== '/' ? params : '';
    // }

    return (
        <div style={{ border: "3px solid #eee", padding: "10px", margin: '10px' }}>

            {/* {props.filterOptions && props.filterOptions.length ? (
                <TableFilters
                    setFilter={setFilter}
                    filterOptions={props.filterOptions}
                    filterSelection={filterSelection}
                />
            ) : null} */}
            {/* <TableFilters 
            setFilter={setFilter}
            filterOptions={props.filterOptions}
            filterData={filterData}
            columns={props.columns}
            /> */}
            <div>
                <Table
                    columns={columns}
                    data={data}
                    fetchData={filterData}
                    loading={loading}
                    pageCount={pageCount}
                    rowCount={rowCount}
                    // queryParams={getQueryParams()}
                />
            </div>
        </div>

    )
}

export default BetterTable;
