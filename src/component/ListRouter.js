import React,{useState,useEffect} from 'react'
import axios from 'axios'


const ListRouter =  ({currentRouter})=> {	
  const [listRouter,setListRouter] = useState([{_id:'232323'}]);
 
  useEffect(()=>{
	axios.get('http://localhost:8080/router/all')
  .then(response => {
	setListRouter(response.data)
   })
	.catch(error => {
    console.log(error);
	});
  },[])

//	const getRouter = (event)=> {currentRouter(event)}

    return (
	  <ul className="max-w-sm p-1 rounded overflow-hidden shadow-lg">
		<label className="text-purple-600 font-bold">Routers</label>
		{

		  listRouter.map((item,index) => 
		  (	 

			<li key={index} onClick={()=>currentRouter(item.switch_id)} className="p-5 border-2 rounded hover:bg-gray-200" style={{'cursor':'pointer'}}> 
			{   
			item.switch_id
			} 
		  </li>
		))
		}
		</ul>

	  ) 
}

export default ListRouter
