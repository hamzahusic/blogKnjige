import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddBlog from './pages/AddBlog'
import BlogList from './pages/BlogList'
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import BlogPage from "./pages/BlogPage";
import { UserContext } from "./lib/userContext";
import { useState } from "react";

function App() {
  const [user,setUser] = useState(null);
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
