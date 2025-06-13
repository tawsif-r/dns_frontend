import React from 'react';
import { Menu, ChevronLeft, LampDesk, Phone, Home, FileText, Users, CreditCard, Tag, MessageSquare, BarChart2, TestTube } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleMenu } from '../../redux/Nav';
import { Link, useLocation } from 'react-router-dom';

const Nav = () => {
  const menu = useSelector((state) => state.nav.menuOpen);
  const dispatch = useDispatch();
  const location = useLocation();

  // Navigation items with their icons
  const navItems = [
    { path: '/', label: 'Home', icon: <Home size={18} /> },
    { path: '/contents', label: 'Contents', icon: <FileText size={18} /> },
    { path: '/subscribers', label: 'Subscribers', icon: <Users size={18} /> },
    { path: '/subscriptionPlans', label: 'Subscription', icon: <CreditCard size={18} /> },
    { path: '/categories', label: 'Categories', icon: <Tag size={18} /> },
    { path: '/operators', label: 'Operators', icon: <Phone size={18} /> },
    { path: '/messages', label: 'Messages', icon: <MessageSquare size={18} /> },
    { path: '/reports', label: 'Report', icon: <BarChart2 size={18} /> },
    { path: '/subscribertester', label: 'SubTester', icon: <TestTube size={18} /> },
    { path: '/jobEntry', label: 'JobEntry', icon: <LampDesk size={18} /> },
  ];

  return (
    <aside className="bg-gray-800 border-r-2 border-gray-700 h-full flex flex-col flex-shrink-0 transition-all duration-300 ease-in-out">
      <div className="h-16 flex mx-2 items-center justify-center">
        <button 
          onClick={() => dispatch(toggleMenu())}
          className="p-2 rounded-md hover:bg-gray-700 transition-colors duration-200"
          aria-label={menu ? "Collapse sidebar" : "Expand sidebar"}
        >
          {menu ? (
            <ChevronLeft className="w-6 h-6 text-cyan-400 transition-transform duration-300" />
          ) : (
            <Menu className="w-6 h-6 text-cyan-400 transition-transform duration-300" />
          )}
        </button>
      </div>

      <nav 
        className={`
          ${menu ? 'w-48' : 'w-16'} 
          transition-all duration-300 ease-in-out 
          flex-grow overflow-y-auto
          py-4 px-2
        `}
      >
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link 
              key={item.path}
              to={item.path}
              className={`
                flex items-center rounded-md my-1 px-3 py-2 
                transition-all duration-200
                ${isActive ? 'bg-gray-700 text-cyan-400' : 'hover:bg-gray-700 hover:text-cyan-400 text-gray-300'}
              `}
            >
              <div className="flex-shrink-0">{item.icon}</div>
              <span 
                className={`
                  ml-3 whitespace-nowrap
                  ${menu ? 'opacity-100 visible' : 'opacity-0 invisible absolute'}
                  transition-opacity duration-200
                `}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Nav;