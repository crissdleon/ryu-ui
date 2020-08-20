import React, { useState, useEffect } from "react";
import axios from "axios";
import {useAuth} from "../context/auth";
import {useAlert} from 'react-alert'
//test
function DeleteConfig({ currentRouter }) {
  const [listAddress, setListAddress] = useState([]);
  const alert = useAlert();
  const {authTokens} = useAuth();
  useEffect(() => {
    axios
	  .get(`http://localhost:8081/router/${currentRouter}`,{
	  headers:{
	  Authorization:JSON.parse(authTokens).token
	  }
	  })
      .then((response) => {
        const data = response.data[0].internal_network[0].address;
        if (data !== undefined) setListAddress((_) => data);
      })
      .catch((error) => {
        console.log(error);
      });
    return () => {
      setListAddress([]);
    };
  }, [currentRouter]);
  //	const getRouter = (event)=> {currentRouter(event)}
  function handleRemove(id) {
    axios
      .delete(`http://localhost:8081/router/${currentRouter}`, {
		data: { address_id: id },headers:{Authorization:JSON.parse(authTokens).token}
      })
      .then((response) => {
        if (response.data[0].command_result[0].result === "success") {
		  alert.success(`Address with id:${id} was deleted`)
          const newAddressList = listAddress.filter(
            (item) => item.address_id !== id
          );
          setListAddress(newAddressList);
        }
		else
		{
		  alert.error(response.data[0].command_result[0].details) 
		}
      })
      .catch((response) => console.log(response));
  }

  return listAddress.length > 0 ? (
    <ul className="max-w-sm p-1 rounded overflow-hidden shadow-lg">
      <label className="text-purple-600 font-bold">Delete Address</label>
      {listAddress.map((item, index) => (
        <li
          onClick={() => handleRemove(item.address_id)}
          key={item.address_id}
          className="p-5 border-2 rounded hover:bg-gray-200"
          style={{ cursor: "pointer" }}
        >
          {item.address}

          <button className="m-1 right-0 bg-blue-500  hover:bg-red-700 text-white font-bold py-1 px-3 border border-blue-700 rounded">
			Delete
          </button>
        </li>
      ))}
    </ul>
  ) : (
    <li>there aren't address to delete</li>
  );
}

export default DeleteConfig;
