import React, { useMemo, useState, useEffect } from "react";
import {
  useTable,
  useGlobalFilter,
  usePagination,
  useFilters,
} from "react-table";
import { GlobalSearch } from "./GlobalSearch";
import "./table.css";
//import data from './data/data.json';
import { COLUMNS } from "./columns";
import { dataApi } from "./api";
import useSWR from "swr";
import axios from "axios";
import { Detail } from "./Detail";

export const PaginationTable = (props) => {
  const [userList, setUserList] = useState([]);
  const [fav,setFav]=useState([]);

  useEffect(() => {
    dataApi().then((data) => {
      setUserList(data);
    });
  }, []);

  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => userList, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    prepareRow,
    pageOptions,
    setPageSize,
    state,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
    },
    useFilters,
    useGlobalFilter,
    usePagination
  );

  function prin(){
    console.log(fav[0]);
      alert(`                           YOUR FAVOURITE BANKS :\n${fav.map((e)=>e)}`);
  }
    
  function hello(e) {
    var d=e.original;
    alert(`Bank Name : ${d.bank_name}\nIFSC : ${d.ifsc}\nBranch : ${d.branch}\nCity : ${d.city}\nDistrict : ${d.district}\nState : ${d.state}\n`);
  }

  function add(e){
    var d=e.original.bank_name;
    const ref=fav.includes(d);
    if(ref==true){
        alert('alreadypresent')
    }else{
      fav.push(d);
      //alert('added to favourite')
      alert(`added to fav \n${d}`)
    }
   
  }

  function remove(e){
    var d=e.original.bank_name;
    for( var i = 0; i < fav.length; i++){ 
                                   
      if ( fav[i] === d) { 
          fav.splice(i, 1); 
          alert(`${d} removed from favourite list.`)
          return;
      }
  }
    alert(`not in the list`)
  }

  const [list, setList] = useState([]);

  const { globalFilter, pageIndex, pageSize } = state;

  return (
    <>  
    <button style={{backgroundColor:"grey",
                        color:"black",
                        fontSize:"20px",
                        padding: "10px 60px",
                        border_radius: "5px"
      }}>Bank Search Applicaion</button>
      <br />
      <center>
        {" "}
        <GlobalSearch input={globalFilter} setInput={setGlobalFilter} /><br/><br/>
        <button style={{backgroundColor:"grey",
                        color:"white",
                        fontSize:"20px",
                        padding: "10px 60px",
                        border_radius: "5px"
      }} onClick={(e)=>prin()}>Favourite List Of Banks</button>
      </center>
      <br />

      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
              <th>add/remove/view</th>
            </tr>
            
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr  {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
              
                    <td {...cell.getCellProps()}>{cell.render("Cell")}
                
                    </td>
                    
                  );
               
                })}
              <center>
            <button style={{backgroundColor:"grey",color:"white"}} onClick={(e)=>add(row)}>add-to-fav</button>
            <button style={{backgroundColor:"grey" ,color:"white"}} onClick={(e)=>remove(row)}>remove-from-fav</button>
            <button style={{backgroundColor:"grey" ,color:"white"}} onClick={(e)=>hello(row)}>view-details</button>
            </center>

              </tr>
              
            );
          })}
        
        </tbody>
      </table>

      <div>
        <span>
          <select
            value={pageSize}
            onChange={(event) => setPageSize(Number(event.target.value))}
          >
            {[3, 4, 6, 8].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>

        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          Previous
        </button>
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          Next
        </button>
      </div>
    </>
  );
};
