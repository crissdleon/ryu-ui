import React, { useState, useEffect } from "react";
import axios from "axios";
import {useAuth} from "../context/auth"
import {useAlert} from 'react-alert'
//test
function DeleteStaticRouterConfig({ currentRouter }) {
  const [listAddress, setListAddress] = useState([]);
  const alert = useAlert();
  const {authTokens} = useAuth(); 

  const header = { 

	headers:{
	Authorization:JSON.parse(authTokens).token
	}
  }
  useEffect(() => {
    axios
      .get(`http://localhost:8081/router/${currentRouter}`,header)
      .then((response) => {
        const data = response.data[0].internal_network[0].route;
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
      .delete(`http://localhost:8081/router/${currentRouter}`,{
		data: { route_id: id },headers:{Authorization:JSON.parse(authTokens).token}
      })
      .then((response) => {
        if (response.data[0].command_result[0].result === "success") {
		  alert.success(`Address with id:${id} was deleted`)
          const newAddressList = listAddress.filter(
            (item) => item.route_id !== id
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
      <label className="text-purple-600 font-bold">Delete Route</label>
      {listAddress.map((item, index) => (
        <li
          onClick={() => handleRemove(item.route_id)}
          key={item.route_id}
          className="p-5 border-2 rounded hover:bg-gray-200"
          style={{ cursor: "pointer" }}
        >
          {item.destination}

          <button className="m-1 right-0 bg-blue-500  hover:bg-red-700 text-white font-bold py-1 px-3 border border-blue-700 rounded">
			Delete
          </button>
        </li>
      ))}
    </ul>
  ) : (
    <li>there aren't routes to delete</li>
  );
}

export default DeleteStaticRouterConfig;
