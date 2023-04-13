import { Link } from "react-router-dom";

const Navbar = () => {
    return ( 
        <div className="bg-red-200 p-5 flex gap-5">
            <Link to="/">Home</Link>
            <Link to="/BlogList">Blog Posts</Link>
            <Link to="/AddBlog">Add Blog</Link>
        </div>
     );
}
 
export default Navbar;
