import React from 'react'

const TesterPage = () => {
    return (
        <div className='bg-slate-600 min-h-screen text-white'>
            {/* header */}
            <div className='bg-slate-950 flex justify-between'>
                <div className='border-2 p-4'>Logo</div>
                {/* right header*/}
                <div className='flex flex-row'>
                    <div className='border-2 border-cyan-200 p-4'>Topics</div>
                    <div className='border-2 border-emerald-500 p-4'>News</div>
                    <div className='border-2 border-red-200 p-4'>
                        Profile pic
                    </div>
                </div>
                
            </div>
            {/* header end */}

            <div className='flex justify-start sm:flex-row'>
                {/* NAV bar */}
                <div className='bg-slate-400 boder-2 border-red-950'>
                    <div className='border-2 border-green-200 p-2'>Home</div>
                    <div className='border-2 border-green-200 p-2'>Categories</div>
                    <div className='border-2 border-green-200 p-2'>About</div>
                    <div className='border-2 border-green-200 p-2'>Contact</div>
                </div>
                {/*Nav bar end */}



                {/* Content */}
                <div className='bg-lime-800 border-2 border-red-400 min-h-screen'>
                    <div className=''><p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reiciendis illum porro dignissimos assumenda eveniet pariatur natus officia sed eos! Corporis tempora vel reiciendis atque molestiae, fugit corrupti expedita temporibus ipsam.</p></div>
                </div>
                {/* Content end */}


                {/* side bar */}
                <div className='bg-lime-800 border-2 border-red-400'>
                    <div className=''>
                        <ul>
                            <li className='bg-blue-900 border-2 border-red-400 p-4'>recent</li>
                            <li className='bg-blue-900 border-2 border-red-400 p-4'>old</li>
                            <li className='bg-blue-900 border-2 border-red-400 p-4'>miscellenious</li>
                        </ul>
                    </div>
                </div>
                {/* side bar end */}


            </div>
        </div>

    )
}

export default TesterPage