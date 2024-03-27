import PostSection from "@/components/post";

const getPost = async (categoryName) => {
  try {
    const res = await fetch(
      `${process.env.NEXTAUTH_URL}/api/categories/${categoryName}`,
      { cache: "no-store" }
    );

    if (res.ok) {
      const categories = await res.json();
      const posts = categories.posts;
      console.log(categories.posts);
      return posts;
    }
  } catch (error) {
    console.log(error);
  }
  return null;
};

const CategoryPage = async ({ params }) => {
  const category = params.categoryName;
  const posts = await getPost(category);
  return (
    <>
      <span className="flex items-center gap-3">
        <h1 className="font-normal">Category:</h1>
        <h2 className="">{decodeURIComponent(category)}</h2>
      </span>

      {posts && posts.length > 0 ? (
        posts.map((post) => (
          <PostSection
            key={post.id}
            post={post}
            links={post.links || []}
            name={post.author.name}
          />
        ))
      ) : (
        <div className="py-6">No post to display</div>
      )}
    </>
  );
};
export default CategoryPage;
