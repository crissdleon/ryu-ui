import React from 'react'

let list = ['Add IP','Delete IP','Add static rute','Deltete static rute']
function ListRouterConfig(){

    return (
	  <div className="max-w-sm p-1 rounded overflow-hidden shadow-lg">

		<label className="text-purple-600 font-bold">Configs:</label>
		{
		  list.map((item) => 
		(	
		  <div onClick={()=>{console.log(item)}} className="p-5 border-2 rounded"> {item} </div>
			))
		}
	  </div>
	  ) 
}

export default ListRouterConfig
