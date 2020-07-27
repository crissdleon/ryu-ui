import React from 'react'


let list = [{display:'Add IP Address',value:'addIp'},{display:'Delete IP Address',value:'deleteIp'},{display:'Add Route',value:'addRoute'},{display:'Delete Route',value:'deleteRute'}]

function ListRouterConfig({currentConfig}){

    return (
	  <div className="max-w-sm p-1 rounded overflow-hidden shadow-lg">

		<label className="text-purple-600 font-bold">Configs:</label>
		{
		  list.map((item) => 
		(	
		  <div onClick={()=>{currentConfig(item.value)}} className="p-5 border-2 rounded hover:bg-gray-200" style={{'cursor':'pointer'}}> {item.display} </div>
			))
		}
	  </div>
	  ) 
}

export default ListRouterConfig
