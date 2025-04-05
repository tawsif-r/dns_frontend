// HomeLayout.jsx
import React from 'react';

const Layout = ({ header, sidebar, mainContent, footer }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4">
        {header || <h1 className="text-xl font-bold">My Website</h1>}
      </header>
      
      {/* Main content area with sidebar */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-100 p-4">
          {sidebar || <p>Navigation links here</p>}
        </aside>
        
        {/* Main content */}
        <main className="flex-1 p-6">
          {mainContent || <p>Main content goes here</p>}
        </main>
      </div>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white p-4 text-center">
        {footer || <p>© 2025 My Website</p>}
      </footer>
    </div>
  );
};

export default Layout;