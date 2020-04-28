import React, { useState, useEffect } from 'react';
import styles from './search.module.css'
// import axios from 'axios';
import { APIBase } from '../../config/constants';
import BetterTable from '../BetterTable/BetterTable';
// import FilterSelect from '../BetterTable/components/FilterSelect';
import TableFilters from '../BetterTable/components/TableFilters';
// import BestTable from '../BestTable/BestTable';


function Search(props) {

    const [filterParams, setFilterParams] = useState({});
    const [sortBy, setSortBy] = useState('');
    const [sortOrder, setSortOrder] = useState('');

    var setTableData = (dataArr) => {
        return dataArr.map(data => {
            return {
                year: data.year,
                make: data.make.name,
                v_model: data.v_model.name
            }
        })
    }
    const setFullSort = (clicked)=>{
        console.log("sortBy:",sortBy)
        console.log("clicked:",clicked)
        console.log("sortOrder:", sortOrder)

        if(sortBy === clicked){
            if(sortOrder === ''){
                setSortOrder('asc');
            }
            else if(sortOrder === 'asc'){
                setSortOrder('desc');
            }
            else {
                setSortOrder('')
            }
        }
        else{
            setSortBy(clicked);
            setSortOrder('asc')
        }
        //Force update of table.
    }

    const columns = React.useMemo(
        () => [
            {
                Header: <p onClick={() => {setFullSort('year') }}>Year</p>,
                accessor: 'year',
                filterable: false,
                sortable: true
            },
            {
                Header:  <p onClick={() => {setFullSort('make') }}>Make</p>,
                accessor: 'make',
                filterable: true,
                sortable: true
            },
            {
                Header:  <p onClick={() => {setFullSort('v_model') }}>Model</p>,
                accessor: 'v_model',
                filterable: true,
                sortable: true
            }
        ],
        []
    );
    const setFilter = (key, val) => {
        let newFilters = { ...filterParams };
        newFilters[key] = val;
        setFilterParams(newFilters);
    }

    const route = '/vehicles/vehicles';


    const filterData = () =>{
        console.log("Filter this");


    }
    const getQueryParams = () => {
        var params = '/';
        for (var key in filterParams) {
            params = params + `?${key}=${filterParams[key]}`
        }
        console.log('getQueryParams: ', params);
        return params !== '/' ? params : '';
    }

    return (
        <div className={styles.search_master}>
            <TableFilters
                setFilter={setFilter}
                filterOptions={props.filterOptions}
                filterData={filterData}
                columns={columns}
            />
            <BetterTable
                setTableData={setTableData}
                reqURL={`${APIBase}${route}${getQueryParams()}`}
                columns={columns}
            />
            {/* <hr/>
            <BestTable setTableData={setTableData} reqURL={`${APIBase}${route}`} columns={columns} /> */}
        </div>
    );
}
export default Search;

   // var sortOptions = () => {
    //     return [
    //         <option value={''}>Default</option>,
    //         <option value={'make'}>Make</option>,
    //         <option value={'v_model'}>Model</option>,
    //         <option value={'year'}>Year</option>]
    // }

// const [hasAWD, setHasAWD] = useState(false);
    // const [hasBlindspotDetection, setHasBlindspotDetection] = useState(false);
    // const [hasLaneDepartureWarning, setHasLaneDepartureWarning] = useState(false);
    // const [hasLaneKeepAssist, setLaneKeepAssist] = useState(false);
    // const [hasHUD, setHasHUD] = useState(false);
    // const [hasAppleCar, setHasAppleCar] = useState(false);
    // const [loadingModels, setLoadingModels] = useState(false)
    // const [tableData, setTableData] = useState([]);
    // const [nextPage, setNextPage] = useState('');
    // const [previousPage, setPreviousPage] = useState('');
    // const [hasAndroidAuto, setHasAndroidAuto] = useState(false);
    // const [hasEmergencyBraking, setHasEmergencyBraking] = useState(false);
    // const [searchResults, setSearchResults] = useState([]);
    // const [loadingMakes, setLoadingMakes] = useState(false);
    // const [makes, setMakes] = useState([]);
    // const [vModels, setVModels] = useState([]);

   // useEffect(() => {
    //     if (!loadingMakes && makes.length < 1) {
    //         getMakes()
    //     }
    // });
    // var getMakes = async () => {
    //     setLoadingMakes(true)
    //     var res = await axios.get(`${APIBase}/vehicles/makes/`);
    //     setLoadingMakes(false);
    //     setMakes(res.data)
    // }
        // var getSearchResults = () => {
    //     var searchParams = {
    //         hasAWD,
    //         hasBlindspotDetection,
    //         hasLaneDepartureWarning,
    //         hasLaneKeepAssist,
    //         hasHUD,
    //         hasAppleCar,
    //         hasAndroidAuto,
    //         hasEmergencyBraking
    //     };

    //     axios.get(`${APIBase}/vehicles/vehicles/?page=1`).then(res => {
    //         console.log(res)
    //         setSearchResults({
    //             tableData: setTableData(res.data.results),
    //             nextPage: res.data.next,
    //             previousPage: res.data.previous,
    //             currentPage: res.data.cpage,
    //             count: res.data.count,
    //             page_size: res.data.page_size,
    //         })
    //     })
    // }
    // var getTableData = async (link) => {
    //     let res = await axios.get(link);
    //     setSearchResults({
    //         tableData: setTableData(res.data.results),
    //         nextPage: res.data.next,
    //         previousPage: res.data.previous,
    //         totalCount: res.data.count,
    //         currentPage: res.data.cpage,
    //         count: res.data.count,
    //         page_size: res.data.page_size
    //     })
    // }
    // var updateFilterParams = (key, val) => {
    //     if (key == 'make') {
    //         getModels(val);
    //     }
    //     var newParams = { ...filterParams };
    //     newParams[key] = val;
    //     setFilterParams(newParams);
    // }

    // var getModels = async (id) => {
    //     setLoadingModels(true)
    //     let res = await axios.get(`${APIBase}/vehicles/v_models/?make=${id}`);
    //     console.log(res)
    //     if (res.data) {
    //         setLoadingModels(false)
    //         setVModels(res.data);
    //     }
    // }

