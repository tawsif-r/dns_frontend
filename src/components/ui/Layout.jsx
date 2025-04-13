import React from 'react';
import Nav from './Nav';

const Layout = ({ children }) => {
  return (
    <div className="h-screen flex flex-col bg-gray-900 text-white overflow-hidden">
      {/* Fixed Header */}
      <header className="sticky top-0 z-50 bg-gray-800 border-b-2 border-gray-700 shadow-md">
        <div className="flex justify-between items-center">
          <div className="p-4 font-bold text-xl text-cyan-400">Logo</div>
          {/* Header Navigation */}
          <div className="flex">
            <div className="p-3 hover:bg-gray-700 transition-colors cursor-pointer">About</div>
            <div className="p-3 hover:bg-gray-700 transition-colors cursor-pointer">Contact</div>
            <div className="p-3 hover:bg-gray-700 transition-colors cursor-pointer">Profile</div>
          </div>
        </div>
      </header>

      {/* Main Content Area with Fixed Sidebars */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Nav - Fixed */}
        <Nav className="h-full" />
        
        {/* Scrollable Content Area */}
        <main className="flex-1 overflow-y-auto">
          <div className="px-4 py-8">
            <p className="mb-6 text-gray-300">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consectetur illum omnis nam autem voluptatibus tempore provident esse inventore expedita quidem alias culpa, quibusdam, nesciunt incidunt rem architecto, eius impedit doloribus?
            </p>
            {children}
          </div>
        </main>
        
        {/* Right Sidebar - Fixed */}
        <aside className="w-64 border-l-2 border-gray-700 bg-gray-800 hidden lg:block overflow-y-auto">
          <div className="p-6">
            <div className="border-2 border-gray-600 p-3 mb-4 rounded-md hover:border-cyan-600 transition-colors">
              Recent
            </div>
            <div className="border-2 border-gray-600 p-3 rounded-md hover:border-cyan-600 transition-colors">
              News
            </div>
          </div>
        </aside>
      </div>

      {/* Footer */}
      <footer className="border-t-2 border-gray-700 p-6 bg-gray-800 text-center text-gray-400">
        Footer
      </footer>
    </div>
  );
};

export default Layout;