import React from 'react'
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'

export const Sidebar = () => {

    const sidearLinks=[
        {name:"Dashboard", path:"/owner" , icon:assets.dashboardIcon},
        {name:"Add Room", path:"/owner/add-room", icon:assets.addIcon},
        {name:"List Room", path:"/owner/list-room", icon:assets.listIcon}
    ]
  return (
    <div className='md:w-64 w-16 border-r h-full text-base border-gray-300 pt-4 flex flex-col transition-all duration-300'>
        {sidearLinks.map((item, index) => (
            <NavLink to={item.path} key={index} end='/owner'
            className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 md:px-3 transition-all relative ${
                  isActive
                    ? 'bg-blue-100 text-blue-600 after:absolute after:top-0 after:right-0 after:h-full after:w-1 after:bg-blue-600'
                    : 'hover:bg-gray-100 text-gray-700'
                }`
              }
            >
               <img src={item.icon} alt={item.name} className='min-h-6 min-w-6'/>
               <p className=' hidden md:block text-center'>{item.name}</p>
            

            </NavLink>
        ))}
    </div>
  )
}
