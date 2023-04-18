import { useEffect, useState } from "react";
import LoginForm from "../components/LoginForm";
import AddBlogForm from "../components/AddBlogForm";
import Cookies from "js-cookie";

const BlogPost = () => {
    const [user,setUser] = useState(false);

    useEffect(() => {
        setUser(Cookies.get("user"));
    },[])

    return ( 
        <div>
            {user ? (
                <div className="pt-14">
                    <AddBlogForm setUser={setUser}/>
                </div>
            ) : (
                <div>
                    <LoginForm setUser={setUser}/>
                </div>
            )}
        </div>
     );
}
 
export default BlogPost
