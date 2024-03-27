import EditPostForm from "@/components/editPoatForm";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/dist/server/api-utils";

const getPost = async (id) => {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/posts/${id}`, {
      cache: "reload",
    });

    if (res.ok) {
      const post = await res.json();
      return post;
    }
  } catch (error) {
    console.log(error);
  }
  return null;
};
const EditPage = async ({ params }) => {
  const id = params.id;
  console.log(id);

  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/sign-in");
  }
  const post = await getPost(id);
  return <>{post ? <EditPostForm post={post} /> : <div>Invalid Post</div>}</>;
};
export default EditPage;
