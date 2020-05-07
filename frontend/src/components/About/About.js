import React, { useEffect, useState } from 'react';
import ManualTable from '../ManualTable/ManualTable';
import { APIBase } from '../../config/constants';
import axios from 'axios';
import styles from './About.module.css';
import TableFilters from '../BetterTable/components/TableFilters';

const About = () => {
    const route = '/vehicles/vehicles';
    const [pageIndex, setPageIndex] = useState(0);
    // const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [numResults, setNumResults] = useState(0);
    const [pageSize, setPageSize] = useState(0)
    // const [pageCount, setPageCount] = useState(1);
    const [filters, setFilters] = useState('');
    const [queryParams, setQueryParams] = useState('');
    var reqURL = APIBase + route;


    const setDataNow = async () => {
        var res = await axios.get(`${reqURL}/?page=${pageIndex + 1}${queryParams}`);
        console.log(res.data.results);
        setData(setTableData(res.data.results));
        setNumResults(res.data.count);
        setPageSize(res.data.page_size);
    }


    useEffect(() => {
        setDataNow();
    }, [pageIndex]);

    useEffect(()=>{
        setDataNow()
    }, [queryParams]);

    var setTableData = (dataArr) => {
        return dataArr.map(data => {
            return {
                year: data.year,
                make: data.make.name,
                v_model: data.v_model.name
            }
        })
    };

    const columns = [
        {
            Header: 'Year',
            accessor: 'year',
            filterable: true,
            sortable: true
        },
        {
            Header: 'Make',
            accessor: 'make',
            filterable: true,
            sortable: true
        },
        {
            Header: 'Model',
            accessor: 'v_model',
            filterable: true,
            sortable: true
        }
    ];

    const setFilter = (key, val) => {
        let newFilters = { ...filters };
        newFilters[key] = val;
        setFilters(newFilters);
    }

    const stringifyQueryParams = () => {
        var params = '';
        for (var key in filters) {
            params = params + `&${key}=${filters[key]}`
        }
        setQueryParams(params);
    };

    const renderTable = () => {
        return (
            <div>
                <TableFilters
                    setFilter={setFilter}
                    filterData={stringifyQueryParams}
                    columns={columns}
                />
                <ManualTable
                    columns={columns}
                    data={data}
                />
            </div>
        )
    };
    const gotoPage = (pIndex) => {
        setPageIndex(pIndex);
    };

    const previousPage = () => {
        setPageIndex(pageIndex - 1);
    }

    const nextPage = () => {
        setPageIndex(pageIndex + 1);
    }
    var numPagesOfResults = Math.ceil(numResults / pageSize);
    var canNextPage = numPagesOfResults - pageIndex > 1;

    var canPreviousPage = pageIndex > 0;

    return (
        <div className={styles.tableWrapper}>
            <h1>Manual Table (With react-table)</h1>
            {renderTable()}
            <div className={styles.pagination}>
                <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                    {'Start'}
                </button>{' '}
                <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                    {'<'}
                </button>{' '}
                <button onClick={() => nextPage()} disabled={!canNextPage}>
                    {'>'}
                </button>{' '}
                <button onClick={() => gotoPage(numPagesOfResults - 1)} disabled={!canNextPage}>
                    {'End'}
                </button>{' '}
                <span>
                    Page{' '}
                    <strong>
                        {pageIndex + 1} of {numPagesOfResults}
                    </strong>{' '}
                </span>
                {/* <span>
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
                </span> */}

            </div>
        </div>
    );
}

export default About;