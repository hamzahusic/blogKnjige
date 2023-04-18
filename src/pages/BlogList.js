import { getDownloadURL, ref } from "firebase/storage";
import { useEffect, useState } from "react";
import { db, storage } from "../firebaseConfig";
import { collection, onSnapshot } from "firebase/firestore";
import { BarLoader } from "react-spinners";
import { useRef } from "react";
import { Link } from "react-router-dom";

const BlogList = () => {
    const blogList = useRef([])
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "blogs"), (snapshot) => {
            const blogs = []
            snapshot.docs.map(doc => {
                blogs.push({ id: doc.id, ...doc.data() })
            })

            blogs.forEach(blog => {
                const storageRef = ref(storage, blog.imageUrl);
                getDownloadURL(storageRef).then((url) => {
                    blog.imageURL = url;
                    blogList.current = blogs
                    setLoading(true);
                }).catch((error) => {
                    console.log(error);
                    setLoading(true);
                });
            });
        })

        return () => unsubscribe()
    }, [])

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
                    {blogList && loading && blogList.current.map((blog) => (
                        <div key={blog.id} >
                            <Link to = {`/BlogList/blog/${blog.id}`} className="flex flex-col rounded-lg shadow-lg overflow-hidden min-h-full">
                            <div className="flex-shrink-0">
                                <img className="h-48 w-full object-cover" src={blog.imageURL} alt="Image" />
                            </div>
                            <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-indigo-600">
                                        {blog.category}
                                    </p>
                                    <a href={blog.href} className="block mt-2">
                                        <p className="text-xl font-semibold text-gray-900">{blog.title}</p>
                                        <p className="mt-3 text-base text-gray-500">{blog.description}</p>
                                    </a>
                                </div>
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
            </div>
        </div>
    );
}
 
export default BlogList
