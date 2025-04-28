import React, { useEffect, useState } from 'react';
import { db, auth } from '../firebaseConfig';
import { useParams } from 'react-router-dom';
import { collection, addDoc, query, where, getDocs ,orderBy} from "firebase/firestore";

const Chat = () => {
  const { uid } = useParams();
  const currentUid = auth.currentUser?.uid;

  const [text, setText] = useState('');
  const [data, setData] = useState([]);
  const [prevdata, setPrevData] = useState([]);

  const getUserData = async () => {
    if (!text.trim()) return; // prevent empty messages
    try {
      const docRef = await addDoc(collection(db, "userschat"), {
        texts: text,
        currentUid: currentUid,
        uid: uid,
        createdAt: new Date()
      });
      console.log("Document written with ID: ", docRef.id);
      setText('');
      renderUserData();
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const getDataFromDb = async () => {
    try {
      const q = query(collection(db, "users"));
      const querySnapshot = await getDocs(q);
      const users = [];
      querySnapshot.forEach((doc) => {
        users.push({ id: doc.id, ...doc.data() });
      });
      setPrevData(users);
    } catch (err) {
      console.error(err);
    }
  };

  const renderUserData = async () => {
    const q = query(
      collection(db, "userschat"), 
      where("uid", "==", uid), 
      orderBy("createdAt", "asc") // Ascending order
    );
    
    const querySnapshot = await getDocs(q);
    const chats = [];
    querySnapshot.forEach((doc) => {
      chats.push(doc.data());
    });
  
    setData(chats);
  };
  
  useEffect(() => {
    renderUserData();
    getDataFromDb();
  }, [uid]);

  return (
    <div className="bg-gradient-to-br from-indigo-100 via-white to-indigo-100 min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl flex flex-col h-[90vh] overflow-hidden">

        {/* Header */}
        {prevdata && prevdata
  .filter(res => res.uid === uid)
  .map((res) => (
    <div key={res.uid} className="flex items-center bg-blue-600 text-white p-5 rounded-t-3xl mb-2">
      <img 
        src={res.img ? res.img : 'NO IMGAG'} 
        alt="User Avatar" 
        className="w-12 h-12 rounded-full mr-4 shadow-md object-cover"
      />
      <h2 className="text-2xl font-bold">{res.name}</h2>
    </div>
))}

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
          {data.length > 0 ? (
            data.map((item, index) => (
              <div 
                key={index}
                className={`flex ${item.currentUid === currentUid ? 'justify-start' : 'justify-end'}`}
              >
                <div className={`max-w-xs md:max-w-sm px-5 py-3 rounded-2xl shadow ${item.currentUid === currentUid ? 'bg-indigo-500 text-white' : 'bg-gray-300 text-black'}`}>
                  {item.texts}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-400 mt-10">No messages yet. Start the conversation!</div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-5 bg-white flex items-center gap-3 border-t">
          <input 
            type="text"  
            placeholder="Write your message..." 
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="flex-1 border border-gray-300 rounded-full py-3 px-5 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-700"
          />
          <button
            onClick={getUserData}
            className="bg-indigo-500 hover:bg-indigo-600 transition-all text-white px-6 py-3 rounded-full font-semibold"
          >
            Send
          </button>
        </div>

      </div>
    </div>
  );
};

export default Chat;
