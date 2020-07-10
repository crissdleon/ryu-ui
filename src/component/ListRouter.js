import React from 'react'

let list = ['router-1','router-2','router-3','router-4']
function ListRouter(){

    return (
	  <div className="max-w-sm p-1 rounded overflow-hidden shadow-lg">
		<label className="text-purple-600 font-bold">Routers</label>
		{
		  list.map((item) => 
		(	
		  <div onClick={()=>{console.log(item)}} className="p-5 border-2 rounded"> {item} </div>
			))
		}
	  </div>
	  ) 
}

export default ListRouter
