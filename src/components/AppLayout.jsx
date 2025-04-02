import { Outlet } from 'react-router-dom';
function AppLayout() {
    return (
      <div className="min-h-screen bg-gray-900 text-white font-mono flex">
        {/* Sidebar */}
        <div className="w-64 bg-gray-800 p-4 fixed h-screen">
          <Nav />
        </div>
  
        {/* Main Content */}
        <div className="flex-1 ml-64 p-6">
          <header className="mb-8 flex justify-between items-center">
            <h1 className="text-3xl font-bold text-purple-400">Admin Dashboard</h1>
            <input
              type="text"
              placeholder="Search..."
              className="px-4 py-2 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 w-64"
            />
          </header>
  
          {/* Render the matched route here */}
          <Outlet />
        </div>
      </div>
    );
  }
export default AppLayout;