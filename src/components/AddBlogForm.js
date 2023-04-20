import { useState } from "react";
import { addDoc, collection} from "firebase/firestore"; 
import { auth, db, storage } from "../firebaseConfig";
import { PhotoIcon } from '@heroicons/react/24/solid'
import { ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { toast } from "react-hot-toast";
import { signOut } from "firebase/auth";

const AddBlogForm = ({setUser}) => {

    const [title,setTitle] = useState('');
    const [content,setContent] = useState('');
    const [category,setCategory] = useState('');
    const [readingtime,setReadingtime] = useState('');
    const [description,setDescription] = useState('');
    const [thumbnailImage,setThumbnailImage] = useState(null);

    const signOutUser = () => {
      signOut(auth).then(() => {
        // Sign-out successful.
        setUser(null)
      }).catch((error) => {
        // An error happened.
        alert("Error signing out!!!",error.message)
      });
    }

    const addBlog = (e) => {
        e.preventDefault();
        if(thumbnailImage === null) return;

        const imagePath = thumbnailImage.name + v4();
        const thumbnailRef = ref(storage, `images/${imagePath}`);

        uploadBytes(thumbnailRef,thumbnailImage)
        .then(async (res) => {
          //On what date it's published
          const docRef = addDoc(collection(db, "blogs"), {
              title: title,
              content:  content,
              category : category,
              readingTime:readingtime,
              date : new Date(),
              description : description,
              imageUrl : `images/${imagePath}`,
            });

            toast.promise(docRef, {
                loading: "Adding blog...",
                success: "Added blog",
                error: "Error adding blog!!!"
            })

            setTitle('')
            setContent('')
            setCategory('')
            setDescription('')
            setReadingtime('')
            setThumbnailImage(null)
        })
        .catch((error) => console.log("Error uploading image",error))
    }

    return ( 
        <div className="max-w-[1100px] mx-auto p-[50px] relative">
        <form onSubmit={addBlog}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <div className="flex justify-between">
              <div>
                <h2 className="text-2xl font-semibold leading-7 text-gray-900">Ubacivanje bloga</h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  Ovdje ubacujete sadrzaj za vas blog
                </p>
              </div>
              <button onClick={signOutUser} className="h-10 bg-blue-600 text-white font-bold py-2 px-5 rounded-lg">Sign Out</button>
            </div>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                  Enter Your Title
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <span className="flex select-none items-center px-3 text-gray-500 sm:text-sm">Title :</span>
                    <input
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      type="text"
                      name="title"
                      id="title"
                      autoComplete="title"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
  
              <div className="col-span-full">
                <label htmlFor="content" className="block text-sm font-medium leading-6 text-gray-900">
                  Unesite vas text
                </label>
                <div className="mt-2">
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    id="content"
                    name="content"
                    rows={12}
                    className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-600">Ovdje napisite sav sadrzaj bloga</p>
              </div>
  
              <div className="col-span-full">
                <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">
                  Odaberite thumbnail sliku
                </label>
                <div className="mt-2 flex items-center gap-x-3">
                  <PhotoIcon className="h-12 w-12 text-gray-300" aria-hidden="true" />
                  <input
                    onChange={(e) => setThumbnailImage(e.target.files[0])}
                    type="file"
                    id="thumbnail-photo"
                    accept="image/*"
                    className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  />
                </div>
              </div>
  
              <div className="col-span-full">
                <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                  Slike za galeriju
                </label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  <div className="text-center">
                    <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                      >
                        <span>Upload a file</span>
                        <input id="file-upload" name="file-upload" type="file" className="sr-only" multiple accept="image/*" />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
  
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">Vise informacija o postu</h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">Ovdje trebate napisati sve informacije.</p>
  
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label htmlFor="kategorija" className="block text-sm font-medium leading-6 text-gray-900">
                  Unesite kategoriju
                </label>
                <div className="mt-2">
                  <input
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    type="text"
                    name="kategorija"
                    id="kategorija"
                    className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
  
              <div className="sm:col-span-3">
                <label htmlFor="vrijeme-citanja" className="block text-sm font-medium leading-6 text-gray-900">
                  Unesite vrijeme potrebno za citanje
                </label>
                <div className="mt-2">
                  <input
                    value={readingtime}
                    onChange={(e) => setReadingtime(e.target.value)}
                    type="text"
                    name="vrijeme-citanja"
                    id="vrijeme-citanja"
                    className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

  
              <div className="col-span-full">
                <label htmlFor="deskripcija" className="block text-sm font-medium leading-6 text-gray-900">
                  Unesite deskripciju:
                </label>
                <div className="mt-2">
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    id="deskripcija"
                    name="deskripcija"
                    rows={3}
                    className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
  
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button type="reset" className="text-sm font-semibold leading-6 text-gray-900">
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </form>
      </div>
     );
}
 
export default AddBlogForm;