import React, { useState } from 'react'
import Title from '../../componenets/Title'
import { assets, dashboardDummyData } from '../../assets/assets'

const Dashboard = () => {

    const [dashboardData, setDashboardData] = useState(dashboardDummyData)
  return (
    <div>
        <Title title="DashBoard" font='outfit' align='left' subtitle='Monitor your room listing, track bookings and analyse revenue-all in one plac. Stay updated with real time inside to ensure smooth operations'/>

        <div className='flex gap-4 my-8'>

            {/* total bookings */}
            <div className='bg-primary/3  border border-primary/20 rounded flex p-4 pr-8'>
                <img src={assets.totalBookingIcon} alt="" className="max-sm:hidden h-10"/>
                <div className=' flex flex-col font-medium sm:ml-4'>
                    <p className=' text-blue-500 text-lg'>Total Booking</p>
                    <p className=' text-neutral-400 text-base'>{dashboardData.totalBookings}</p>
                </div>

            </div>

            {/* total revenue */}
            <div className='bg-primary/3  border border-primary/20 rounded flex p-4 pr-8'>
                <img src={assets.totalRevenueIcon} alt="" className="max-sm:hidden h-10"/>
                <div className=' flex flex-col font-medium sm:ml-4'>
                    <p className=' text-blue-500 text-lg'>Total Revenue</p>
                    <p className=' text-neutral-400 text-base'>₹{dashboardData.totalRevenue}</p>
                </div>

            </div>

        </div>
        {/* Recent Bookings */}
        <h2 className='text-xl text-blue-900/70 font-medium mb-5'>Recent Booking</h2>
        <div className=' w-full max-w-3xl text-left border border-gray-300 rounded-lg overflow-y-scroll max-h-80'>
            <table className='w-full '>
                <thead className='bg-gray-50'>
                    <tr>
                        <th className='py-3 px-4 font-medium text-gray-800'>User Name</th>
                        <th className='py-3 px-4 font-medium text-gray-800 max-sm:hidden'>Room Name</th>
                        <th className='py-3 px-4 font-medium text-gray-800 text-center'>Total Amount </th>
                        <th className='py-3 px-4 font-medium text-gray-800 text-center'>Payment Status</th>
                    </tr>
                </thead>
                <tbody className='text-sm'>
                    {dashboardData.bookings.map((item, index) => (
                        <tr key={index} >
                            <td className='py-3 px-4 text-gray-700 border-t border-gray-300'>
                                {item.user.username}
                            </td>

                            <td className='py-3 px-4 text-gray-700 border-t border-gray-300 max-sm:hidden'>
                                {item.room.roomType}
                            </td>

                            <td className='py-3 px-4 text-gray-700 border-t border-gray-300 text-center'>
                            ₹{item.totalPrice}
                            </td>

                            <td className='py-3 px-4 border-t border-gray-300 flex text-center'>
                                <button className={`py-1 px-3 text-xs rounded-full mx-auto ${item.isPaid ? 'bg-green-300 text-green-600': 'bg-amber-300 text-amber-600'}`}>{item.isPaid ? 'completed': 'Pending'}</button>
                            </td>

                        </tr>
                    ))}

                </tbody>
            </table>
        </div>
    </div>
  )
}

export default Dashboard