//  <div className={styles.options_wrapper}>
//                 <div className={styles.checkbox_wrapper}>
//                     <label>AWD</label>
//                     <input
//                         type="checkbox"
//                         checked={hasAWD}
//                         onChange={(e) => { setHasAWD(e.target.checked) }}
//                     />
//                 </div>
//                 <div className={styles.checkbox_wrapper}>
//                     <label>Blind Spot Detection</label>
//                     <input
//                         type="checkbox"
//                         checked={hasBlindspotDetection}
//                         onChange={(e) => { setHasBlindspotDetection(e.target.checked) }}
//                     />
//                 </div>
//                 <div className={styles.checkbox_wrapper}>
//                     <label>Lane Departure Warning</label>
//                     <input
//                         type="checkbox"
//                         checked={hasLaneDepartureWarning}
//                         onChange={(e) => { setHasLaneDepartureWarning(e.target.checked) }}
//                     />
//                 </div>
//                 <div className={styles.checkbox_wrapper}>
//                     <label>Lane Keep Assist</label>
//                     <input
//                         type="checkbox"
//                         checked={hasLaneKeepAssist}
//                         onChange={(e) => { setLaneKeepAssist(e.target.checked) }}
//                     />
//                 </div>
//                 <div className={styles.checkbox_wrapper}>
//                     <label>HUD</label>
//                     <input
//                         type="checkbox"
//                         checked={hasHUD}
//                         onChange={(e) => { setHasHUD(e.target.checked) }}
//                     />
//                 </div>
//                 <div className={styles.checkbox_wrapper}>
//                     <label>Apple Car</label>
//                     <input type="checkbox"
//                         checked={hasAppleCar}
//                         onChange={(e) => { setHasAppleCar(e.target.checked) }}
//                     />
//                 </div>
//                 <div className={styles.checkbox_wrapper}>
//                     <label>Android Auto</label>
//                     <input type="checkbox"
//                         checked={hasAndroidAuto}
//                         onChange={(e) => { setHasAndroidAuto(e.target.checked) }}
//                     />
//                 </div>
//                 <div className={styles.checkbox_wrapper}>
//                     <label>Emergency Braking</label>
//                     <input type="checkbox"
//                         checked={hasEmergencyBraking}
//                         onChange={(e) => { setHasEmergencyBraking(e.target.checked) }}
//                     />
//                 </div>
//             </div> 








// var getPage = async (page) => {
//     let res = await axios.get(`${APIBase}/vehicles/vehicles/?page=${page}`);
//     setSearchResults({
//         tableData: setTableData(res.data.results),
//         nextPage: res.data.next,
//         previousPage: res.data.previous,
//         totalCount: res.data.count,
//         currentPage: res.data.cpage,
//         count: res.data.count,
//         page_size: res.data.page_size
//     })
// }
// var renderMakeOptions = () => {
//     var options = [<option value={0} key={0}>Any</option>];
//     makes.map(make => {
//         options.push(<option key={make.id} value={make.id}>{make.name}</option>)
//     })
//     return options
// }
// var renderModelOptions = () => {
//     var options = [<option value={0} key={0}>Any</option>];
//     vModels.map(vModel => {
//         options.push([<option value={vModel.id} key={vModel.id}>{vModel.name}</option>])
//     })
//     return options;
// }
// var renderYearOptions = () => {
//     var years = [<option value={0} key={0}>Any</option>];
//     for (let i = 2021; i > 1950; i--) {
//         years.push(<option key={i} value={i.toString()}>{i}</option>);
//     }
//     return years;
// }