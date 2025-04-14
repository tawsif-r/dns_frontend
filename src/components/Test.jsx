import React from 'react';

import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment, incrementByAmount, reset } from '../redux/Counter';
import { Menu } from 'lucide-react';
import { ChevronLeft } from 'lucide-react';

const Test = () => {
  return (
    <div className='flex p-4 bg-gray-900 border-2 justify-end border-gray-200'>
      <p className='border-2 p-4 border-gray-200 text-slate-200'>This is the flex box</p>
      <p className='border-2 p-4 border-gray-200 text-slate-200'>This is also a flex box</p>
      <p className='border-2 p-4 border-gray-200 text-slate-200'>This is also a flex box</p>
    </div>
  )
}

export default Test