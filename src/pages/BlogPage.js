import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { db, storage } from "../firebaseConfig";
import { getDownloadURL, ref } from "firebase/storage";
import { BarLoader,CircleLoader } from "react-spinners";

export default function BlogPage() {

    const {id} = useParams();
    const [blogData,setBlogData] = useState(null);
    const [mainImage,setMainImage] = useState('');
    const [loading,setLoading] = useState(true);
    const [splitedContent,setSplitedContent] = useState([]);

    const splitContent = (str) => {

        const third = Math.ceil(str.length / 3);
        const pieces = [];
        let currentPiece = "";

        for (let i = 0; i < str.length; i++) {
            currentPiece += str.charAt(i);

            if (currentPiece.length >= third) {
            if (currentPiece.endsWith(".")) {
                pieces.push(currentPiece);
                currentPiece = "";
            } else {
                const lastDotIndex = currentPiece.lastIndexOf(".");
                if (lastDotIndex !== -1) {
                pieces.push(currentPiece.substring(0, lastDotIndex + 1));
                currentPiece = currentPiece.substring(lastDotIndex + 1);
                }
            }
            }
        }

        if (currentPiece.length > 0 && currentPiece[currentPiece.length-1]!=='.') {
            pieces.push(currentPiece + ".");
        }
        setSplitedContent(pieces);

    }

    useEffect(() => {

        const addData = async () => {
            const docRef = doc(db, "blogs", id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setBlogData(docSnap.data())
                splitContent(docSnap.data().content)
                //Get main image of blog
                setLoading(false);
                getDownloadURL(ref(storage, docSnap.data().imageUrl))
                .then((url) => {
                    setMainImage(url);
                })

            } else {
            // docSnap.data() will be undefined in this case
            setLoading(false)
            }
        }

        addData()

    },[])

    return (
      <div className="relative py-16 bg-white overflow-hidden">
        <div className="hidden lg:block lg:absolute lg:inset-y-0 lg:h-full lg:w-full">
          <div className="relative h-full text-lg max-w-prose mx-auto" aria-hidden="true">
            <svg
              className="absolute top-12 left-full transform translate-x-32"
              width={404}
              height={384}
              fill="none"
              viewBox="0 0 404 384"
            >
              <defs>
                <pattern
                  id="74b3fd99-0a6f-4271-bef2-e80eeafdf357"
                  x={0}
                  y={0}
                  width={20}
                  height={20}
                  patternUnits="userSpaceOnUse"
                >
                  <rect x={0} y={0} width={4} height={4} className="text-gray-200" fill="currentColor" />
                </pattern>
              </defs>
              <rect width={404} height={384} fill="url(#74b3fd99-0a6f-4271-bef2-e80eeafdf357)" />
            </svg>
            <svg
              className="absolute top-1/2 right-full transform -translate-y-1/2 -translate-x-32"
              width={404}
              height={384}
              fill="none"
              viewBox="0 0 404 384"
            >
              <defs>
                <pattern
                  id="f210dbf6-a58d-4871-961e-36d5016a0f49"
                  x={0}
                  y={0}
                  width={20}
                  height={20}
                  patternUnits="userSpaceOnUse"
                >
                  <rect x={0} y={0} width={4} height={4} className="text-gray-200" fill="currentColor" />
                </pattern>
              </defs>
              <rect width={404} height={384} fill="url(#f210dbf6-a58d-4871-961e-36d5016a0f49)" />
            </svg>
            <svg
              className="absolute bottom-12 left-full transform translate-x-32"
              width={404}
              height={384}
              fill="none"
              viewBox="0 0 404 384"
            >
              <defs>
                <pattern
                  id="d3eb07ae-5182-43e6-857d-35c643af9034"
                  x={0}
                  y={0}
                  width={20}
                  height={20}
                  patternUnits="userSpaceOnUse"
                >
                  <rect x={0} y={0} width={4} height={4} className="text-gray-200" fill="currentColor" />
                </pattern>
              </defs>
              <rect width={404} height={384} fill="url(#d3eb07ae-5182-43e6-857d-35c643af9034)" />
            </svg>
          </div>
        </div>
        {!loading && blogData && (
            <div className="relative px-4 sm:px-6 lg:px-8">
            <div className="text-lg max-w-[1100px] mx-auto py-5">
                <h1>
                <span className="block text-base text-center text-indigo-600 font-semibold tracking-wide uppercase">
                    {blogData.category}
                </span>
                <span className="my-4 block text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                    {blogData.title}
                </span>
                <span className="block text-base text-center text-indigo-600 font-semibold tracking-wide">
                    Vrijeme potrebno za čitanje : {blogData.readingTime}
                </span>
                </h1>
                <p className="mt-8 text-md text-gray-500 leading-8">
                {blogData.description}
                </p>
            </div>
            <div className="mt-6 prose prose-indigo prose-lg text-gray-500 mx-auto">
                {mainImage  && 
                    <figure>
                        <img
                            className="w-full rounded-lg max-w-[1100px] mx-auto"
                            src={mainImage}
                            alt="Main image of blog"
                            width={1000}
                            height={673}
                            />
                    </figure>
            }
                {!mainImage && 
                <div className=" w-full max-w-[1100px] mx-auto flex justify-center items-center flex-col gap-2 py-[100px]">
                        <CircleLoader
                            height={100}
                            width={100}
                            strokeWidth={5}
                            color="blue"
                        />
                        <p className="font-bold tracking-wide">Loading image...</p>
                </div>
                    }

                <div className="max-w-[1100px] mx-auto py-10">
                    {
                        splitedContent.map((piece,index) => (
                            <p className="py-5" key={index}>{splitedContent[index]}</p>
                        ))
                    }
                </div>
            </div>
            </div>
        )}
        {loading && (
            <div className=" flex justify-center pt-48">
                <BarLoader width={"50%"} color="blue"/>
            </div>
        )}
        {!loading && !blogData && (
            <div className=" flex justify-center pt-48">
                <h1>Something went wrong!! Upsss</h1>
            </div>
        )}
      </div>
    )
  }
  