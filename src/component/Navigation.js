import React, {useState} from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faBars} from '@fortawesome/free-solid-svg-icons'
import {useTransition, animated} from 'react-spring'
import {Link} from 'react-router-dom'

function Navigation(){
  const [showMenu,setShowMenu] = useState(false)
  let menu
  let menuMask 
//mask 	className="bg-black-t-50  fixed top-0 left-0 w-full h-full z-50"
    const maskTransitions = useTransition(showMenu, null, {
        from: { position: 'absolute', opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
    })

    const menuTransitions = useTransition(showMenu, null, { from: { opacity: 0, transform: 'translateX(-100%)' },
        enter: { opacity: 1, transform: 'translateX(0%)' },
        leave: { opacity: 0, transform: 'translateX(-100%)' },
    })

  if(showMenu)
  {
	menu = <div > 
	  the menu 

	  </div>
	  menuMask = 
	  <div
		onClick={()=>setShowMenu(false)}
	>
	  </div>
  }
   return (
	<nav>
	  <span className="text-xl">
		<FontAwesomeIcon  icon={faBars}
		onClick={()=> setShowMenu(!showMenu)}
	  />

	  </span>
	  {
	  maskTransitions.map(({ item, key, props }) =>
	  item && 
		<animated.div 
		  key={key} 
		  style={props} 
		  className="bg-black-t-50  fixed top-0 left-0 w-full h-full z-50"
		  onClick={()=>setShowMenu(false)}
		>

		</animated.div>
	  ) 
	  }
	  {
	  menuTransitions.map(({ item, key, props }) =>
	  item && 
		<animated.div 
		  key={key} 
		  style={props} 
		  className="fixed bg-white top-0 left-0 w-4/5 h-full z-50 shadow"
		>
		<span className="font-bold">
		The menu
		</span>
		  <ul>
			{/* <li onClick ={()=>setShowMenu(false)}><Link to="/">home</Link> </li> */}
			{/* <li onClick ={()=>setShowMenu(false)}><Link to="/about">about</Link> </li> */}
		  </ul>
		</animated.div>
	  ) 
	  }
	</nav>
  )
}


export default Navigation
