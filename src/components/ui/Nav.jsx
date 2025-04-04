import React from 'react';
import { Link } from 'react-router-dom';
import { BriefcaseIcon, UsersIcon, MessageCircleIcon, CreditCardIcon, BarChart2Icon } from 'lucide-react';

const Nav = () => {
  return (
    <div>
      <ul className="space-y-4">
        {/* Jobs */}
        <li>
          <Link to="/test" className="flex items-center p-2 hover:bg-purple-700 rounded transition duration-200 text-white">
            <BriefcaseIcon className="mr-2 h-5 w-5 text-purple-400" />
            Test
          </Link>
        </li>

        {/* Subscribers */}
        <li>
          <a href="#subscribers" className="flex items-center p-2 hover:bg-purple-700 rounded transition duration-200 text-white">
            <UsersIcon className="mr-2 h-5 w-5 text-purple-400" />
            Subscribers
          </a>
        </li>

        {/* Messages */}
        <li>
          <a href="#messages" className="flex items-center p-2 hover:bg-purple-700 rounded transition duration-200 text-white">
            <MessageCircleIcon className="mr-2 h-5 w-5 text-purple-400" />
            Messages
          </a>
        </li>

        {/* Subscriptions */}
        <li>
          <a href="#subscriptions" className="flex items-center p-2 hover:bg-purple-700 rounded transition duration-200 text-white">
            <CreditCardIcon className="mr-2 h-5 w-5 text-purple-400" />
            Subscriptions
          </a>
        </li>

        {/* Reports */}
        <li>
          <a href="#reports" className="flex items-center p-2 hover:bg-purple-700 rounded transition duration-200 text-white">
            <BarChart2Icon className="mr-2 h-5 w-5 text-purple-400" />
            Reports
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Nav;