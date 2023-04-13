import { useState } from "react";
import LoginForm from "../components/LoginForm";

const BlogPost = () => {
    const [user,setUser] = useState(false);
    return ( 
        <div>
            {user ? (
                <div className="pt-14">
                    <h1>Logged in</h1>
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
