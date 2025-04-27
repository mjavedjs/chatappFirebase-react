import React, { useEffect, useState } from 'react';
import { db, auth } from '../firebaseConfig';
import { useParams } from 'react-router-dom';
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";

const Chat = () => {
  const { uid } = useParams(); 
  const currentUid = auth.currentUser?.uid;

  const [text, setText] = useState('');
  const [data, setdata] = useState([]);

  const getuserData = async () => {
    try {
      const docRef = await addDoc(collection(db, "userschat"), {
        texts: text,
        currentUid: currentUid,
        uid: uid
      });
      console.log("Document written with ID: ", docRef.id);
      setText('');
      renderuserdata();
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const renderuserdata = async () => {
    const q = query(collection(db, "userschat"), where("uid", "==", uid));
    const querySnapshot = await getDocs(q);
    const chats = [];
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      chats.push(doc.data());
    });
    setdata(chats);
  };

  useEffect(() => {
    renderuserdata();
    console.log(data);
  }, [uid]);

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
        send
      </button>
      {data.map((item, index) => (
        <div key={index}>{item.texts}</div>
      ))}
    </div>
  );
};

export default Chat;
