import React, { useEffect, useState } from 'react';
import { collection, query, getDocs } from "firebase/firestore";
import { db, auth } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { signOut } from "firebase/auth";
import Nav from '../components/Navbar';

const Home = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate('/Singin');
    } catch (err) {
      console.error(err);
    }
  };

  const fetchUsers = async () => {
    try {
      const q = query(collection(db, "users"));
      const querySnapshot = await getDocs(q);
      const users = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setData(users);
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
    <Nav />
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white  rounded-xl shadow-lg mt-10">
        <div className="flex items-center justify-between  bg-blue-600 text-white p-4 rounded-t-xl">
          <h1 className="text-3xl font-bold">Chat App</h1>
          <button 
            onClick={handleSignOut} 
            className="bg-blue-300 hover:bg-red-600 hover:text-white  text-black font-bold py-2 px-6 rounded-full transition duration-300"
          >
            Sign Out
          </button>
        </div>
        <div className="px-6 py-4">
          {error && <p className="text-red-500">{error}</p>}
          <div className="space-y-4">
            {data.map((user) => (
              <div 
                key={user.id}
                className="flex items-center p-4 bg-gray-50 rounded-lg shadow-sm hover:bg-blue-100 cursor-pointer transition-all duration-300"
                onClick={() => navigate(`/chat/${user.uid}`)}
              >
                <div className="flex-shrink-0 w-12 h-12 bg-gray-400 rounded-full overflow-hidden">
                  <img src={user.img} alt="User" className="w-full h-full object-cover" />
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-medium">{user.name}</h3>
                  <p className="text-gray-600">Last message preview...</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Home;
