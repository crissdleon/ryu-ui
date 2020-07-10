import React from 'react'
import Navigation from './Navigation'
import {Link} from 'react-router-dom'
import ListRouter from './ListRouter'
import RouterConfig from './ConfigRouter'
import ListRouterConfig from './ListRouterConfig'

function Body(){
    return (
<div className="container  h-auto p-4">
<div class="px-2">

  <div class="flex -mx-2">
    <div class="w-1/3 px-2">
	  <ListRouter / >
    </div>
     <div class="w-1/3 px-2">
	   <ListRouterConfig />
    </div>
    <div class="w-1/3 px-2">
	  <RouterConfig />
    </div>
      </div>
</div>
</div>
    )
}

export default Body
