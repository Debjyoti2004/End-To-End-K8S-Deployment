import { useState } from 'react';
import { UserPlus, Users } from 'lucide-react';

import { BACKEND_URL } from './config';

export default function App() {
  const [users, setUsers] = useState([]);

  const addRandomUser = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/add`);
      const data = await res.json();
      alert(`User created!\nUsername: ${data.username}\nPassword: ${data.password}`);
      getAllUsers();
    } catch (err) {
      console.error(err);
      alert('Failed to create user');
    }
  };

  const getAllUsers = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/users`);
      const data = await res.json();
      setUsers(data); 
    } catch (err) {
      console.error(err);
      alert('Failed to fetch users');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 font-sans flex flex-col items-center justify-start p-4 pt-20">
      <div className="w-full max-w-3xl mx-auto">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 md:p-12 border border-white/20 text-center text-white animate-fade-in-up">
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            User Management Dashboard
          </h1>
          <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-md mx-auto">
            A clean and modern interface to interact with your user database.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <button
              className="group flex items-center justify-center w-full sm:w-auto bg-indigo-500 text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-75 transition-all duration-300 ease-in-out transform hover:scale-105"
              onClick={addRandomUser}
            >
              <UserPlus className="w-5 h-5 mr-3 transition-transform duration-300 group-hover:rotate-12" />
              Add New User
            </button>
            
            <button
              className="group flex items-center justify-center w-full sm:w-auto bg-white/20 text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-opacity-75 transition-all duration-300 ease-in-out transform hover:scale-105"
              onClick={getAllUsers}
            >
              <Users className="w-5 h-5 mr-3 transition-transform duration-300 group-hover:translate-x-1" />
              Show All Users
            </button>
          </div>

          {users.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              {users.map((user) => (
                <div
                  key={user.id}
                  className="bg-white/10 backdrop-blur-md rounded-xl shadow-md p-4 text-left text-white border border-white/20"
                >
                  <p><span className="font-semibold">Username:</span> {user.username}</p>
                  <p><span className="font-semibold">Password:</span> {user.password}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
