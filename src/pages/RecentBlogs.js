import { collection, limit, onSnapshot, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db, storage } from "../firebaseConfig";
import { getDownloadURL, ref } from "firebase/storage";

const RecentBlogs = () => {

      const [blogs, setBlogs] = useState([]);
      const [loading, setLoading] = useState(false);

      useEffect(() => {
          const unsubscribe = onSnapshot(query(collection(db, "blogs"), limit(3)), (snapshot) => {
              const blogs = [];
              snapshot.docs.map(doc => {
                  blogs.push({ id: doc.id, ...doc.data() });
              });

              blogs.forEach(blog => {
                  const storageRef = ref(storage, blog.imageUrl);
                  getDownloadURL(storageRef).then((url) => {
                      blog.imageURL = url;
                      setLoading(true);
                      setBlogs(blogs.slice(0,3)); // Set only the first three blogs
                  }).catch((error) => {
                      console.log(error);
                  });
              });
          })

          return () => unsubscribe()
      }, []);

  return ( 
      <>
      {blogs ? (

      <div className="relative pt-16 pb-20 px-4 sm:px-6 lg:pt-32 lg:pb-28 lg:px-8">
      
      <div className="relative max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">Svi blogovi</h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsa libero labore natus atque, ducimus sed.
          </p>
        </div>
        <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
          {blogs && loading && blogs.map((blog) => (
            <div key={blog.id} className="flex flex-col rounded-lg shadow-lg overflow-hidden">
              <div className="flex-shrink-0">
                <img className="h-48 w-full object-cover" src={blog.imageURL} alt="" />
              </div>
              <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-indigo-600">
                      {blog.category}
                  </p>
                  <a href={"#"} className="block mt-2">
                    <p className="text-xl font-semibold text-gray-900">{blog.title}</p>
                    <p className="mt-3 text-base text-gray-500">{blog.description}</p>
                  </a>
                </div>
                  <p className="text-sm font-bold pt-4">Vrijeme citanja : {blog.readingTime}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
          ) : 
          (
              <div className="flex items-center justify-center text-3xl font-bold text-cyan-700">
                  NO BLOGS YET!
              </div>
          )}
      </>
   );
}

export default RecentBlogs
