import Link from "next/link";

const getCategories = async () => {
  try{
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/categories`);
    if(res.ok){
      const categories = await res.json();
      return categories;
    }
  }catch(error){
    console.log(error);
  }
  return null;
}

const CategoriesList = async () => {
  const categories = await getCategories();
  return (
    <div className="flex gap-2 text-sm flex-wrap ">
      {categories.map((category) => (
        <Link
          className="px-4 py-1 bg-slate-800 text-white cursor-pointer rounded"
          href={`/categories/${category.categoryName}`}
          key={category.id}
        >
          {category.categoryName}
        </Link>
      ))}
    </div>
  );
};
export default CategoriesList;
