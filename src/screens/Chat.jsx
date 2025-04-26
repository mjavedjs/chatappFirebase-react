import React, { useState } from 'react';
import { db, auth } from '../firebaseConfig';
import { useParams } from 'react-router-dom';
import { collection, addDoc } from "firebase/firestore"; 

const Chat = () => {
  const { uid } = useParams(); 
  const currentUid = auth.currentUser?.uid;
  
  const [text, setText] = useState('');

  const getuserData = async () => {
    try {
      const docRef = await addDoc(collection(db, "userschat"), {
        texts: text,
        currentUid: currentUid,
        uid: uid
      });
      console.log("Document written with ID: ", docRef.id);
      setText(''); // Clear input after sending
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <div className="w-full flex flex-col items-center mt-10">
      <input 
        type="text"  
        placeholder="Write text" 
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="border border-gray-300 rounded-md p-2 w-full max-w-md focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
      />
      <button
        onClick={getuserData}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Send
      </button>
    </div>
  );
};

export default Chat;
