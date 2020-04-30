import React, { useEffect, useState } from 'react';
// import {withRouter} from 'react-router-dom';
import ManualTable from '../ManualTable/ManualTable';
import { APIBase } from '../../config/constants';
import axios from 'axios';

// import Search from '../Search/Search';

const About =()=>{
    const route = '/vehicles/vehicles';
    const [pageIndex, setPageIndex] = useState(0);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([])
    var reqURL = APIBase + route;

    // useEffect(()=>{
    //     const setDataNow = async()=>{
    //         var res = await axios.get(`${reqURL}/?page=${pageIndex + 1}`);
    //     console.log(res)
    //     setData(setTableData(res.data.results))
    //     }
    //     setDataNow();
        
    // },[]);

    useEffect(()=>{
        const setDataNow = async()=>{
            var res = await axios.get(`${reqURL}/?page=${pageIndex + 1}`);
        console.log(res.data.results)
        setData(setTableData(res.data.results))
        }
        setDataNow();
        
    },[pageIndex])

    var setTableData = (dataArr) => {
        return dataArr.map(data => {
            return {
                year: data.year,
                make: data.make.name,
                v_model: data.v_model.name
            }
        })
    };
    const columns = React.useMemo(
        () => [
            {
                Header: 'Year',
                accessor: 'year',
                filterable:false,
                sortable:false
            },
            {
                Header: 'Make',
                accessor: 'make',
                filterable:false,
                sortable:false
            },
            {
                Header: 'Model',
                accessor: 'v_model',
                filterable:false,
                sortable:false
            }
        ],
        []
    );

    const renderTable=()=>{
        return (
            <ManualTable 
            setTableData={setTableData} 
            reqURL={`${APIBase}${route}`} 
            columns={columns} 
            data={data}
            />
        )
    }

    

        return (
            <div>
                {loading?'Loading':"Loaded"}
                <button onClick={()=>{setPageIndex(pageIndex + 1)}}>Next Page</button>
                <h1>About</h1>
                {renderTable()}
            </div>
        );
}

export default About;