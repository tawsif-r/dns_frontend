import React from 'react'
import Nav from './Nav'

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
            <div className='border-2 flex justify-between'>
                <div className='border-2 p-4'>Logo</div>
                {/*Header */}
                <div className="border-2 flex justify-end">
                    <div className='border-2 p-3'>About</div>
                    <div className='border-2 p-3'>Contact</div>
                    <div className='border-2 p-3'>Profile</div>

                </div>
                {/*header end */}
            </div>
            {/* content */}
            <div className='flex justify-start'>
                <Nav />
                <div className="px-4 py-8">
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consectetur illum omnis nam autem voluptatibus tempore provident esse inventore expedita quidem alias culpa, quibusdam, nesciunt incidunt rem architecto, eius impedit doloribus?</p>
                    <main>{children}</main>
                </div>
                <div className='border-l-2 p-6'>
                    <div className='border-2 p-3'>Recent</div>
                    <div className='border-2 p-3'>News</div>
                </div>
            </div>
            {/**content end */}
            <div className='border-2 p-10'>Footer</div>
        </div>
  )
}

export default Layout