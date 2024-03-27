import Link from "next/link";
// import { getPosts } from "../../../lib/data";
import PostSection from "@/components/post";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
const getPosts = async (email) => {
  try {
    const res = await fetch(
      `${process.env.NEXTAUTH_URL}/api/authors/${email}`,
      { cache: "no-store" }
    );
    const { posts } = await res.json();

    return posts;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const DashboardPage = async () => {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;
  let posts = [];

  if (!session) {
    redirect("/sign-in");
  }

  if (email) {
    posts = await getPosts(email);
  }

  return (
    <>
      <div className="flex justify-between items-center">
        <h1>Dashboard</h1>
        <h3>My Post</h3>
      </div>
      <div>
        {posts && posts.length > 0 ? (
          posts.map((post) => (
            <PostSection
              key={post.id}
              post={post}
              links={post.links || []}
              name={""}
            />
          ))
        ) : (
          <div className="py-6">
            No post creaes yet.
            <Link className="text-[#7563DF] font-bold" href={"/create-post"}>
              {" "}
              Create New
            </Link>
          </div>
        )}
      </div>
    </>
  );
};
export default DashboardPage;
