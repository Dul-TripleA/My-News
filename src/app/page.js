import CategoriesList from "@/components/categoriesList";
import PostSection from "@/components/post";
// import { getPosts } from "../../lib/data";
import Image from "next/image";

const getPosts = async () => {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/posts`, {
      cache: "no-store",
    });
    if (res.ok) {
      const posts = await res.json();
      return posts;
    }
  } catch (error) {
    console.log(error);
  }
  return null;
};

const Home = async () => {
  const posts = await getPosts();
  return (
    <>
      <CategoriesList />
      {posts && posts.length > 0 ? (
        posts.map((post) => (
          <PostSection
            key={post.id}
            post={post}
            links={post.links || []}
            name = {post.author.name}
          />
        ))
      ) : (
        <div className="py-6">No post to display</div>
      )}
    </>
  );
};

export default Home;
