import React, { useEffect, useState } from 'react';
// import {withRouter} from 'react-router-dom';
import { APIBase } from '../../config/constants';
import axios from 'axios';
import styles from './Admin.module.css';
import { AgGridReact } from 'ag-grid-react';
import TableFilters from '../BetterTable/components/TableFilters';


import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';


const Admin = () => {
    const route = '/vehicles/vehicles';
    const [pageIndex, setPageIndex] = useState(0);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [numResults, setNumResults] = useState(0);
    const [pageSize, setPageSize] = useState(0)
    const [pageCount, setPageCount] = useState(1);
    const [filters, setFilters] = useState('');
    const [queryParams, setQueryParams] = useState('');
    var reqURL = APIBase + route;


    const setDataNow = async () => {
        var res = await axios.get(`${reqURL}${queryParams}/?page=${pageIndex + 1}`);
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


    const agColumns = [
        {
            headerName: 'Year',
            Header: 'Year',
            field: 'year',
            filterable: true,
            sortable: true
        },
        {
            headerName: 'Make',
            Header: 'Make',
            field: 'make',
            filterable: true,
            sortable: true
        },
        {
            headerName: 'Model',
            Header: 'Model',
            field: 'v_model',
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
        var params = '/';
        console.log("Here filters:", filters)

        for (var key in filters) {
            params = params + `?${key}=${filters[key]}`
        }
        setQueryParams(params);
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
            <h1>Manual Table-AG-Grid</h1>
            <TableFilters
                setFilter={setFilter}
                filterData={stringifyQueryParams}
                columns={agColumns}
            />
            <div className="ag-theme-alpine" style={{ height: '275px', width: '680px' }}>

                <AgGridReact
                    columnDefs={agColumns}
                    rowData={data}>
                </AgGridReact>
            </div>
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

            </div>


        </div>
    );
}

export default Admin;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import styles from './admin.module.css';
// import { APIBase } from '../../config/constants';


// const Admin = () => {
//     const [newVehicle, setNewVehicle] = useState({});
//     const [loadingMakes, setLoadingMakes] = useState(false);
//     const [loadedMakes, setLoadedMakes] = useState(false);
//     const [makes, setMakes] = useState([]);
//     const [loadingModels, setLoadingModels] = useState(false);
//     const [loadedModels, setLoadedModels] = useState(false);
//     const [models, setModels] = useState([]);

//     const [year, setYear] = useState('2021');

//     useEffect(() => {
//         if (!loadingMakes && !loadedMakes) {
//             getMakes()
//         }
//     });

//     var getMakes = async () => {
//         setLoadingMakes(true)
//         var res = await axios.get(`${APIBase}/vehicles/makes/`);
//         setLoadedMakes(true);
//         setLoadingMakes(false);
//         setMakes(res.data)
//     }

//     var setNewField = (field, value) => {
//         let newVehicleData = { ...newVehicle };
//         newVehicleData[field] = value;
//         setNewVehicle(newVehicleData);
//     }

//     var getModelOptions = () => {
//         var getModelStrings = () => {
//             switch (newVehicle.make) {
//                 case 'toyota': {
//                     return ['c-hr', 'corolla', 'tacoma', 'camry']
//                 }
//                 case 'hyundai': {
//                     return ['kona', 'elantra', 'sonata']
//                 }
//                 case 'subaru': {
//                     return ['impreza', 'crosstrek', 'forester']
//                 }
//                 case 'nissan': {
//                     return ['rogue', 'kicks', 'versa']
//                 }
//                 case 'ford': {
//                     return ['ranger', 'focus', 'f-150']
//                 }
//                 default: {
//                     return ['error']
//                 }
//             }
//         }
//         if (newVehicle.make) {
//             return getModelStrings().map(model => {
//                 return (
//                     <option key={model}>{model.toUpperCase()}</option>
//                 )
//             })
//         }
//         return <option value=''>Select Make First</option>
//     }
//     var getYearOptions = () => {
//         var years = [];
//         for (let i = 2021; i > 1950; i--) {
//             years.push(<option key={i} value={i.toString()}>{i}</option>);
//         }
//         return years;
//     }
//     var renderMakeOptions = () => {
//         if (makes.length) {
//             return makes.map(make => {
//                 return <option value={make.id} key={make.id}>{make.name}</option>
//             })
//         }
//         return <option>Awaiting Makes...</option>

//     }
//     var selectMake = (id)=>{
//         setNewField('make', id)
//         getModels(id);
//     }
//     var getModels = async(id)=>{
//         setLoadingModels(true)
//         let res = axios.get(`${APIBase}/vehicles/models/?make=${id}`);
//         if(res.data){
//             setLoadingModels(false)
//             setModels(res.data);
//         }
//     }
//     var createVehicle = async () =>{
//         if(newVehicle.make && newVehicle.model){
//             var res = await axios.post(`${APIBase}/vehicles/vehicle`);
//             console.log(res)
//         }
//     }
//     return (
//         <div>
//             <div className={styles.selectWrapper}>
//                 <label>Make</label>
//                 <select
//                     onChange={(e) => { selectMake(e.target.value) }}
//                 >
//                     {renderMakeOptions()}
//                 </select>
//             </div><div className={styles.selectWrapper}>
//                 <label>Model</label>
//                 <select onChange={(e) => { setNewField('model', e.target.value) }}>
//                     {getModelOptions()}
//                 </select>
//             </div><div className={styles.selectWrapper}>
//                 <label>Year</label>
//                 <select onChange={(e) => { setYear(e.target.value) }}>
//                     {getYearOptions()}
//                 </select>
//             </div>
//             <button disabled={!newVehicle.make || !newVehicle.model} onClick={createVehicle}>Submit</button>
//             {/* <div className={styles.selectWrapper}>
//                 <label>Trim</label>
//                 <select onChange={(e) => { setNewField('trim', e.target.value) }}>
//                     <option value={'s'}>S</option>
//                     <option value={'se'}>SE</option>
//                     <option value={'sel'}>SEL</option>
//                     <option value={'limited'}>Limited</option>
//                     <option value={'ultimate'}>Ultimate</option>
//                     <option value={'platinum'}>Platinum</option>
//                 </select>
//             </div> */}
//         </div>
//     );
// };

// export default Admin;