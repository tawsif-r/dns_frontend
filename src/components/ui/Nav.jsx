import React from 'react';

import { Menu, ChevronLeft } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleMenu } from '../../redux/Nav';
import { Link } from 'react-router-dom'

const Nav = () => {

  const menu = useSelector((state) => state.nav.menuOpen);
  const dispatch = useDispatch()
  return (
    <div className="font-mono bottom-0 border-r-2 border-slate-300 min-h-screen flex-shrink-0  flex-col sm:flex z-50 transition-all duration-300 ease-in-out">
      <div className="h-16 flex mx-4 items-center justify-center">
        <button 
          onClick={() => dispatch(toggleMenu())}
          className="p-2 rounded-md transition-colors duration-200"
        >
          {menu ? (
            <ChevronLeft className="w-6 h-6 transition-transform duration-300" />
          ) : (
            <Menu className="w-6 h-6 transition-transform duration-300" />
          )}
        </button>
      </div>

      <div 
        className={`${
          menu ? 'opacity-100 w-48' : 'opacity-0 w-0'
        } overflow-hidden transition-all duration-300 ease-in-out mx-5 flex-grow mt-4 flex-col text-gray-200 space-y-4`}
      >
        <button className="h-10 px-4 rounded-md flex items-center justify-center hover:text-cyan-500 transition-all duration-200">
        <Link to="/">
            Home
          </Link>
        </button>
        <button className="h-10 px-4 rounded-md flex items-center justify-center hover:text-cyan-500 transition-all duration-200">
        <Link to="/contents">
            Contents
          </Link>
        </button>
        <button className="h-10 px-4 rounded-md flex items-center justify-center hover:text-cyan-500 transition-all duration-200">
        <Link to="/subscribers">
            Subscribers
          </Link>
        </button>
        <button className="h-10 px-4 rounded-md flex items-center justify-center hover:text-cyan-500 transition-all duration-200">
        <Link to="/subscriptionPlans">
            Subscription
          </Link>
        </button>
        <button className="h-10 px-4 rounded-md flex items-center justify-center hover:text-cyan-500 transition-all duration-200">
        <Link to="/categories">
            Categories
          </Link>
        </button>
        <button className="h-10 px-4 rounded-md flex items-center justify-center hover:text-cyan-500 transition-all duration-200">
        <Link to="/messages">
            Messages
          </Link>
        </button>
        <button className="h-10 px-4 rounded-md flex items-center justify-center hover:text-cyan-500 transition-all duration-200">
        <Link to="/reports">
            Report
          </Link>
        </button>
        <button className="h-10 px-4 rounded-md flex items-center justify-center hover:text-cyan-500 transition-all duration-200">
        <Link to="/tester">
            Tester
          </Link>
        </button>
      </div>
    </div>
  );
};

export default Nav;