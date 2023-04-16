import { useState } from "react";
import LoginForm from "../components/LoginForm";
import AddBlogForm from "../components/AddBlogForm";

const BlogPost = () => {
    const [user,setUser] = useState(false);

    return ( 
        <div>
            {user ? (
                <div className="pt-14">
                    <AddBlogForm/>
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
