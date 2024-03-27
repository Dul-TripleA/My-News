import Image from "next/image";
import Link from "next/link";
import DeleteBtn from "./deleteBtn";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const PostSection = async ({ post, links, name }) => {
  const session = await getServerSession(authOptions);
  const isEditable = session && session.user.email === post.authorEmail;

  const dateObject = new Date(post.createdAt);
  const formattedDate = dateObject.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return (
    <div className="my-4 border-b border-b-300 pb-4">
      {name ? (
        <div className="mb-4">
          Posted by: <span className="font-bold">{name}</span> on
          {" " + formattedDate}
        </div>
      ) : (
        <div className="mb-4">Posted on: {" " + formattedDate}</div>
      )}
      <div className="w-full h-72 relative">
        {post.imgUrl ? (
          <Image
            className="object-cover rounded-md object-center"
            src={post.imgUrl}
            alt="thumbnail"
            fill
          />
        ) : (
          <Image
            className="object-cover rounded-md object-center"
            src={"/no-thumbnail.jpg"}
            alt="thumbnail"
            fill
          />
        )}
      </div>
      {post.categoryName && (
        <Link
          className="bg-slate-800 w-fit text-white px-4 py-0.5 text-sm font-bold rounded-md mt-4 block"
          href={`/categories/${post.categoryName}`}
        >
          {post.categoryName}
        </Link>
      )}

      <h2>{post.title}</h2>
      <p className="content">{post.content}</p>
      {links && (
        <div className="my-4 flex flex-col gap-3">
          {links.map((link, i) => (
            <div key={i} className="flex gap-2">
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
              <Link className="link" href={link}>
                {link}
              </Link>
            </div>
          ))}
        </div>
      )}

      {isEditable && (
        <div className="flex gap-2">
          <Link
            className="font-bold py-2 px-4 rounded-md bg-slate-200"
            href={`/edit-post/${post.id}`}
          >
            Edit
          </Link>
          <DeleteBtn id={post.id} />
        </div>
      )}
    </div>
  );
};
export default PostSection;
