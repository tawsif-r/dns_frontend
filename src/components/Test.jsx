import React from 'react';

import { useState } from 'react';
import { Menu } from 'lucide-react';
import { ChevronLeft } from 'lucide-react';

const Test = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  return (
      <div class="absolute bottom-0 top-0 left-0 border-r bg-gray-900/80 backdrop-blur-sm flex-shrink-0 border-gray-200 flex-col sm:flex z-50">
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
  )
}

export default Test