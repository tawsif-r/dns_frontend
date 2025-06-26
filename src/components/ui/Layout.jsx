import React, { useState, useEffect, useRef } from 'react';
import Nav from './Nav';
import Notifications from '../Notifications';
import { Bell,CircleUser } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';

const Layout = ({ children }) => {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const notificationsRef = useRef(null);
  const navigate = useNavigate()

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setIsNotificationsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="h-screen flex flex-col bg-gray-900 text-white overflow-hidden">
      {/* Fixed Header */}
      <header className="sticky top-0 z-50 bg-gray-800 border-b-2 border-gray-700 shadow-md">
        <div className="flex justify-between items-center">
          <div className="p-4 font-bold text-xl text-cyan-400">Dns</div>
          {/* Header Navigation */}
          <div className="flex relative">
            <div
              className="p-3 flex items-center hover:bg-gray-700 transition-colors cursor-pointer"
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            >
              <Bell className="m-2" size={18} />
              
            </div>
            {isNotificationsOpen && (
              <div ref={notificationsRef}>
                <Notifications onClose={() => setIsNotificationsOpen(false)} />
              </div>
            )}
            
            <div className="p-3 hover:bg-gray-700 transition-colors cursor-pointer">
            <CircleUser className="m-2" size={18} />
            </div>
            <div className="p-3 hover:bg-gray-700 transition-colors cursor-pointer">
            <button onClick= {()=>navigate('/logout')}><LogOut /></button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area with Fixed Sidebars */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Nav - Fixed */}
        <Nav className="h-full" />
        
        {/* Scrollable Content Area */}
        <main className="flex-1 overflow-y-auto">
          <div className="px-4 py-4">
            {/* <p className="mb-6 text-gray-300">
              DnsApp bridges the gap by acting as a smart intermediary between telecommunication companies, content providers, and subscribers, delivering tailored job alerts and curated content straight to your fingertips.
            </p> */}
            {children}
          </div>
        </main>
        
        {/* Right Sidebar - Fixed */}
        {/* <aside className="w-64 border-l-2 border-gray-700 bg-gray-800 hidden lg:block overflow-y-auto">
          <div className="p-6">
            <div className="border-2 border-gray-600 p-3 mb-4 rounded-md hover:border-cyan-600 transition-colors">
              Recent
            </div>
            <div className="border-2 border-gray-600 p-3 rounded-md hover:border-cyan-600 transition-colors">
              News
            </div>
          </div>
        </aside> */}
      </div>

      {/* Footer */}
      <footer className="border-t-2 border-gray-700 p-6 bg-gray-800 text-center text-gray-400">
        Footer
      </footer>
    </div>
  );
};

export default Layout;