import { useContext } from "react";
import LoginForm from "../components/LoginForm";
import AddBlogForm from "../components/AddBlogForm";
import { UserContext } from "../lib/userContext";

const BlogPost = () => {

    const {user,setUser} = useContext(UserContext);

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
