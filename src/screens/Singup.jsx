import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebaseConfig';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore"; 
import { db } from '../firebaseConfig';

const Singup = () => {
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [imageFile, setImageFile] = useState(null);

  const navigate = useNavigate();
 const goToSignin = () =>( navigate('/Singin'))
  
  const handluserValue = async () => {
    try {
      let imageUrl = "";

      if (imageFile) {
        const formData = new FormData();
        formData.append('file', imageFile);
        formData.append('upload_preset', 'my_preset');  
        formData.append('cloud_name', 'dhro6nafp'); 
  
        const res = await fetch('https://api.cloudinary.com/v1_1/dhro6nafp/image/upload', {
          method: 'POST',
          body: formData,
        });
  
        const data = await res.json();
        imageUrl = data.secure_url;
        console.log('Uploaded image URL:', imageUrl);
      }
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const docRef = await addDoc(collection(db, "users"), {
        name,
        email,
        password,
        time: Date.now(),
        createdAt: new Date(),
        uid: auth.currentUser.uid,
        img: imageUrl,
      });
      console.log("User signed up & Document written with ID: ", docRef.id);
      navigate("/home"); // Redirect to home after success
    } catch (error) {
      console.error("Error during signup:", error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        <h2 className="text-3xl font-bold text-center text-green-600 mb-6">
          Create Your Account
        </h2>

        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block mb-1 font-medium text-gray-700">Full Name</label>
            <input
              value={name}
              onChange={(e) => setname(e.target.value)}
              type="text"
              placeholder="e.g. Muhammad Javed"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Email</label>
            <input
              value={email}
              onChange={(e) => setemail(e.target.value)}
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Password</label>
            <input
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input type="text" />
          </div>
          <div>
  <label className="block mb-1 font-medium text-gray-700">Profile Image</label>
  <input
    type="file"
    accept="image/*"
    onChange={(e) => setImageFile(e.target.files[0])}
     className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
  />
</div>

          <button
            onClick={handluserValue}
            type="button"
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition duration-300"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
           have an account?{' '}
          <span
            onClick={goToSignin} // Trigger navigation to the Sign Up page
            className="text-green-600 font-medium cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Singup;
