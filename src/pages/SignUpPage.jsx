import React, { useState } from 'react';

function SignUpPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your sign-up logic here
    if (password !== confirmPassword) {
      console.error('Passwords do not match');
      return;
    }
    console.log('Sign-up attempt with:', { name, email, password });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="border-2 border-gray-700 rounded-lg p-8 m-4 max-w-md w-full bg-gray-800">
        <h2 className="text-2xl font-semibold text-white mb-6 text-center">Sign Up</h2>
        <div>
          <div className="mb-4">
            <label className="block text-white font-semibold mb-2" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 rounded-md bg-gray-700 text-white border-2 border-gray-600 focus:outline-none focus:border-gray-500"
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-white font-semibold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-md bg-gray-700 text-white border-2 border-gray-600 focus:outline-none focus:border-gray-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-white font-semibold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-md bg-gray-700 text-white border-2 border-gray-600 focus:outline-none focus:border-gray-500"
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-white font-semibold mb-2" htmlFor="confirm-password">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-3 rounded-md bg-gray-700 text-white border-2 border-gray-600 focus:outline-none focus:border-gray-500"
              placeholder="Confirm your password"
              required
            />
          </div>
          <button
            onClick={handleSubmit}
            className="w-full p-3 bg-gray-600 text-white font-semibold rounded-md border-2 border-gray-500 hover:bg-gray-500 transition-colors"
          >
            Create Account
          </button>
        </div>
        <p className="text-gray-400 text-center mt-4">
          Already have an account?{' '}
          <a href="/login" className="text-gray-300 hover:underline">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}

export default SignUpPage;