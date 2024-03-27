"use client";

import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const DeleteBtn = ({ id }) => {
  const router = useRouter();
  const deleteImage = async (publicId) => {
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
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = confirm("Are you sure you want to delete this post?");

    if (confirmDelete) {
      try {
        const res = await fetch(`/api/posts/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (res.ok) {
          console.log("deleted");
          const post = await res.json();
          const { publicId } = post;
          await deleteImage(publicId);
          router.refresh();
          toast.success("Post deleted successfully");
        }
      } catch (error) {
        toast.error("Something went wrong")
        console.log(error);
      }
    }
  };
  return (
    <button
      onClick={handleDelete}
      className="text-red-600 font-bold py-2 px-4 rounded-md bg-slate-200"
    >
      Delete
    </button>
  );
};
export default DeleteBtn;
