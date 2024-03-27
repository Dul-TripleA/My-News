"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CldUploadButton } from "next-cloudinary";
import Image from "next/image";
import toast from "react-hot-toast";

const CreatePostForm = () => {
  //   const categories = await getCategories();
  const [links, setLinks] = useState([]);
  const [inputLink, setInputLink] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [publicId, setPublicId] = useState("");
  // const [error, setError] = useState("");

  const router = useRouter();

  useEffect(() => {
    const fetchAllCategories = async () => {
      const res = await fetch("/api/categories");
      const categoryName = await res.json();
      setCategories(categoryName);
    };
    fetchAllCategories();
  }, []);

  const addLink = (e) => {
    e.preventDefault();
    if (inputLink.trim() !== "") {
      setLinks((prev) => [...prev, inputLink]);
      setInputLink(" ");
    }
  };

  const deleteLink = (i) => {
    setLinks((prev) => prev.filter((_, index) => index !== i));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (title.trim() === "" || content.trim() === "") {
      const errorMessage = "Title and content are required";
      toast.error(errorMessage);
      return;
    }

    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
          links,
          selectedCategory,
          imgUrl,
          publicId,
        }),
      });

      if (res.ok) {
        toast.success("Post created successfully");
        router.push("/dashboard");
        router.refresh();
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpload = async (result) => {
    console.log(result);
    const info = result.info;

    if ("secure_url" in info && "public_id" in info) {
      const url = info.secure_url;
      const publicId = info.public_id;

      setImgUrl(url);
      setPublicId(publicId);

      console.log("url", url);
      console.log("id", publicId);
    }
  };

  const removeImg = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/removeImg", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          publicId,
        }),
      });

      if (res.ok) {
        setImgUrl("");
        setPublicId("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>Create Post</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Title"
        />
        <textarea
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
        ></textarea>

        {links &&
          links.map((link, i) => (
            <div key={i} className="flex gap-2">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
                  />
                </svg>
              </span>
              <Link className="text-[#7563DF] font-bold" href={link}>
                {link}
              </Link>
              <span className="cursor-pointer" onClick={() => deleteLink(i)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </span>
            </div>
          ))}

        <div className=" flex gap-2">
          <input
            className="flex-1"
            type="text"
            onChange={(e) => setInputLink(e.target.value)}
            placeholder="Paste the link and click on Add"
          />
          <button className="btn flex gap-2 items-center" onClick={addLink}>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
              </svg>
            </span>
            Add
          </button>
        </div>

        <CldUploadButton
          uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
          className={`h-48 border-3 border-dashed grid place-items-center bg-slate-100 rounded-md relative ${
            imgUrl && "pointer-events-none"
          }`}
          onUpload={handleUpload}
        >
          <div className="flex flex-col gap-2 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>
            Upload Image
          </div>

          {imgUrl && (
            <Image
              src={imgUrl}
              alt="thumbnail"
              fill
              className="absolute object-cover inset-0"
            />
          )}
        </CldUploadButton>

        {publicId && (
          <button
            onClick={removeImg}
            className="w-fit bg-red-600 font-bold text-white mb-4 py-2 px-4 rounded-md"
          >
            Remove Image
          </button>
        )}

        <select
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="p-3 rounded-md border appearance-none"
        >
          <option>Select a category</option>
          {categories &&
            categories.map((category) => (
              <option key={category.id} value={category.categoryName}>
                {category.categoryName}
              </option>
            ))}
        </select>
        <button className="primary-btn" type="submit">
          Create Post
        </button>
        {/* {error && <div className="p-2 text-red-500 font-bold">{error}</div>} */}
      </form>
    </div>
  );
};
export default CreatePostForm;
