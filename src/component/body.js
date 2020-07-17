import React,{useState} from 'react'
import ListRouter from './ListRouter'
import RouterConfig from './ConfigRouter'
import ListRouterConfig from './ListRouterConfig'

function Body(){
const [currentRouter,setCurrentRouter] = useState('');

const [currentConfig,setCurrentConfig] = useState();

return (

  <div className="container  h-auto p-4">
  <div class="px-2">
	<div class="flex -mx-2">

	  <div class="w-1/3 px-2">
		<ListRouter currentRouter={setCurrentRouter} / >
	  </div>

	   <div class="w-1/3 px-2">
		 <ListRouterConfig  currentConfig = {setCurrentConfig}/>
	  </div>

	  <div class="w-1/3 px-2">
		{currentConfig==='addIp'? 

		<RouterConfig currentRouter= {currentRouter} />
		:currentConfig==='deleteIp'?
		  <h1>deleteip </h1>

	//	<RouterConfig currentRouter= {currentRouter} />
		:currentConfig ==='addRoute'?
		<h1>addroute</h1>
	//	<RouterConfig currentRouter= {currentRouter} />
		:currentConfig ==='deleteRute'?
		
		  <h1>deleteRute {currentRouter} </h1>
	//	<RouterConfig currentRouter= {currentRouter} />
		:null

		}
	
	  </div>
	  
	</div>
  </div>
  </div>
)}

export default Body
