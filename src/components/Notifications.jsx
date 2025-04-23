import React, { useState, useEffect } from 'react';
import { Bell, Trash2, CheckCircle } from 'lucide-react';
import apiClient from '../api/axiosInstance';

const Notifications = ({ onClose }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const baseUrl = '/admin/api/contents/';
  useEffect(() => {
    const fetchNotifications = async () => {
      try { 
        const response = await apiClient.get(baseUrl);
        setNotifications(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching notifications:', error);
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const markAsRead = (id) => {
    setNotifications(
      notifications.map((notif) =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  return (
    <div className="absolute right-0 mt-2 w-80 bg-gray-800 border-2 border-gray-700 rounded-md shadow-lg z-50">
      <div className="p-4">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold text-cyan-400 flex items-center">
            <Bell className="mr-2" size={18} /> Notifications
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>

        {loading ? (
          <p className="text-gray-400 text-sm">Loading...</p>
        ) : notifications.length === 0 ? (
          <p className="text-gray-400 text-sm">No notifications.</p>
        ) : (
          <>
            <div className="max-h-64 overflow-y-auto space-y-2">
              {notifications.map((notif) => (
                <div
                  key={notif.id}
                  className={`p-2 rounded-md border ${
                    notif.read
                      ? 'border-gray-600 bg-gray-700'
                      : 'border-cyan-600 bg-gray-600'
                  } flex justify-between items-center`}
                >
                  <div>
                    <p className={`text-sm ${notif.read ? 'text-gray-400' : 'text-white'}`}>
                      {notif.title}
                    </p>
                    <p className="text-xs text-slate-900">
                      {new Date(notif.published).toLocaleTimeString()}
                    </p>
                  </div>
                  {!notif.read && (
                    <button
                      onClick={() => markAsRead(notif.id)}
                      className="text-cyan-400 hover:text-cyan-300"
                    >
                      <CheckCircle size={16} />
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button
              onClick={clearNotifications}
              className="mt-3 w-full flex items-center justify-center px-3 py-1 bg-red-600 hover:bg-red-700 rounded-md text-sm transition-colors"
            >
              <Trash2 className="mr-2" size={14} /> Clear All
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Notifications;