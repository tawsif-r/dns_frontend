import React from 'react';

import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment, incrementByAmount, reset } from '../redux/Counter';
import { Menu } from 'lucide-react';
import { ChevronLeft } from 'lucide-react';

const Test = () => {
  // const count = useSelector((state) => state.counter.count);
  // const dispatch = useDispatch();


  const [menuOpen, setMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  return (
    // <div className='flex flex-col'>
    //   <div>
    //     <p>The current count is: {count}</p>
    //     <div className='border-4 m-4 border-solid  border-red-400'>
    //       <button className='bg-slate-500 px-2 ml-3' onClick={() => dispatch(increment())}>Increment
    //       </button>
    //       <button className="bg-slate-500 px-2 ml-3" onClick={() => dispatch(decrement())}>Decrement</button>
    //       <button className='bg-slate-500 px-2 ml-3' onClick={() => dispatch(incrementByAmount(20))}>Increase By 20</button>
    //       <button className="bg-red-900 px-2 ml-3" onClick={() => dispatch(reset())}>Reset</button>
    //     </div>


    //   </div>



    <div class="bg-gray-100 px-20 dark:bg-gray-900 dark:text-white text-gray-600 h-screen flex overflow-hidden text-sm">
      <div class="absolute bottom-0 top-0 left-0 border-r bg-gray-900/80 mx-2 backdrop-blur-sm flex-shrink-0 border-gray-200 flex-col sm:flex z-50">
        <div class="h-16 flex mx-4 items-center justify-center">
          <button onClick={() => setMenuOpen(!menuOpen)}>{menuOpen == true ? (<ChevronLeft />):(<Menu />)}</button>
        </div>


        {menuOpen && (
          
          <div class="flex mx-5 w-40 flex-grow mt-4 flex-col text-gray-400 space-y-4 animate-fadeIn">
            
            <button class="h-10 dark:text-gray-500 rounded-md flex items-center justify-center">
              Services
            </button>
            <button class="h-10 dark:text-gray-500 rounded-md flex items-center justify-center">
              Subscribers
            </button>
            <button class="h-10 dark:text-gray-500 rounded-md flex items-center justify-center">
              Operators
            </button>
            <button class="h-10 dark:text-gray-500 rounded-md flex items-center justify-center">
              Keywords
            </button>
          </div>

        )}

      </div>





      <div class="flex-grow overflow-hidden h-full flex flex-col">
        <div class="h-16 lg:flex w-full border-b border-gray-200 dark:border-gray-800 hidden px-10">
          <div class="flex h-full text-gray-600 dark:text-gray-400">
            <a href="#" class="cursor-pointer h-full border-b-2 border-transparent inline-flex items-center mr-8">Company</a>
            <a href="#" class="cursor-pointer h-full border-b-2 border-blue-500 text-blue-500 dark:text-white dark:border-white inline-flex mr-8 items-center">Users</a>
            <a href="#" class="cursor-pointer h-full border-b-2 border-transparent inline-flex items-center mr-8">Expense Centres</a>
            <a href="#" class="cursor-pointer h-full border-b-2 border-transparent inline-flex items-center">Currency Exchange</a>
          </div>
          <div class="ml-auto flex items-center space-x-7">
            <button class="h-8 px-3 rounded-md shadow text-white bg-blue-500">Deposit</button>

            <button class="flex items-center">
              <span class="relative flex-shrink-0">
                <span class="absolute right-0 -mb-0.5 bottom-0 w-2 h-2 rounded-full bg-green-500 border border-white dark:border-gray-900"></span>
              </span>
              <span class="ml-2">Tawsif</span>

            </button>
          </div>
        </div>
        <div class="flex-grow flex overflow-x-hidden">
          <div class="xl:w-72 w-48 flex-shrink-0 border-r border-gray-200 dark:border-gray-800 h-full overflow-y-auto lg:block hidden p-5">
            <div class="text-xs text-gray-400 tracking-wider">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 
                  focus:outline-none focus:ring-2 focus:ring-gray-600 transition duration-200"
              >
                Services

              </button>


            </div>
            <div class="relative mt-2">
              <input type="text" class="pl-8 h-9 bg-transparent border border-gray-300 dark:border-gray-700 dark:text-white w-full rounded-md text-sm" placeholder="Search" />
              <svg viewBox="0 0 24 24" class="w-4 absolute text-gray-400 top-1/2 transform translate-x-0.5 -translate-y-1/2 left-2" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>
            <div class="space-y-4 mt-3">
              <button class="bg-white p-3 w-full flex flex-col rounded-md dark:bg-gray-800 shadow">
                <div class="flex xl:flex-row flex-col items-center font-medium text-gray-900 dark:text-white pb-2 mb-2 border-gray-200 border-opacity-75 dark:border-gray-700 w-full">

                  Jobs
                </div>

              </button>
              <button class="bg-white p-3 w-full flex flex-col rounded-md dark:bg-gray-800 shadow-lg relative focus:outline-none">
                <div class="flex xl:flex-row flex-col items-center font-medium text-gray-900 dark:text-white pb-2 mb-2 border-gray-200 border-opacity-75 dark:border-gray-700 w-full">

                  Sports
                </div>

              </button>
            </div>
          </div>
          <div class="flex-grow bg-white dark:bg-gray-900 overflow-y-auto">
            <div class="sm:px-7 sm:pt-7 px-4 pt-4 flex flex-col w-full border-b border-gray-200 bg-white dark:bg-gray-900 dark:text-white dark:border-gray-800 sticky top-0">

              <div class="flex items-center space-x-3 sm:mt-7 mt-4">
                <a href="#" class="px-3 border-b-2 border-blue-500 text-blue-500 dark:text-white dark:border-white pb-1.5">Activities</a>
                <a href="#" class="px-3 border-b-2 border-transparent text-gray-600 dark:text-gray-400 pb-1.5">Transfer</a>
                <a href="#" class="px-3 border-b-2 border-transparent text-gray-600 dark:text-gray-400 pb-1.5 sm:block hidden">Budgets</a>
                <a href="#" class="px-3 border-b-2 border-transparent text-gray-600 dark:text-gray-400 pb-1.5 sm:block hidden">Notifications</a>
                <a href="#" class="px-3 border-b-2 border-transparent text-gray-600 dark:text-gray-400 pb-1.5 sm:block hidden">Cards</a>
              </div>
            </div>
            <div class="sm:p-7 p-4">

              <table class="w-full text-left">
                <thead>
                  <tr class="text-gray-400">
                    <th class="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800">Type</th>
                    <th class="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800">Where</th>
                    <th class="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800 hidden md:table-cell">Description</th>
                    <th class="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800">Amount</th>
                    <th class="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800 sm:text-gray-400 text-white">Date</th>
                  </tr>
                </thead>
                <tbody class="text-gray-600 dark:text-gray-100">
                  <tr>
                    <td class="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
                      <div class="flex items-center">

                        Card
                      </div>
                    </td>
                    <td class="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
                      <div class="flex items-center">
                        PayPal
                      </div>
                    </td>
                    <td class="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800 md:table-cell hidden">Subscription renewal</td>
                    <td class="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800 text-red-500">- $120.00</td>
                    <td class="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
                      <div class="flex items-center">
                        <div class="sm:flex hidden flex-col">
                          24.12.2020
                          <div class="text-gray-400 text-xs">11:16 AM</div>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>

            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Test