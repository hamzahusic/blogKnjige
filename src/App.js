import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddBlog from './pages/AddBlog'
import BlogPost from './pages/BlogList'
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="">
      <Navbar></Navbar>
      <br />
      <Routes>
        <Route path="/" element={ <Home/> } />
        <Route path="/BlogList" element={ <BlogPost/> } />
        <Route path="/AddBlog" element={ <AddBlog/> } />
      </Routes>
    </div>
  );
}

export default App;
