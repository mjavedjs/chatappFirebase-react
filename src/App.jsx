import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Loading from "./screens/Loading";
import Singin from "./screens/Singin";
import Singup from "./screens/Singup";
import Home from "./screens/Home";
import Chat from "./screens/Chat"
const router = createBrowserRouter([
   {path:'/',element:<Loading/>},
   { path: '/home', element: <Home /> },
   {path:'/singup',element:<Singup/>},
   {path:'/singin',element:<Singin/>},
   {path:'/chat/:uid',element:<Chat/>},
   {path: '*',element: <div className="text-center text-red-500 mt-10 text-lg">404 - Page Not Found</div>
  }
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
