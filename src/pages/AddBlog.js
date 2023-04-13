import { useState } from "react";

const BlogPost = () => {
    const [user,setUser] = useState(false);
    return ( 
        <div>
            {user ? (
                <div>
                    <h1>Logged in</h1>
                </div>
            ) : (
                <div>
                    <h1>Not logged in</h1>
                </div>
            )}
        </div>
     );
}
 
export default BlogPost
