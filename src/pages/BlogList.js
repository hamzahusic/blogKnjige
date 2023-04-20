import { deleteObject, getDownloadURL, ref } from "firebase/storage";
import { useEffect, useState } from "react";
import { db, storage } from "../firebaseConfig";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { BarLoader } from "react-spinners";
import { useRef } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

const BlogList = () => {
    const [blogList,setBlogList] = useState()
    const [loading, setLoading] = useState(false);
    const [user,setUser] = useState(null);//Only for delete button

    useEffect(() => {
        //Set's user if there is cookie
        setUser(Cookies.get("user"));

        const unsubscribe = onSnapshot(collection(db, "blogs"), (snapshot) => {
            const blogs = []
            snapshot.docs.map(doc => {
                blogs.push({ id: doc.id, ...doc.data() })
            })

            blogs.forEach(blog => {
                const storageRef = ref(storage, blog.imageUrl);
                getDownloadURL(storageRef).then((url) => {
                    blog.imageURL = url;
                    setBlogList ([...blogs])
                    setLoading(true)
                }).catch((error) => {
                    console.log(error);
                    setLoading(true)
                });
            });
            
        })

        return () => unsubscribe()
    }, [])

    const deleteBlog = async (blog) => {
        const desertRef = ref(storage,  blog.imageUrl);
        //to show user it's changing
        setLoading(true)
        // Delete the file
        deleteObject(desertRef).then(() => {
        // File deleted successfully
            deleteDoc(doc(db, "blogs", blog.id))
            setLoading(true)
        }).catch((error) => {
        // Uh-oh, an error occurred!
            setLoading(true)
        alert("Error deleting blog!!")
        console.log(error)
        });
    }

    return ( 
        <div className="relative pt-16 pb-20 px-4 sm:px-6 lg:pt-32 lg:pb-28 lg:px-8">
            <div className="relative max-w-7xl mx-auto">
                <div className="text-center">
                    <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">Svi blogovi</h2>
                    <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsa libero labore natus atque, ducimus sed.
                    </p>
                </div>
                <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
                    {blogList && loading && blogList.map((blog) => (
                        <div key={blog.id} className="relative">
                            {user && <button onClick={() => deleteBlog(blog)} className="absolute top-[-10px] right-[-10px] font-bold text-white bg-gray-500 py-2 px-4 rounded-full">X</button>}
                            <Link to = {`/BlogList/blog/${blog.id}`} className="flex flex-col rounded-lg shadow-lg overflow-hidden min-h-full">
                                <div className="flex-shrink-0">
                                    <img className="h-48 w-full object-cover" src={blog.imageURL} alt="Image" />
                                </div>
                                <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-indigo-600">
                                            {blog.category}
                                        </p>
                                        <div className="block mt-2">
                                            <p className="text-xl font-semibold text-gray-900">{blog.title}</p>
                                            <p className="mt-3 text-base text-gray-500">{blog.description}</p>
                                        </div>
                                    </div>
                                    <p className="text-sm font-bold pt-4">Vrijeme citanja : {blog.readingTime}</p>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
                {!loading && (
                    <div className="w-full flex items-center justify-center">
                        <BarLoader width="50%" color="blue" />
                    </div>
                )}
                {loading && !blogList && (
                    <div className="w-full flex items-center justify-center">
                        <h1>No blogs yet!!!</h1>
                    </div>
                )}
            </div>
        </div>
    );
}
 
export default BlogList
