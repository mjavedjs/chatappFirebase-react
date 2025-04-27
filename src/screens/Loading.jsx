import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebaseConfig';
import { useEffect } from 'react';
const Loading = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check user on component mount
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        console.log("User is logged in:", user);
        navigate('/home'); // ✅ navigate to chat or home page
        
      } else {
        // User is signed out
        console.log("No user is logged in");
        // 
        // stay on loading or show login/signup
      }
    });

    // Cleanup the listener when component unmounts
    return () => unsubscribe();
  }, [navigate]);

  return (
    <div className="h-screen w-full bg-gradient-to-br from-green-400 to-green-600 flex flex-col justify-center items-center text-white px-4">
      {/* Logo or App Name */}
      <div className="mb-12 text-center animate-fade-in">
        <h1 className="text-5xl font-extrabold tracking-wide mb-2">JavChat App</h1>
        <p className="text-lg opacity-90">Connect. Chat. Share instantly.</p>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 animate-fade-in">
        <button onClick={() => navigate('/singin')} 
          className="bg-white text-green-600 px-8 py-3 rounded-full font-medium text-lg shadow-md hover:shadow-lg transition hover:scale-105">
          Login
        </button>
        <button onClick={() => navigate('/singup')} 
          className="bg-white text-green-600 px-8 py-3 rounded-full font-medium text-lg shadow-md hover:shadow-lg transition hover:scale-105">
          Signup
        </button>
      </div>
    </div>
  );
};

export default Loading;
