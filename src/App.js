import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddBlog from './pages/AddBlog'
import BlogList from './pages/BlogList'
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import BlogPage from "./pages/BlogPage";
import { UserContext } from "./lib/userContext";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseConfig";


function App() {
  const [user,setUser] = useState(null);
  
  //Listens if user is logged in so when page is refreshed he stays logged in
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      user ? setUser(user) : setUser(null);
    });
  },[])

  return (
    <>
      <UserContext.Provider value={{user,setUser}}>
        <Toaster
          position="top-right"
        />
          <div className="">
            <Navbar></Navbar>
            <br />
            <Routes>
              <Route path="/" element={ <Home/> } />
              <Route path="/BlogList" element={ <BlogList/> } />
              <Route path="/AddBlog" element={ <AddBlog/> } />
              <Route path="/BlogList/blog/:id" element={<BlogPage/>}/>
            </Routes>
          </div>
        </UserContext.Provider>
    </>
  );
}

export default App;
